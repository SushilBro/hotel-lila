import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variant === "primary" && "bg-brand-primary text-white hover:opacity-95",
        variant === "secondary" && "bg-brand-secondary text-slate-900 hover:opacity-95",
        variant === "ghost" && "bg-transparent text-brand-text hover:bg-slate-100",
        className
      )}
      {...props}
    />
  );
}
