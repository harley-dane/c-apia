import { useState } from "react";
import { useForm } from "react-hook-form";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Define TypeScript interface for form data
interface DonationFormData {
  amount: string;
  email: string;
  project: string;
}

function DonationForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationFormData>();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paystack">(
    "stripe"
  );
  const [coverFee, setCoverFee] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  const onSubmit = async (data: DonationFormData) => {
    const finalAmount = coverFee
      ? parseFloat(data.amount) * 1.03
      : parseFloat(data.amount);
    try {
      await axios.post("http://localhost:5000/api/donations", {
        amount: finalAmount,
        donorEmail: data.email,
        project: data.project,
        paymentMethod,
        feeCovered: coverFee,
      });
      alert(t("donationSuccess"));
    } catch (error) {
      console.error("Donation error:", error);
      alert(t("donationFailed"));
    }
  };

  const handleStripePayment = async (data: DonationFormData) => {
    const finalAmount = coverFee
      ? parseFloat(data.amount) * 1.03
      : parseFloat(data.amount);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/donations/stripe",
        { amount: finalAmount }
      );
      const { clientSecret } = response.data;

      if (!stripe || !elements) {
        alert(t("stripeNotLoaded"));
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        await onSubmit(data);
      }
    } catch (error) {
      console.error("Stripe payment error:", error);
      alert(t("donationFailed"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        paymentMethod === "stripe" ? handleStripePayment : onSubmit
      )}
      className="max-w-lg mx-auto p-4"
    >
      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2">
          {t("amount")}
        </label>
        <input
          type="number"
          id="amount"
          {...register("amount", {
            required: t("amountRequired"),
            min: { value: 1, message: t("amountMin") },
          })}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          className="w-full p-2 border"
          aria-describedby={errors.amount ? "amount-error" : undefined}
        />
        {errors.amount && (
          <p id="amount-error" className="text-red-600 text-sm">
            {errors.amount.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          {t("email")}
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: t("emailRequired") })}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border"
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-600 text-sm">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="project" className="block mb-2">
          {t("project")}
        </label>
        <select
          id="project"
          {...register("project", { required: t("projectRequired") })}
          className="w-full p-2 border"
          aria-describedby={errors.project ? "project-error" : undefined}
        >
          <option value="">{t("selectProject")}</option>
          <option value="forestation">{t("forestation")}</option>
          <option value="refugee">{t("refugeeSupport")}</option>
        </select>
        {errors.project && (
          <p id="project-error" className="text-red-600 text-sm">
            {errors.project.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            onChange={(e) => setCoverFee(e.target.checked)}
            className="mr-2"
          />
          {t("coverFee")}
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="paymentMethod" className="block mb-2">
          {t("paymentMethod")}
        </label>
        <select
          id="paymentMethod"
          onChange={(e) =>
            setPaymentMethod(e.target.value as "stripe" | "paystack")
          }
          className="w-full p-2 border"
        >
          <option value="stripe">Credit Card (Stripe)</option>
          <option value="paystack">Paystack</option>
        </select>
      </div>
      {paymentMethod === "stripe" && (
        <div className="mb-4">
          <label className="block mb-2">{t("cardDetails")}</label>
          <CardElement className="p-2 border" />
        </div>
      )}
      {paymentMethod === "paystack" && (
        <PaystackButton
          email={email || "donor@example.com"}
          amount={(coverFee ? amount * 1.03 : amount) * 100} // Paystack uses kobo
          publicKey="your-paystack-public-key" // Replace with your Paystack public key
          text={t("donateWithPaystack")}
          onSuccess={() =>
            onSubmit({
              amount: amount.toString(),
              email,
              project: "forestation",
            })
          }
          onClose={() => alert(t("paymentCancelled"))}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        />
      )}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        {t("donate")}
      </button>
    </form>
  );
}

export default DonationForm;
