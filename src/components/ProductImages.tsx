import type { ProductImagesProps } from "../types";

export function ProductImages({
  images,
  selectedImage,
  onSelect,
}: ProductImagesProps) {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center justify-center w-full max-w-[672px] h-[300px] md:h-full">
        <img
          src={selectedImage}
          alt="Produto"
          className="w-full h-full aspect-square object-cover rounded-md shadow"
        />
      </div>

      <div className="flex gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index}`}
            className={`size-16 object-cover rounded cursor-pointer border ${
              selectedImage === img ? "border-black" : "border-gray-300"
            }`}
            onClick={() => onSelect(img)}
          />
        ))}
      </div>
    </div>
  );
}
