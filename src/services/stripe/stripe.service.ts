
// Import Internal Dependencies
import * as api from "../../utils/helpers/api-helper";
import getStripe from "../../utils/helpers/get-stripe.helpers";

export interface CheckoutSessionPayload {
  amount: number;
  dateStart: Date;
  dateEnd: Date;
  price: number;
  propertyId: number;
}

export async function OpenCheckoutSession(data: CheckoutSessionPayload) {

  const res = await api.default.post("/checkout_sessions", data);

  if (res.statusCode === 500) {
    throw new Error(res.message);
  }

  const stripe = await getStripe();
  const { error } = await stripe.redirectToCheckout({
    sessionId: res.id
  });

  if (error) {
    throw new Error(error.message);
  }

  return;
}
