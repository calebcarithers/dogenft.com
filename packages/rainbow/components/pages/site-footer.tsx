import {
  FaDiscord,
  FaInstagram,
  FaReddit,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useTranslation } from "../../hooks/use-translation";
import { OwnTheDogeLogo } from "../own-the-doge-logo";
import { ReactNode } from "react";

interface SocialMediaLink {
  title: string;
  icon: ReactNode;
  href: string;
}

const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
  {
    icon: <FaTwitter />,
    title: "Twitter",
    href: "https://twitter.com/ownthedoge",
  },
  {
    icon: <FaDiscord />,
    title: "Discord",
    href: "https://discord.gg/thedogenft",
  },
  { icon: <FaTelegram />, title: "Telegram", href: "https://t.me/ownthedoge" },
  {
    icon: <FaReddit />,
    title: "Reddit",
    href: "https://www.reddit.com/r/ownthedoge/",
  },
  {
    icon: <FaYoutube />,
    title: "Youtube",
    href: "https://www.youtube.com/@ownthedoge",
  },
  {
    icon: <FaInstagram />,
    title: "Instagram",
    href: "https://instagram.com/ownthedoge",
  },
  {
    icon: <FaTiktok />,
    title: "TikTok",
    href: "https://www.tiktok.com/@ownthedoge",
  },
];

export function SiteFooter() {
  const { translations } = useTranslation();

  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer__container">
        <p className="site-footer__credits">
          {translations.contactSection.credits.prefix}{" "}
          <span className="site-footer__credits--love">
            {translations.contactSection.credits.love}
          </span>{" "}
          {translations.contactSection.credits.suffix}
        </p>

        <OwnTheDogeLogo className="site-footer__logo" />

        <div className="site-footer__social-links">
          {SOCIAL_MEDIA_LINKS.map((b) => (
            <a
              key={b.title}
              title={b.title}
              href={b.href}
              target="_blank"
              rel="noreferrer"
            >
              {b.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SocialButton() {}
