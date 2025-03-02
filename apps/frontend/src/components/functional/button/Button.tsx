interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  formAction?: string | ((formData: FormData) => Promise<void>);
  onClick?: () => void;
}

export default function Button({
  icon,
  text,
  type,
  formAction,
  onClick,
}: ButtonProps) {
  return (
    <button
      className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-lg flex items-center gap-2"
      type={type}
      formAction={formAction}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
