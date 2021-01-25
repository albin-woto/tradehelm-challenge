import React from "react";

import styles from "./List.module.scss";

interface Props {
  empty: boolean;
}

const List: React.FC<Props> = ({children, empty}) => (
  <>
    {empty && (
      <>
        <img
          className={styles.image}
          src={`${process.env.PUBLIC_URL}/images/empty_shopping_list.svg`}
        />
        <p>Your list is empty. You should add something!</p>
      </>
    )}
    <ul className={styles.container}>{children}</ul>
  </>
);

export default List;
