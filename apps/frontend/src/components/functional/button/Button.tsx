interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export default function Button({ icon, text, type }: ButtonProps) {
  return (
    <button
      className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-lg flex items-center gap-2"
      type={type}
    >
      {icon}
      {text}
    </button>
  );
}
