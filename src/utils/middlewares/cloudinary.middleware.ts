// Import External Dependencies
import cloudinary from "cloudinary";

// CONST
const instanciatedCloudinary = cloudinary.v2;


instanciatedCloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export interface uploadResponse {
  url: string;
  name: string;
  publicID: string;
}

export async function upload(files: string[]): Promise<uploadResponse[]> {
  const images: uploadResponse[] = [];

  try {
    for (const file of files) {
      const { url, original_filename: name, public_id: publicID } = await instanciatedCloudinary.uploader.upload(file, {
        format: "webp"
      });

      images.push({ url, name, publicID });
    }

    return images;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function del(publicIDs: string[]): Promise<void> {
  try {
    await instanciatedCloudinary.api.delete_resources(publicIDs);
  } catch (error) {
    throw new Error(error.message);
  }
}
