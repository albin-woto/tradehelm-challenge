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

const resolve = <T>(data: T) =>
  new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });

export default {
  list: (): Promise<Item[]> => resolve<Item[]>(localItems),
  create: (text: Item["text"]): Promise<Item> => resolve<Item>({id: +new Date(), text}),
  removeItem: (id: Item["id"]): Promise<Item["id"]> => resolve<Item["id"]>(id),
  removeAll: (): Promise<Item[]> => resolve<Item[]>([]),
};
