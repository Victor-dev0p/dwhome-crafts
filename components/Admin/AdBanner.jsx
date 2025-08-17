// components/AdBanner.jsx
export default function AdBanner({ title, description, cta }) {
  return (
    <div className="bg-neutral-900 text-white p-4 rounded-lg flex items-center justify-between shadow-md">
      <div>
        <p className="text-sm opacity-70">Ad by early code</p>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <button className="bg-white text-black px-4 py-2 rounded-full font-medium shadow hover:bg-gray-200 transition">
        {cta}
      </button>
    </div>
  );
}
