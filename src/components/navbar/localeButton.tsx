"use client";

import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import React, { ChangeEvent } from "react";

export default function LocaleButton() {
    const router = useRouter();
    const pathname = usePathname();

    const locale = useLocale();
    const t = useTranslations("Locale");

    return (
        <select
            className="flex w-full h-full text-center appearance-none bg-primary hover:text-tertiary duration-150"
            defaultValue={locale}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const nextLocale = event.target
                    .value as (typeof routing.locales)[number];

                if (nextLocale !== locale) {
                    router.replace(pathname, { locale: nextLocale });
                }
            }}
        >
            {routing.locales.map((x) => (
                <option key={x} value={x} className="text-text font-light">
                    {t(x)}
                </option>
            ))}
        </select>
    );
}
