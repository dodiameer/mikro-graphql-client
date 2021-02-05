import { writable } from "svelte/store";

export interface IPageState {
  AllBooks: {
    offset: number;
    limit: number;
  };
  AllAuthors: {
    offset: number;
    limit: number;
  };
}

export const pageState = writable<IPageState>({
  AllBooks: {
    offset: 0,
    limit: 5,
  },
  AllAuthors: {
    offset: 0,
    limit: 5,
  },
});

export default pageState;
