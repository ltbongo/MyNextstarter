import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-poppins",
});

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="flex flex-col gap-y-4 items-center justify-center w-full">
            <h1 className={cn(
                font.className,
                "text-3xl font-semibold"
            )}>Template
            </h1>
            <p className="text-sm text-muted-foreground">
                {label}
            </p>
        </div>
       
    );
};

