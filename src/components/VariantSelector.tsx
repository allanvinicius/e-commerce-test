import type { VariantSelectorProps } from "../types";

export function VariantSelector({
  label,
  options,
  onChange,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">{label}</p>

      <div className="flex gap-2 flex-wrap mt-1">
        <select
          className="border p-2 rounded w-full"
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Selecione {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
