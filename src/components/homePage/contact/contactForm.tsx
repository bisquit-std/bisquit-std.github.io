"use client";

import Input, { InputType } from "@/components/input";
import { REGEX } from "@/constants/constants";
import React, { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";

export default function ContactForm() {
    const t = useTranslations();
    const [sending, setSending] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const email = (form["from_email"] as HTMLInputElement).value;
        const name = (form["from_name"] as HTMLInputElement).value;
        const message = (form["message"] as HTMLTextAreaElement).value;

        // Validation checks
        if (!email || !name || !message) {
            toast.error(t("Contact.allFieldsNeeded"));
            return;
        }

        if (!REGEX.email.test(email)) {
            toast.error(t("Contact.validEmail"));
            return;
        }

        if (message.length < 10) {
            toast.error(t("Contact.messageLength"));
            return;
        }

        toast.promise(sendMail(form), {
            loading: t("Contact.sending"),
            success: t("Contact.messageSent"),
            error: t("Contact.messageError"),
        });
    };

    const sendMail = (form: HTMLFormElement): Promise<void> => {
        return new Promise((resolve, reject) => {
            setSending(true);

            emailjs
                .sendForm(
                    "service_0l7rm1u",
                    "template_3cstjo4",
                    form,
                    "Ct6NR9M4xjBK_ll0b"
                )
                .then(() => {
                    form.reset();
                    setSending(false);
                    resolve();
                })
                .catch((error) => {
                    setSending(false);
                    reject(error);
                });
        });
    };

    return (
        <form className="flex flex-col w-[70%] gap-3" onSubmit={handleSubmit}>
            <div className="flex gap-3">
                <Input
                    type={InputType.TEXT}
                    title={t("Common.name")}
                    value={"from_name"}
                />
                <Input
                    type={InputType.TEXT}
                    title={t("Common.email")}
                    value={"from_email"}
                />
            </div>
            <Input
                type={InputType.MEMO}
                title={t("Common.message")}
                value={"message"}
            />
            <button
                type="submit"
                disabled={sending}
                className={`self-center border-2 border-tertiary w-40 py-2 text-lg rounded-sm contactButton ${
                    sending ? "opacity-30" : ""
                }`}
            >
                {t("Common.submit")}
            </button>
        </form>
    );
}
