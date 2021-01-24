import * as React from "react";

import api from "../Item/api";
import {Item} from "../Item/types";
import List, {ListItem} from "../Item/components";
import Button from "../ui/controls/Button";
import Modal, {ModalFooter} from "../ui/controls/Modal";
import TextField from "../ui/inputs/TextField";
import ThemeToggle from "../ui/dark-mode/ThemeToggle";

import styles from "./App.module.scss";

enum Status {
  Init = "init",
  Success = "Success",
}
interface Form extends HTMLFormElement {
  text: HTMLInputElement;
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

  function addItem(event: React.FormEvent<Form>) {
    event.preventDefault();

    const text = event.currentTarget.text.value.trim();

    if (!text) return;

    api.create(text).then((item) => {
      setItems([...items, item]);
      toggleModal(false);
    });
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
        <List empty={items.length === 0 ? true : false}>
          {items.map(({id, text}) => (
            <ListItem key={id} onRemove={() => removeItem(id)}>
              <span>{text}</span>
            </ListItem>
          ))}
        </List>
      </header>
      <Button autoFocus colorScheme="primary" onClick={() => toggleModal(true)}>
        Add Item
      </Button>
      <Button colorScheme="delete" onClick={() => removeAll()}>
        Remove All
      </Button>
      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form onSubmit={addItem}>
            <label>Add Item</label>
            <TextField autoFocus name="text" />
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
      <ThemeToggle />
    </main>
  );
};

export default App;
