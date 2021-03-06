import React from "react";

import StatusContext, {Status} from "../../../context/status/StatusContext";

import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: "primary" | "secondary" | "delete";
}

const Button: React.FC<Props> = ({children, colorScheme = "secondary", ...props}) => {
  const {status} = React.useContext(StatusContext);
  const isUnavailable = status === Status.Init || status === Status.Removing;

  return (
    <button
      className={`${styles.container} ${styles[colorScheme]}`}
      disabled={isUnavailable}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
