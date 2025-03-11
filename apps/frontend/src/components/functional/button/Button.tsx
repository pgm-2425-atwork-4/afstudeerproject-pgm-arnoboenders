"use client";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  formAction?: string | ((formData: FormData) => Promise<void>);
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  hoverColor?: string;
}

export default function Button({
  icon,
  text,
  type,
  formAction,
  onClick,
  disabled,
  color,
  hoverColor,
}: ButtonProps) {
  return (
    <button
      className={`text-white px-6 py-3 rounded-lg flex justify-center items-center gap-2 ${color ? `${color}` : "bg-primary"} ${hoverColor ? `hover:${hoverColor}` : "hover:bg-primary500"}`}
      type={type}
      formAction={formAction}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
}
