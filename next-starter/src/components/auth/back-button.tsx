"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { UrlObject } from "url";


interface BackButtonProps {
    label: string;
    href: UrlObject;
}

export const BackButton = ({ label, href }: BackButtonProps) => {

    return (
        <Button
            variant="link"
            className="w-full font-normal"
            size="sm"
            asChild>

            <Link href={href}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                {label}
            </Link>
        </Button>
    );
};