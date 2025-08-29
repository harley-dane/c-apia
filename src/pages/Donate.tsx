import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonationForm from "../components/DonationForm";

// Debug environment variables
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
console.log("VITE_STRIPE_PUBLISHABLE_KEY:", stripeKey || "undefined");
console.log("All environment variables:", import.meta.env);
console.log("NODE_ENV:", import.meta.env.MODE);

const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

function Donate() {
  if (!stripeKey || !stripePromise) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Donate to A-CPIA</h2>
        <div className="text-red-500 text-center">
          Error: Stripe configuration is missing. Please contact support. (Key:{" "}
          {stripeKey || "undefined"})
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Donate to A-CPIA</h2>
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    </div>
  );
}

export default Donate;
