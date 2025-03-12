"use client";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  number?: number;
  type?: "button" | "submit" | "reset";
  formAction?: string | ((formData: FormData) => Promise<void>);
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  hoverColor?: string;
}

export default function Button({
  icon,
  number = 0,
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
      {number > 0 && (
          <div className="bg-white px-2 rounded-full text-primary font-bold">
            {number}
          </div>
        )}
      {text}
    </button>
  );
}
