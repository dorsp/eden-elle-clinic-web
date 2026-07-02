import { type ReactNode } from "react";
import { ShellVisibility } from "@/components/shell-visibility";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ShellVisibility footer={<SiteFooter />} header={<SiteHeader />}>
      {children}
    </ShellVisibility>
  );
}
