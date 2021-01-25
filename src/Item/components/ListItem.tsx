import React from "react";

import StatusContext, {Status} from "../../context/StatusContext";

import styles from "./ListItem.module.scss";

interface Props {
  onRemove: VoidFunction;
}

const ListItem: React.FC<Props> = ({children, onRemove}) => {
  const {status} = React.useContext(StatusContext);
  const isUnavailable = status === Status.Init || status === Status.Removing;

  return (
    <li className={styles.container}>
      <span>{children}</span>
      <button disabled={isUnavailable} onClick={onRemove}>
        delete
      </button>
    </li>
  );
};

export default ListItem;
