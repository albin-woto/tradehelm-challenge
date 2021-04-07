import * as React from "react";

import api from "../Item/api";
import {Item} from "../Item/types";
import StatusContext, {Status} from "../context/status/StatusContext";
import ThemeContext from "../context/theme/ThemeContext";
import List, {ListItem} from "../Item/components";
import Button from "../ui/controls/Button";
import Modal, {ModalFooter} from "../ui/controls/Modal";
import TextField from "../ui/inputs/TextField";
import Loader from "../Loader";
import ThemeToggle from "../ThemeToggle";

import styles from "./App.module.scss";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const App: React.FC = () => {
  const {styleProperties} = React.useContext(ThemeContext);
  const {status, setStatus} = React.useContext(StatusContext);
  const [items, setItems] = React.useState<Item[]>([]);
  const [isModalVisible, toggleModal] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<string>("");
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

    if (!input) return;

    setStatus(Creating);
    api.create(input).then((item) => {
      setItems([...items, item]);
      setInput("");
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
    <main className={styles.container} style={styleProperties}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>{items.length} item(s)</h3>
        {(status === Init || status === Removing) && <Loader />}
      </header>
      <section>
        <List empty={items.length === 0 ? true : false}>
          {items.map(({id, text}) => (
            <ListItem key={id} style={styleProperties} onRemove={() => removeItem(id)}>
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
      </section>
      {isModalVisible && (
        <Modal style={styleProperties} onClose={() => toggleModal(false)}>
          <form onSubmit={addItem}>
            <label>Add Item</label>
            <TextField
              autoFocus
              name="text"
              style={styleProperties}
              onChange={(e) => setInput(e.target.value)}
            />
            <ModalFooter>
              <Button type="button" onClick={() => toggleModal(false)}>
                Close
              </Button>
              <Button colorScheme="primary" disabled={input ? false : true} type="submit">
                {(status === Status.Creating && <Loader />) || "Add"}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
      <ThemeToggle />
      <a
        className={styles.link}
        href="https://github.com/albin-woto/tradehelm-challenge"
        rel="noreferrer"
        target="_blank"
      >
        Code
      </a>
    </main>
  );
};

export default App;
