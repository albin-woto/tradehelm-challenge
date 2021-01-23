import React from "react";

import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: "primary" | "secondary";
}

const Button: React.FC<Props> = ({children, colorScheme = "secondary", ...props}) => {
  return (
    <button className={`${styles.container} ${styles[colorScheme]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
