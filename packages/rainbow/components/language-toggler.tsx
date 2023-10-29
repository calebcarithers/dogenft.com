import Link from "next/link";
import { useRouter } from "next/router";

export function LanguageToggler() {
  const { locale } = useRouter();

  return (
    <Link href="/" locale={locale === "en-US" ? "ja" : "en-US"}>
      <a
        className={`language-toggler ${
          locale === "en-US" ? "language-toggler--reversed" : ""
        }`}
      >
        {locale === "en-US" ? (
          <>
            <img
              src="./images/rainbow/flags/japan.png"
              className="language-toggler__flag"
              alt="Japanese flag"
            />
            <span className="language-toggler__language-abbreviation">JP</span>
          </>
        ) : (
          <>
            <img
              src="./images/rainbow/flags/usa.png"
              className="language-toggler__flag"
              alt="American flag"
            />
            <span className="language-toggler__language-abbreviation">EN</span>
          </>
        )}
      </a>
    </Link>
  );
}
