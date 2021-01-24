import React from "react";

import styles from "./Modal.module.scss";

interface Props {
  onClose: VoidFunction;
}

const Modal: React.FC<Props> = ({children, onClose}) => (
  <section className={styles.container} onKeyDown={(e) => e.key === "Escape" && onClose()}>
    <b onClick={onClose} />
    <article>{children}</article>
  </section>
);

export default Modal;
