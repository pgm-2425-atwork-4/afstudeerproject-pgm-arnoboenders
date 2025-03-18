interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  id: string;
  required?: boolean;
  placeholder: string;
  value?: string;
  onChange: (
    event:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
  ) => void;
  children?: React.ReactNode;
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
  children,
}: InputFieldProps) {
  return (
    <>
      {type === "textarea" ? (
        <div>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>

          <textarea
            className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-xs sm:text-sm"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={4}
            id={id}
            name={name}
          ></textarea>
        </div>
      ) : type === "checkbox" ? (
        <div className="flex items-center">
          <label
            htmlFor={id}
            className="flex cursor-pointer items-start gap-4 rounded-lg py-3 px-1 transition hover:underline hover:cursor-pointer"
          >
            <div className="flex items-center">
              &#8203;
              <input
                type={type}
                name={name}
                id={id}
                required={required}
                checked={value === "true"}
                onChange={onChange}
                className="size-4 rounded-sm border-none"
              />
            </div>

            <p>{label}</p>
          </label>
        </div>
      ) : type === "select" ? (
        <div>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-900"
          >
            {label}
          </label>

          <select
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
        </div>
      ) : (
        <div>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>

          <input
            type={type}
            name={name}
            id={id}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
            min={type === "number" ? "0" : undefined}
          />
        </div>
      )}
    </>
  );
}
