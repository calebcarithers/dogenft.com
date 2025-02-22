import Button from "dsl/components/Button/Button";
import React, { useContext, useState } from "react";
import { navItems } from "../../components/Home/HomeItems";
import NavItem from "../../components/NavItem/NavItem";
import { vars } from "../../environment/vars";
import { css } from "../../helpers/css";
import { event } from "../../services/ga";
import LinksModal from "./LinksModal";

const NavContext = React.createContext<any>("doge");
export const NavProvider = NavContext.Provider;
export const useNavContext = () => useContext(NavContext);

const Nav = () => {
  const [selection] = useNavContext();
  const [isDocsModalVisible, setIsDocsModalVisible] = useState(false);
  return (
    <div
      className={css(
        "flex",
        "flex-col",
        "justify-between",
        "md:col-span-4",
        "xl:col-span-3",
        "sticky"
      )}
    >
      <div
        className={css(
          "flex",
          "items-center",
          "justify-center",
          "grow",
          "border-b-2",
          "md:border-b-0",
          "border-pixels-yellow-200",
          "border-dashed"
        )}
      >
        <div
          className={css(
            "text-3xl",
            "flex",
            "md:flex-col",
            "md:space-y-10",
            "px-10",
            "pt-3"
          )}
        >
          {navItems.map((item) => {
            const isSelected = item.id === selection;
            return (
              <div
                key={item.id}
                className={css(
                  "relative",
                  "md:inline-block",
                  "max-w-max",
                  "mb-3",
                  "md:mb-0",
                  { hidden: !isSelected }
                )}
              >
                {isSelected && (
                  <div
                    className={css("absolute", "text-2xl")}
                    style={{
                      top: "50%",
                      left: -35,
                      transform: "translateY(-50%)",
                    }}
                  >
                    ✨
                  </div>
                )}
                <NavItem
                  isSelected={isSelected}
                  onClick={() => {
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(
                      {
                        ...window.history.state,
                        as: `/?wow=${item.id}`,
                        url: `/?wow=${item.id}`,
                      },
                      "",
                      `/?wow=${item.id}`
                    );
                    event({
                      action: "navigateClick",
                      params: { navItem: item.title },
                    });
                  }}
                >
                  {item.title}
                </NavItem>
                {isSelected && (
                  <div
                    className={css("absolute", "text-2xl")}
                    style={{
                      top: "50%",
                      right: -35,
                      transform: "translateY(-50%)",
                    }}
                  >
                    ✨
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={css("flex", "items-center")}>
        <div>
          <div
            className={css(
              "hidden",
              "md:flex",
              "md:flex-col",
              "items-start",
              "space-y-4",
              "py-5"
            )}
          >
            <Button
              onClick={() => {
                window.open(vars.NEXT_PUBLIC_DISCORD_LINK, "_blank");
              }}
            >
              discord
            </Button>
            <Button
              onClick={() => {
                window.open(vars.NEXT_PUBLIC_TWITTER_LINK, "_blank");
              }}
            >
              twitter
            </Button>
            <Button onClick={() => setIsDocsModalVisible(!isDocsModalVisible)}>
              links
            </Button>
            {/* <Link href={"/radio"}>
              <Button>radio</Button>
            </Link> */}
          </div>
        </div>
      </div>
      <LinksModal
        open={isDocsModalVisible}
        onChange={(value) => setIsDocsModalVisible(value)}
      />
    </div>
  );
};

export default Nav;
