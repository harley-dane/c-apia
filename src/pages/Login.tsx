import { useForm } from "react-hook-form";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        data
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      alert(t("loginSuccess"));
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(t("loginFailed"));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">{t("login")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
        <div className="mb-4">
          <label className="block mb-2">{t("email")}</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">{t("password")}</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full p-2 border"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          {t("login")}
        </button>
      </form>
    </div>
  );
}

export default Login;
