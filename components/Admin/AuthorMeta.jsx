// components/AuthorMeta.jsx
export default function AuthorMeta({ author, date }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <p className="text-sm text-gray-600 mt-2">
      <span className="font-semibold text-blue-700">{author}</span>
      {" - Published "}
      {formattedDate}
    </p>
  );
}
