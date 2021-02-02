<script lang="ts">
  import { initClient } from "@urql/svelte";
  import AllBooks from "./pages/AllBooks.svelte";
  initClient({
    url:
      process.env.NODE_ENV === "production"
        ? "https://mikro-graphql.herokuapp.com/graphql"
        : "http://localhost:4000/graphql",
    requestPolicy: "cache-first",
  });
</script>

<AllBooks />
