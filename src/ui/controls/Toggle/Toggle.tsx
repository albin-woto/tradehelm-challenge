import React from "react";

import styles from "./Toggle.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  onToggle: VoidFunction;
}

const Toggle: React.FC<Props> = ({id, onToggle, htmlFor}) => (
  <>
    <div className={styles.toggle}>
      <input className={styles.toggle__input} id={id} type="checkbox" onClick={onToggle} />
      <label aria-label="Toggle" className={styles.toggle__label} htmlFor={htmlFor}>
        <div className={styles.toggle__ball} />
      </label>
    </div>
  </>
);

export default Toggle;
