"use client";

import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {PropsWithChildren} from "react";
import {Button} from "@/components/ui/button";
import {Route} from "next";

type Props = PropsWithChildren<{
    to: Route;
    className?: string;
}>;

export const NavbarLink = ({to, children, className}: Props) => {
    const pathname = usePathname();
    const isActive = pathname.startsWith(to);

    return (
        <Link href={to} className={className}>
            <Button
                variant="link"
                className={cn(
                    "font-semibold w-full",
                    isActive && "!bg-[#646cff] text-white"
                )}
            >
                {children}
            </Button>
        </Link>
    );
};