// components/BlogImage.jsx
'use client'

export default function BlogImage({ src, alt, className }) {
  const handleError = (e) => {
    console.error('Blog image failed to load for:', alt);
    e.target.style.display = 'none';
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}