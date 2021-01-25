import React from "react";

import styles from "./Toggle.module.scss";

const Toggle: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = () => (
  <div className={styles.toggle} id={styles.toggle}>
    <input className={styles.toggle__input} id="toggle" type="checkbox" />
    <label aria-label="Toggle" className={styles.toggle__label} htmlFor="toggle">
      <div className={styles.toggle__ball} />
    </label>
  </div>
);

export default Toggle;
