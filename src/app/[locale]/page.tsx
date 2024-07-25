import { Link } from "../../navigation";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("HomePage");

    return (
        <main className={styles.container}>
            <p className={styles.title}>{t("title")}</p>
            <Link href={"/login"} className={styles.loginButton}>
                {t("login")}
            </Link>
        </main>
    );
}
