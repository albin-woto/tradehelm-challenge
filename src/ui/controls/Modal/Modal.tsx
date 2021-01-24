import React from "react";

import styles from "./Modal.module.scss";

interface Props {
  onClose: VoidFunction;
}

const Modal: React.FC<Props> = ({children, onClose}) => {
  return (
    <section className={styles.container}>
      <b onClick={onClose} />
      <article>{children}</article>
    </section>
  );
};

export default Modal;
