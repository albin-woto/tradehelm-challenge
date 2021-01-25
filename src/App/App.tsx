import * as React from "react";

import api from "../Item/api";
import {Item} from "../Item/types";
import StatusContext, {Status} from "../context/StatusContext";
import List, {ListItem} from "../Item/components";
import Button from "../ui/controls/Button";
import Modal, {ModalFooter} from "../ui/controls/Modal";
import TextField from "../ui/inputs/TextField";
import ThemeToggle from "../ui/dark-mode/ThemeToggle";
import Loader from "../ui//loader/Loader";

import styles from "./App.module.scss";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const {status, setStatus} = React.useContext(StatusContext);
  const [isModalVisible, toggleModal] = React.useState<boolean>(false);
  const {Init, Creating, Removing, Success} = Status;

  function removeItem(id: Item["id"]) {
    setStatus(Removing);
    api.removeItem(id).then(() => {
      setItems((items) => items.filter((item) => item.id !== id));
      setStatus(Success);
    });
  }

  function removeAll() {
    setStatus(Removing);
    api.removeAll().then(() => {
      setItems([]);
      setStatus(Success);
    });
  }

  function addItem(event: React.FormEvent<Form>) {
    event.preventDefault();

    const text = event.currentTarget.text.value.trim();

    if (!text) return;
    setStatus(Creating);

    api.create(text).then((item) => {
      setItems([...items, item]);
      toggleModal(false);
      setStatus(Success);
    });
  }

  React.useEffect(() => {
    api.list().then((items) => {
      setItems(items);
      setStatus(Success);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep items up to date in localStorage
  React.useEffect(() => {
    localStorage.setItem("localItems", JSON.stringify(items));
  }, [items]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>{items.length} item(s)</h3>
        {(status === Init || status === Removing) && <Loader />}
      </header>
      <List empty={items.length === 0 ? true : false}>
        {items.map(({id, text}) => (
          <ListItem key={id} onRemove={() => removeItem(id)}>
            <span>{text}</span>
          </ListItem>
        ))}
      </List>
      <Button colorScheme="delete" onClick={() => removeAll()}>
        Remove All
      </Button>
      <Button autoFocus colorScheme="primary" onClick={() => toggleModal(true)}>
        Add Item
      </Button>
      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form onSubmit={addItem}>
            <label>Add Item</label>
            <TextField autoFocus name="text" />
            <ModalFooter>
              <Button type="button" onClick={() => toggleModal(false)}>
                Close
              </Button>
              <Button colorScheme="primary" type="submit">
                {(status === Status.Creating && <Loader />) || "Add"}
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
