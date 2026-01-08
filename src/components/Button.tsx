import type { ReactNode } from "react";
import "../index.css";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className }: IButtonProps) {
  return (
    <button
      className={
        "bg-accent text-text-primary-dark rounded-md" + (className || "")
      }
    >
      {children}
    </button>
  );
}
