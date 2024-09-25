import { Poppins } from "next/font/google";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeLoader from "@/components/themeLoader";
import Footer from "@/components/footer";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "BisQuit",
    description: "BisQuit Portfolio",
};

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={poppins.className}>
                <NextIntlClientProvider messages={messages}>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            style: {
                                background: "var(--primary)",
                                color: "var(--text)",
                                paddingLeft: "20px",
                                paddingRight: "20px",
                                paddingTop: "12px",
                                paddingBlock: "12px",
                            },
                        }}
                    />
                    {children}
                    <ThemeLoader />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
