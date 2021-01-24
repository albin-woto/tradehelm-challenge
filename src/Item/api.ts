import {Item} from "./types";

const MOCK: Item[] = [
  {
    id: 1,
    text: "Ice Cream",
  },
  {
    id: 2,
    text: "Sandwich",
  },
  {
    id: 3,
    text: "Sushi",
  },
];

const retrievedItems: string | null = localStorage.getItem("localItems");
const localItems: Item[] = retrievedItems !== null ? JSON.parse(retrievedItems) : MOCK;

export default {
  list: (): Promise<Item[]> => Promise.resolve(localItems),
  create: (text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
  removeItem: (id: Item["id"]): Promise<Item["id"]> => Promise.resolve(id),
  removeAll: (): Promise<Item[]> => Promise.resolve([]),
};
