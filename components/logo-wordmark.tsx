import Link from "next/link";

type LogoWordmarkProps = {
  className?: string;
  href?: string;
};

export function LogoWordmark({ className, href = "/" }: LogoWordmarkProps) {
  return (
    <Link className={className} href={href} aria-label="Elle De Marrer home">
      <span className="logo-wordmark">
        <span aria-hidden="true" className="logo-wordmark__reversed">
          E
        </span>
        LLE DE MARRER
      </span>
    </Link>
  );
}
