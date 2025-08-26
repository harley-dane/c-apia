import { useTranslation } from "react-i18next";
import forestation from "../assets/forestation.jpg";
import refugee1 from "../assets/refugee1.jpg";

function Gallery() {
  const { t } = useTranslation();

  const images = [
    {
      url: forestation,
      caption: t("forestationCaption"),
    },
    {
      url: refugee1,
      caption: t("refugeeCaption"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((img, index) => (
        <div key={index}>
          <img
            src={img.url}
            alt={img.caption}
            className="w-full h-48 object-cover rounded-md shadow-md"
          />
          <p className="text-center mt-2">{img.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
