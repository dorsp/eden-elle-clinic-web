import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "light";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

function getClassName(variant: ButtonVariant, className?: string) {
  return ["button", `button--${variant}`, className].filter(Boolean).join(" ");
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  if ("href" in props && props.href) {
    const { children, variant = "primary", className, href, ...linkProps } = props;

    if (/^https?:\/\//.test(href)) {
      return (
        <a className={getClassName(variant, className)} href={href} {...linkProps}>
          {children}
        </a>
      );
    }

    return (
      <Link className={getClassName(variant, className)} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { children, variant = "primary", className, ...buttonProps } = props as ButtonAsButton;

  return (
    <button className={getClassName(variant, className)} {...buttonProps}>
      {children}
    </button>
  );
}
