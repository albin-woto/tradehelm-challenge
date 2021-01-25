import React, {CSSProperties} from "react";

import styles from "./Modal.module.scss";

interface Props {
  onClose: VoidFunction;
  style?: CSSProperties;
}

const Modal: React.FC<Props> = ({children, onClose, style}) => (
  <section className={styles.container} onKeyDown={(e) => e.key === "Escape" && onClose()}>
    <b onClick={onClose} />
    <article style={style}>{children}</article>
  </section>
);

export default Modal;
