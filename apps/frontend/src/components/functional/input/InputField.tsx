interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  id: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputField({
  label,
  type,
  name,
  id,
  required,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <label
      htmlFor={id}
      className="relative block overflow-hidden rounded-md border border-gray-200 bg-white px-3 pt-3 shadow-xs focus-within:border-primary500 focus-within:ring-1 focus-within:ring-primary500"
    >
      <input
        type={type}
        name={name}
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="peer h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm"
      />

      <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
        {label}
      </span>
    </label>
  );
}
