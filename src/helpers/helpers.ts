import toast from "react-hot-toast";

export const DateHelpers = {
    monthToNumber: (month: string): number => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return months.indexOf(month) + 1;
    },
};

export const Helpers = {
    copyText: (text: string, message: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast(message);
            })
            .catch((error) => {
                console.error("Error copying text: ", error);
            });
    },

    openMail: (email: string) => {
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
            ""
        )}&body=${encodeURIComponent("")}`;

        const anchor = document.createElement("a");
        anchor.href = mailtoLink;
        anchor.target = "_blank";

        document.body.appendChild(anchor);

        anchor.click();

        document.body.removeChild(anchor);
    },
};
