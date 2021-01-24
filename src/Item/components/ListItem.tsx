import React from "react";

import styles from "./ListItem.module.scss";

interface Props {
  onRemove: VoidFunction;
}

const ListItem: React.FC<Props> = ({children, onRemove}) => (
  <li className={styles.container}>
    <span>{children}</span>
    <button onClick={onRemove}>delete</button>
  </li>
);

export default ListItem;
