import { useState } from "react";
import type { CepData, DeliveryCheckerProps } from "../types";

export function DeliveryChecker({ cepData, setCepData }: DeliveryCheckerProps) {
  const [cep, setCep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string>("");

  async function handleCheckCep() {
    setError(null);

    if (!cep || cep.length !== 8) {
      setInputError("O CEP deve conter exatamente 8 dígitos.");
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const data: CepData = await res.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      setCepData(data);
    } catch (error) {
      setError((error as Error).message);
    }

    setCep("");
  }

  return (
    <div className="space-y-2">
      <p className="font-semibold">Consultar Entrega:</p>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
          maxLength={8}
          className="border px-3 py-2 rounded w-full"
        />

        <button
          onClick={handleCheckCep}
          disabled={cep.length !== 8}
          className={
            cep.length !== 8
              ? "bg-black/50 opacity-50 px-4 py-2 rounded cursor-not-allowed"
              : "bg-black opacity-100 text-white px-4 py-2 rounded cursor-pointer"
          }
        >
          Verificar
        </button>
      </div>

      {cepData && (
        <p className="text-sm text-gray-700 max-w-[400px]">
          {cepData.logradouro}, {cepData.bairro} - {cepData.localidade}/
          {cepData.uf}
        </p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {inputError && <p className="text-red-500">{inputError}</p>}
    </div>
  );
}
