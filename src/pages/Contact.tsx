import { useForm } from "react-hook-form";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface FormData {
  email: string;
}

function Contact() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Replace with your newsletter API (e.g., Mailchimp)
      await axios.post(
        "https://api.mailchimp.com/3.0/lists/your-list-id/members",
        {
          email_address: data.email,
          status: "subscribed",
        }
      );
      alert(t("newsletterSuccess"));
      reset();
    } catch (error) {
      console.error(error);
      alert(t("newsletterFailed"));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">{t("contact")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
        <div className="mb-4">
          <label className="block mb-2">{t("email")}</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 border"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          {t("subscribe")}
        </button>
      </form>
      <div className="text-center mt-4">
        <p>{t("contactInfo")}</p>
        <p>Email: info@acpia.org</p>
        <p>Phone: +123-456-7890</p>
        <p>Address: San Pedro, Montes de Oca, San Jose, Costa Rica</p>
      </div>
    </div>
  );
}

export default Contact;
