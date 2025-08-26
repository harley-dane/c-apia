import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonationForm from '../components/DonationForm';

const stripePromise = loadStripe('your-stripe-publishable-key');

function Donate() {
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