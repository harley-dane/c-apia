import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

interface DonationFormData {
  amount: string;
  donorEmail: string;
  project: string;
  paymentMethod: "stripe" | "paystack";
  coverFee: boolean;
}

function DonationForm() {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState<DonationFormData>({
    amount: "",
    donorEmail: "",
    project: "",
    paymentMethod: "stripe",
    coverFee: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleStripePayment = async (data: DonationFormData) => {
    setLoading(true);
    setError(null);
    try {
      const amount = parseFloat(data.amount);
      console.log("Attempting Stripe payment with amount:", amount);
      if (isNaN(amount) || amount < 0.5) {
        setError(t("invalidAmount"));
        setLoading(false);
        return;
      }
      const finalAmount = data.coverFee
        ? Math.round(amount * 1.03 * 100) / 100
        : amount;
      console.log("Final amount sent to backend:", finalAmount);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/donations/stripe`,
        { amount: finalAmount },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Server response:", response.data);
      const { clientSecret } = response.data;

      if (!stripe || !elements) {
        setError(t("stripeNotLoaded"));
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (result.error) {
        setError(result.error.message || t("donationFailed"));
        setLoading(false);
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/donations`, {
        ...data,
        amount: finalAmount,
        paymentMethod: "stripe",
      });
      alert(t("donationSuccess"));
      setFormData({
        amount: "",
        donorEmail: "",
        project: "",
        paymentMethod: "stripe",
        coverFee: false,
      });
    } catch (error: unknown) {
      console.error("Stripe payment error details:", error);
      setError(
        (error instanceof Error ? error.message : "Unknown error") ||
          t("donationFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.paymentMethod === "stripe") {
      handleStripePayment(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium">
          {t("amount")}
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          className="mt-1 block w-full border rounded p-2"
          required
          min="0.5"
          step="0.01"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="donorEmail" className="block text-sm font-medium">
          {t("email")}
        </label>
        <input
          type="email"
          id="donorEmail"
          name="donorEmail"
          value={formData.donorEmail}
          onChange={handleInputChange}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="project" className="block text-sm font-medium">
          {t("project")}
        </label>
        <select
          id="project"
          name="project"
          value={formData.project}
          onChange={handleInputChange}
          className="mt-1 block w-full border rounded p-2"
          required
        >
          <option value="">{t("selectProject")}</option>
          <option value="conservation">{t("conservation")}</option>
          <option value="education">{t("education")}</option>
          <option value="community">{t("community")}</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="paymentMethod" className="block text-sm font-medium">
          {t("paymentMethod")}
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="stripe">Stripe</option>
          <option value="paystack">Paystack</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="coverFee"
            checked={formData.coverFee}
            onChange={handleInputChange}
            className="form-checkbox"
          />
          <span className="ml-2">{t("coverFee")}</span>
        </label>
      </div>
      {formData.paymentMethod === "stripe" && (
        <div className="mb-4">
          <label className="block text-sm font-medium">
            {t("cardDetails")}
          </label>
          <CardElement className="mt-1 block w-full border rounded p-2" />
        </div>
      )}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? t("processing") : t("donate")}
      </button>
    </form>
  );
}

export default DonationForm;
