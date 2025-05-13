import type { ProductImagesProps } from "../types";

export function ProductImages({
  images,
  selectedImage,
  onSelect,
}: ProductImagesProps) {
  return (
    <div className="space-y-4">
      <img
        src={selectedImage}
        alt="Produto"
        className="w-full aspect-square object-cover rounded-md shadow"
      />

      <div className="flex gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index}`}
            className={`w-20 h-20 object-cover rounded cursor-pointer border ${
              selectedImage === img ? "border-black" : "border-gray-300"
            }`}
            onClick={() => onSelect(img)}
          />
        ))}
      </div>
    </div>
  );
}
