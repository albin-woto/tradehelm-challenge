import React, {CSSProperties} from "react";

import StatusContext, {Status} from "../../context/status/StatusContext";

import styles from "./ListItem.module.scss";

interface Props {
  onRemove: VoidFunction;
  style?: CSSProperties;
}

const ListItem: React.FC<Props> = ({children, onRemove, style}) => {
  const {status} = React.useContext(StatusContext);
  const isUnavailable = status === Status.Init || status === Status.Removing;

  return (
    <li className={styles.container} style={style}>
      <span>{children}</span>
      <button disabled={isUnavailable} onClick={onRemove}>
        delete
      </button>
    </li>
  );
};

export default ListItem;
