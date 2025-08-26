import { useTranslation } from "react-i18next";
import Gallery from "../components/Gallery";
import cpia from "../assets/cpia.png";
import indegino from "../assets/indegino.jpg";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <div
        className="relative bg-cover bg-no-repeat bg-top py-40 text-center min-h-[500px]"
        style={{ backgroundImage: `url(${indegino})` }}
        role="banner"
        aria-label={t("heroSection")}
      >
        <div className="container mx-auto  bg-opacity-75 text-blue px-6 py-3 rounded-lg hover:bg-700 transition-colors duration-300">
          <img
            src={cpia}
            alt={t("logoAlt")}
            className="h-12 w-auto rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 mx-auto mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("welcome")}
          </h1>
          <p className="text-lg md:text-xl">{t("missionDescription")}</p>
        </div>
      </div>
      <section className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">{t("ourMission")}</h2>
        <p>{t("missionDescription")}</p>
        <Gallery />
      </section>
    </div>
  );
}

export default Home;
