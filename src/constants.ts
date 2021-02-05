import AllBooks from "./pages/AllBooks.svelte";
import { wrap } from "svelte-spa-router/wrap";
export const routes = {
  "/": AllBooks,
  "/book/:id": wrap({
    asyncComponent: () => import("./pages/BookDetails.svelte"),
  }),
  "/authors": wrap({
    asyncComponent: () => import("./pages/AllAuthors.svelte"),
  }),
};
