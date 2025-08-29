import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

interface GalleryImage {
  _id: string;
  path: string;
  alt: string;
  description: string;
}

function Gallery() {
  const { t } = useTranslation();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gallery");
        console.log("Gallery API response:", response.data); // Debug
        setImages(response.data);
        setLoading(false);
      } catch (_) {
        console.error("Failed to fetch gallery images:", _); // Debug
        setError(t("galleryFetchError"));
        setLoading(false);
      }
    };
    fetchImages();
  }, [t]);

  if (loading) {
    return <div className="text-center p-4">{t("loading")}</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">{t("gallery")}</h2>
      {images.length === 0 ? (
        <div className="text-center p-4">{t("noImages")}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {images.map((img) => (
            <div key={img._id} className="relative">
              <img
                src={`http://localhost:5000${img.path}`}
                alt={img.alt}
                className="w-full h-48 object-cover rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                onError={() =>
                  console.error(
                    `Failed to load image: http://localhost:5000${img.path}`
                  )
                } // Debug
              />
              <p className="text-center mt-2">{img.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
