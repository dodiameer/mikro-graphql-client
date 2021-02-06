<script>
  import { cubicOut } from "svelte/easing";

  import { fly } from "svelte/transition";

  import type { AuthorDetailsQuery } from "../../generated/graphql";

  export let data: AuthorDetailsQuery["author"];
  export let animationDuration: number;
</script>

<h2
  in:fly="{{
    delay: 2 * 100,
    duration: animationDuration,
    y: 100,
    easing: cubicOut,
  }}">
  Age: {data.age ?? "unknown"}
</h2>

<style>
  h2 {
    font-size: 1.2rem;
    color: #5c5c5c;
  }
</style>
