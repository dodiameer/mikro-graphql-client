<script lang="ts">
  import { initClient } from "@urql/svelte";
  import AllBooks from "./pages/AllBooks.svelte";
  const world = "world"; // edit world and save to see hmr update
  initClient({
    url: "https://mikro-graphql.herokuapp.com/graphql",
    requestPolicy: "network-only",
  });
</script>

<h1>Hello {world}</h1>
<p>Open App.svelte in your editor and change something to see HMR in action</p>

<AllBooks />

<style>
  h1 {
    color: blue; /* change color an save to see hmr update */
  }
</style>
