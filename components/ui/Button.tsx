import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
  secondary: "bg-surface-muted text-foreground hover:bg-border",
  outline: "border border-border bg-surface text-foreground hover:bg-surface-muted",
  ghost: "text-foreground hover:bg-surface-muted",
  danger: "bg-danger-500 text-white hover:bg-danger-600",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 rounded-lg gap-1.5",
  md: "text-sm px-4 py-2.5 rounded-xl gap-2",
  lg: "text-base px-5 py-3 rounded-xl gap-2",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", size = "md", fullWidth, className, children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
