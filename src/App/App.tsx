import * as React from "react";

import api from "../Item/api";
import {Item} from "../Item/types";
import Button from "../ui/controls/Button";
import Modal, {ModalFooter} from "../ui/controls/Modal";

import styles from "./App.module.scss";

enum Status {
  Init = "init",
  Success = "Success",
}

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<Status>(Status.Init);
  const [isModalVisible, toggleModal] = React.useState<boolean>(false);

  function removeItem(id: Item["id"]) {
    api.removeItem(id).then(() => setItems((items) => items.filter((item) => item.id !== id)));
  }

  function removeAll() {
    api.removeAll().then(() => setItems([]));
  }

  React.useEffect(() => {
    api.list().then((items) => {
      setItems(items);
      setStatus(Status.Success);
    });
  }, []);

  if (status === Status.Init) {
    return <span>Loading...</span>;
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>{items.length} item(s)</h3>
        <ul>
          {items.map(({id, text}) => (
            <li key={id}>
              <span>{text}</span>
              <button onClick={() => removeItem(id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
      <Button colorScheme="primary" onClick={() => toggleModal(true)}>
        Add Item
      </Button>
      <Button colorScheme="delete" onClick={() => removeAll()}>
        Remove All
      </Button>
      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form>
            <label>Add Item</label>
            <input type="text" />
            <ModalFooter>
              <Button colorScheme="primary" type="submit">
                Add
              </Button>
              <Button type="button" onClick={() => toggleModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default App;
