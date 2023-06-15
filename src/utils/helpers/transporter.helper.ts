import * as nodemailer from "nodemailer";
import { google} from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2 (
  process.env.OAUTH2_ID,
  process.env.OAUTH2_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH2_REFRESH_TOKEN
});

async function getToken(): Promise<any> {
  let token;

  try {
    token = await oauth2Client.getAccessToken();
  } catch (error) {
    throw new Error(error);
  }

  return token;
}

const accessToken = getToken().catch((error) => { throw new Error(error); });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.ADMIN_EMAIL,
    clientId: process.env.OAUTH2_ID,
    clientSecret: process.env.OAUTH2_SECRET,
    refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
    accessToken: accessToken,
  },
  tls: {
    rejectUnauthorized: false
  }
} as nodemailer.TransportOptions);

export default transporter;
