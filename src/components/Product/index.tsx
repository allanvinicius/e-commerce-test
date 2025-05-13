import { useEffect, useState } from "react";
import { ProductImages } from "../ProductImages";
import { VariantSelector } from "../VariantSelector";
import { DeliveryChecker } from "../DeliveryChecker";

import type { CepData, ProductData, ProductState } from "../../types";

import image1 from "../../assets/imagem-1.webp";
import image2 from "../../assets/imagem-2.webp";
import image3 from "../../assets/imagem-3.webp";
import image4 from "../../assets/image-4.webp";
import image5 from "../../assets/image-5.webp";
import image6 from "../../assets/image-6.webp";
import image7 from "../../assets/image-7.webp";
import image8 from "../../assets/image-8.webp";

const productData: ProductData = {
  title: "Tênis Nike Downshifter 13 Masculino",
  price: 322.99,
  variants: {
    "Preto e Branco": {
      images: [image1, image2, image3, image7],
    },
    Azul: {
      images: [image4, image5, image6, image8],
    },
  },
  images: [image1, image2, image3, image7],
  sizes: ["37", "38", "39", "40", "41", "42"],
  colors: ["Preto e Branco", "Azul"],
};

export function Product() {
  const [selectedImage, setSelectedImage] = useState<string>(
    productData.images[0]
  );

  const [selectedSize, setSelectedSize] = useState<string>("");

  const [selectedColor, setSelectedColor] = useState<string>(
    productData.colors[0]
  );

  const [cepData, setCepData] = useState<CepData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("product");

    if (stored) {
      const { data, timestamp } = JSON.parse(stored);

      if (Date.now() - timestamp < 15 * 60 * 1000) {
        setSelectedSize(data.selectedSize);
        setSelectedColor(data.selectedColor);
        setCepData(data.cepData);

        const variantImages = productData.variants[data.selectedColor]?.images;

        if (variantImages?.includes(data.selectedImage)) {
          setSelectedImage(data.selectedImage);
        } else if (variantImages?.length) {
          setSelectedImage(variantImages[0]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (selectedColor && productData.variants[selectedColor]) {
      const images = productData.variants[selectedColor].images;

      if (images.length > 0 && selectedImage !== images[0]) {
        setSelectedImage(images[0]);
      }
    }

    const state: ProductState = {
      selectedImage,
      selectedSize,
      selectedColor,
      cepData,
    };

    localStorage.setItem(
      "product",
      JSON.stringify({ data: state, timestamp: Date.now() })
    );
  }, [selectedImage, selectedSize, selectedColor, cepData]);

  return (
    <main>
      <div className="w-full max-w-[1246px] p-4 mx-auto flex items-start gap-8">
        <ProductImages
          images={
            selectedColor && productData.variants[selectedColor]
              ? productData.variants[selectedColor].images
              : []
          }
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
        />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold max-w-[500px]">
            {productData.title} - {selectedColor}
          </h1>

          <p className="text-2xl text-green-600">
            R$ {productData.price.toFixed(2)}
          </p>

          <VariantSelector
            label="Tamanho"
            options={productData.sizes}
            selected={selectedSize}
            onChange={setSelectedSize}
          />

          <VariantSelector
            label="Cor"
            options={productData.colors}
            selected={selectedColor}
            onChange={setSelectedColor}
          />

          <DeliveryChecker cepData={cepData} setCepData={setCepData} />
        </div>
      </div>
    </main>
  );
}
