import { useState, useEffect } from "react";
import axios from "axios";
import AffiliateCard from "../components/AffiliateCard";
import { useTranslation } from "react-i18next";

interface Affiliate {
  _id: string;
  name: string;
  location?: string;
  cause?: string;
}

function Affiliates() {
  const { t } = useTranslation();
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [filters, setFilters] = useState({ location: "", cause: "" });

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/affiliates",
          {
            params: filters,
          }
        );
        setAffiliates(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAffiliates();
  }, [filters]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">{t("affiliates")}</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder={t("filterByLocation")}
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="p-2 border mr-2"
        />
        <input
          type="text"
          placeholder={t("filterByCause")}
          value={filters.cause}
          onChange={(e) => setFilters({ ...filters, cause: e.target.value })}
          className="p-2 border"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {affiliates.map((affiliate) => (
          <AffiliateCard key={affiliate._id} affiliate={affiliate} />
        ))}
      </div>
    </div>
  );
}

export default Affiliates;
