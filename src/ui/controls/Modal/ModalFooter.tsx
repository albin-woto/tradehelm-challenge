import React from "react";

import styles from "./ModalFooter.module.scss";

const ModalFooter: React.FC = ({children}) => <nav className={styles.container}>{children}</nav>;

export default ModalFooter;
