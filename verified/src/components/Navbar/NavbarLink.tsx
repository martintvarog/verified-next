"use client";

import { cn } from "@/lib/utils";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  to: ComponentProps<typeof Link>["href"];
}>;

export const NavbarLink = ({ to, children }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link href={to}>
      <Button
        color="inherit"
        className={cn(
          "font-semibold",
          isActive
            ? "!bg-[#646cff] text-white"
            : "text-[#646cff] hover:underline",
        )}
      >
        {children}
      </Button>
    </Link>
  );
};
