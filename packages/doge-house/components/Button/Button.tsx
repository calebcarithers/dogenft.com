import { css } from "dsl/helpers/css";
import { PropsWithChildren } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      className={css("border-[1px]", "border-black", "p-1")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
