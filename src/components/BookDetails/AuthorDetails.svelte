<script>
  import { cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  import type { BookDetailsQuery } from "../../generated/graphql";
  import AuthorOtherBooks from "./AuthorOtherBooks.svelte";

  export let data: BookDetailsQuery["book"];
  export let animationDuration: number;
  export let params: any;
</script>

<li>Author details:</li>
<ul
  in:fly="{{
    delay: 4 * 100,
    duration: animationDuration,
    y: 100,
    easing: cubicOut,
  }}">
  <li>
    Added to library: {new Date(data.author.createdAt).toLocaleString()}
  </li>
  <li>Last update: {new Date(data.author.updatedAt).toLocaleString()}</li>
  <AuthorOtherBooks
    data="{data}"
    params="{params}"
    animationDuration="{animationDuration}" />
</ul>

<style>
  ul {
    padding-left: 1rem;
  }
</style>
