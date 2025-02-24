interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
}

export default function Button({ icon, text }: ButtonProps) {
  return (
    <button className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-lg flex items-center gap-2">
      {icon}
      {text}
    </button>
  );
}
