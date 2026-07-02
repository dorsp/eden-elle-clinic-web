"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type ShellVisibilityProps = {
  children: ReactNode;
  footer: ReactNode;
  header: ReactNode;
};

export function ShellVisibility({ children, footer, header }: ShellVisibilityProps) {
  const pathname = usePathname();
  const isCatalog = pathname?.startsWith("/catalog");

  if (isCatalog) {
    return <main>{children}</main>;
  }

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
