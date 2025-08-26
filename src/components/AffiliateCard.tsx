import type { Affiliate } from "../types"; // Adjust path if types.ts is elsewhere

interface AffiliateCardProps {
  affiliate: Affiliate;
}

function AffiliateCard({ affiliate }: AffiliateCardProps) {
  return (
    <div className="border rounded p-4 shadow-md">
      <img
        src={affiliate.images?.[0] || "/assets/refugee1.jpg"}
        alt={affiliate.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="text-xl font-bold">{affiliate.name}</h3>
      <p className="text-gray-600">
        {affiliate.description || "No description available"}
      </p>
      <p className="text-sm text-gray-500">
        Location: {affiliate.location || "Not specified"}
      </p>
      <p className="text-sm text-gray-500">
        Cause: {affiliate.cause || "Not specified"}
      </p>
      <a
        href="/donate"
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded"
      >
        Support
      </a>
    </div>
  );
}

export default AffiliateCard;
