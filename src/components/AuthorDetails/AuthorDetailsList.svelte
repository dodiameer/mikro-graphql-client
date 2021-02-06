<script>
  import { cubicOut } from "svelte/easing";

  import { fly } from "svelte/transition";

  import type { AuthorDetailsQuery } from "../../generated/graphql";
  import AuthorBooks from "./AuthorBooks.svelte";

  export let data: AuthorDetailsQuery["author"];
  export let animationDuration: number;
</script>

<ul
  in:fly="{{
    delay: 3 * 100,
    duration: animationDuration,
    y: 100,
    easing: cubicOut,
  }}">
  <li>
    Added to library: {new Date(data.createdAt).toLocaleString()}
  </li>
  <li>
    Last update: {new Date(data.updatedAt).toLocaleString()}
  </li>
  <AuthorBooks data="{data}" animationDuration="{animationDuration}" />
</ul>

<style>
  ul {
    --padding: 1rem;
    padding-left: var(--padding);
    margin-top: 1.25rem;
  }
</style>
