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

export default {
  list: (): Promise<Item[]> => Promise.resolve(MOCK),
  create: (text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
  removeItem: (id: Item["id"]): Promise<Item["id"]> => Promise.resolve(id),
  removeAll: (): Promise<Item[]> => Promise.resolve([]),
};
