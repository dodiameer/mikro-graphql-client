<script>
  import { cubicOut } from "svelte/easing";

  import { fly } from "svelte/transition";
  import { link } from "svelte-spa-router";

  import type { BookDetailsQuery } from "../../generated/graphql";

  export let data: BookDetailsQuery["book"];
  export let animationDuration: number;
</script>

<h2
  in:fly="{{
    delay: 2 * 100,
    duration: animationDuration,
    y: 100,
    easing: cubicOut,
  }}">
  <a href="/author/{data.author.id}" use:link>
    By {data.author.name}, {data.author.age ?? "unknown age"}
  </a>
</h2>

<style>
  h2 {
    font-size: 1.2rem;
    color: #5c5c5c;
    & a {
      color: inherit;
    }
  }
</style>
