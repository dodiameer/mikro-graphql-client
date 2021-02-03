<script lang="ts">
  import { initClient } from "@urql/svelte";
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./constants";
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
<nav>
  <a href="/" use:link>Home</a>
  <a href="/book/98" use:link>YDKJS</a>
</nav>
<section>
  <Router routes="{routes}" />
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
