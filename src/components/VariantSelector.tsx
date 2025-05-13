import type { VariantSelectorProps } from "../types";

export function VariantSelector({
  label,
  options,
  selected,
  onChange,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">{label}:</p>
      
      <div className="flex gap-2 flex-wrap mt-1">
        {options.map((option) => (
          <button
            key={option}
            className={`px-3 py-1 border rounded-md cursor-pointer ${
              selected === option
                ? "bg-black text-white"
                : "bg-white border-gray-400"
            }`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
