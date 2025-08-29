import { useForm } from "react-hook-form";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  email: string;
  skills?: string;
  message?: string;
}

function Volunteer() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/volunteers`, data);
      alert(t("volunteerSuccess"));
      reset();
    } catch (error) {
      console.error(error);
      alert(t("volunteerFailed"));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">{t("volunteer")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
        <div className="mb-4">
          <label className="block mb-2">{t("name")}</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">{t("email")}</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">{t("skills")}</label>
          <input
            type="text"
            {...register("skills")}
            className="w-full p-2 border"
            placeholder="e.g., Teaching, Planting"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">{t("message")}</label>
          <textarea
            {...register("message")}
            className="w-full p-2 border"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
}

export default Volunteer;
