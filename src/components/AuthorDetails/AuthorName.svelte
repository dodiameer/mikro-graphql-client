<script>
  import { cubicOut } from "svelte/easing";

  import { fly } from "svelte/transition";

  import type { AuthorDetailsQuery } from "../../generated/graphql";

  export let data: AuthorDetailsQuery["author"];
  export let animationDuration: number;
</script>

<h1
  in:fly="{{
    delay: 1 * 100,
    duration: animationDuration,
    y: 100,
    easing: cubicOut,
  }}">
  {data.name}
</h1>

<style>
  h1 {
    font-size: 2rem;
  }
</style>
