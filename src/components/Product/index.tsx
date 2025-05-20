import { useEffect, useState } from "react";
import { ProductImages } from "../ProductImages";
import { VariantSelector } from "../VariantSelector";
import type { Product, Variant } from "../../types";

export function Product() {
  const [products, setProducts] = useState<Product>();

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://empreender.nyc3.cdn.digitaloceanspaces.com/static/teste-prod-1.json"
        );
        
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }

        const data = await response.json();

        const values: { [key: string]: string[] } = {};

        data.options.forEach((opt: string, index: number) => {
          values[opt] = data.values[index] || [];
        });

        setProducts({ ...data, values });

        setSelectedVariant(data.variants[0]);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!products) return;

    if (Object.keys(selectedOptions).length < products.options.length) return;

    const selectedValues = products.options.map((opt) => selectedOptions[opt]);

    const variant = products.variants.find(
      (v) =>
        JSON.stringify(v.values) === JSON.stringify(selectedValues) &&
        v.inventory_quantity > 0
    );

    setSelectedVariant(variant ?? null);
  }, [selectedOptions, products]);

  async function handleBuy(product: Product, variant: Variant) {
    try {
      const payload = [
        {
          values: Object.values(variant.options),
          quantity: variant.inventory_quantity,
          product_id: product.id,
          variant_id: variant.id,
        },
      ];

      const response = await fetch(
        "https://app.landingpage.com.br/api/checkoutloja/LPL2gc/5d87eb644e5631bc6a03f1e43a804e1c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Resposta do checkout:", data);

      alert("Compra iniciada com sucesso!");
    } catch (error) {
      console.error("Erro ao iniciar compra:", error);
      alert("Erro ao comprar. Tente novamente.");
    }
  }

  return (
    <main>
      <div className="w-full max-w-[1246px] p-4 md:p-8 mx-auto md:flex items-start gap-8">
        {products && (
          <>
            <ProductImages selectedImage={products.image_url} />

            <div className="space-y-4 mt-10 md:mt-0">
              <h1 className="text-2xl font-bold max-w-[500px]">
                {products.title}
              </h1>

              <p className="text-2xl text-green-600">
                {selectedVariant ? `R$ ${selectedVariant.price}` : ""}
              </p>

              {products &&
                products.options.map((opt) => (
                  <VariantSelector
                    key={opt}
                    label={opt}
                    options={products.values[opt]}
                    onChange={(val) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [opt]: val,
                      }))
                    }
                  />
                ))}

              <p className="mt-2 text-sm">
                {selectedVariant
                  ? "✅ Em estoque"
                  : Object.keys(selectedOptions).length ===
                    products.options.length
                  ? "❌ Sem estoque"
                  : ""}
              </p>

              <button
                disabled={!selectedVariant}
                onClick={() =>
                  products &&
                  selectedVariant &&
                  handleBuy(products, selectedVariant)
                }
                className={`mt-4 px-4 py-2 rounded text-white ${
                  selectedVariant
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Comprar
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
