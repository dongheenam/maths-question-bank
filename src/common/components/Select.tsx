type Props<T extends string | number> = {
  value: T;
  setValue: (value: T) => void;
  options: T[] | readonly T[];
  label: string;
};
export default function Select<T extends string | number>({
  value,
  setValue,
  options,
  label,
}: Props<T>) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(e) => setValue(e.target.value as T)}>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
