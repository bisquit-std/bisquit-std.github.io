import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import StoreProvider from "./StoreProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LifeLink Web",
    description: "LifeLink Web Application powered by Next.js",
};

export default function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: {
        locale: string;
    };
}>) {
    const messages = useMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <StoreProvider>
                        {children}
                        <ToastContainer
                            closeOnClick
                            pauseOnHover={false}
                            transition={Zoom}
                        />
                    </StoreProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
