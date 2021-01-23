import * as React from "react";

import Button from "../ui/controls/Button";

import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>0 item(s)</h3>
      </header>
      <Button colorScheme="primary">Add Item</Button>
    </main>
  );
};

export default App;
