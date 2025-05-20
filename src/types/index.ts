export interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface DeliveryCheckerProps {
  cepData: CepData | null;
  setCepData: (data: CepData | null) => void;
}

export interface ProductImagesProps {
  selectedImage: string;
}
export interface VariantSelectorProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
}
export interface Variant {
  id: number;
  options:  Record<string, string>;
  price: number;
  inventory_quantity: number;
  values: string[];
}

export interface Product {
  id: number;
  title: string;
  image_url: string;
  currency: string;
  options: string[];
  values: Record<string, string[]>;
  variants: Variant[];
}
