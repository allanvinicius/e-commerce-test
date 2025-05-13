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
  images: string[];
  selectedImage: string;
  onSelect: (image: string) => void;
}

export interface ProductState {
  selectedImage: string;
  selectedSize: string;
  selectedColor: string;
  cepData: CepData | null;
}

export interface VariantSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export interface ProductVariant {
  images: string[];
}

export interface ProductData {
  title: string;
  price: number;
  variants: {
    [color: string]: ProductVariant;
  };
  images: string[];
  sizes: string[];
  colors: string[];
}
