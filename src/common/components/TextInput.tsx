type Props = {
  value: string;
  setValue: (value: string) => void;
  label: string;
};
export default function Select({ value, setValue, label }: Props) {
  return (
    <label>
      <span>{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
