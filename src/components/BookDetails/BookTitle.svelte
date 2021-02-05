<script>
  import { cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  import type { BookDetailsQuery } from "../../generated/graphql";

  export let data: BookDetailsQuery["book"];
  export let animationDuration: number;
</script>

<h1
  in:fly="{{
    delay: 1 * 100,
    duration: animationDuration,
    y: 100,
    easing: cubicOut,
  }}">
  {data.title}
</h1>

<style>
  h1 {
    font-size: 2rem;
  }
</style>
