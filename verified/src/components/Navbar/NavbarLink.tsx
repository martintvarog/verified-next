"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Route } from "next";

type Props = PropsWithChildren<{
  to: Route;
}>;

export const NavbarLink = ({ to, children }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(to);

  return (
    <Link href={to}>
      <Button
        variant="link"
        className={cn(
          "font-semibold",
          isActive && "!bg-[#646cff] text-white"
        )}
      >
        {children}
      </Button>
    </Link>
  );
};
