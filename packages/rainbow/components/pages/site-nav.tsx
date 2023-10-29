import { ReactNode } from "react";
import { BronzeTheDogeLogo } from "../bronze-the-doge-logo";
import { LanguageToggler } from "../language-toggler";
import { useTranslation } from "../../hooks/use-translation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import classNames from "classnames";

function SiteNavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className="site-nav__link">
      {children}
    </a>
  );
}

export function SiteNav() {
  const { translations } = useTranslation();
  return (
    <>
      <Disclosure as="div">
        {({ open }) => (
          <nav
            className={classNames(
              "site-nav site-nav-mobile",
              open && "site-nav site-nav-mobile--menu-open"
            )}
          >
            <div className="site-nav-mobile__base">
              <Disclosure.Button className="burger-button">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <FaTimes
                    className="burger-icon burger-icon--close"
                    aria-hidden="true"
                  />
                ) : (
                  <FaBars
                    className="burger-icon burger-icon--open"
                    aria-hidden="true"
                  />
                )}
              </Disclosure.Button>
              <a href="#hero-section">
                <BronzeTheDogeLogo />
              </a>
              <LanguageToggler />
            </div>

            <div className="site-nav-mobile__links">
              <SiteNavLink href="#history-section">
                {translations.navBar.history}
              </SiteNavLink>
              <SiteNavLink href="#donors-section">
                {translations.navBar.donors}
              </SiteNavLink>
              <SiteNavLink href="#footer">
                {translations.navBar.contact}
              </SiteNavLink>
            </div>
          </nav>
        )}
      </Disclosure>
      <nav className={"site-nav site-nav-desktop"}>
        <SiteNavLink href="#history-section">
          {translations.navBar.history}
        </SiteNavLink>
        <SiteNavLink href="#donors-section">
          {translations.navBar.donors}
        </SiteNavLink>
        <a href="#hero-section">
          <BronzeTheDogeLogo />
        </a>
        <SiteNavLink href="#footer">{translations.navBar.contact}</SiteNavLink>
        <LanguageToggler />
      </nav>
    </>
  );
}
