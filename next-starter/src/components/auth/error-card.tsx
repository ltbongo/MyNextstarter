import { Header } from "@/components/auth/header";
import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { UrlObject } from "url";
import { BackButton } from "./back-button";

export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Oops! Something went wrong" />
            </CardHeader>
            <CardFooter>
                <BackButton 
                    label="Back to Login"
                    href={{pathname: "/signin" } as UrlObject}
                />
            </CardFooter>
        </Card>
    );
};

