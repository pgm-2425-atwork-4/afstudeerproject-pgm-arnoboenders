interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  formAction?: string | ((formData: FormData) => Promise<void>);
}

export default function Button({ icon, text, type, formAction }: ButtonProps) {
  return (
    <button
      className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-lg flex items-center gap-2"
      type={type}
      formAction={formAction}
    >
      {icon}
      {text}
    </button>
  );
}
