<script lang="ts">
  import { initClient } from "@urql/svelte";
  import AllBooks from "./pages/AllBooks.svelte";
  import BookDetails from "./pages/BookDetails.svelte";
  initClient({
    url:
      process.env.NODE_ENV === "production"
        ? "https://mikro-graphql.herokuapp.com/graphql"
        : "http://localhost:4000/graphql",
    requestPolicy: "cache-and-network",
  });
</script>

<header>
  <h1>Mikro GraphQL</h1>
</header>
<!-- <section>
  <h1>All Books</h1>
  <AllBooks />
</section> -->
<section>
  <BookDetails id="98" />
</section>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  :global(*, *::before, *::after) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  header {
    padding: 2rem;
    background: orangered;
    color: white;
    text-align: center;
  }
  section {
    width: 75vw;
    margin: 1rem auto;
  }
</style>
