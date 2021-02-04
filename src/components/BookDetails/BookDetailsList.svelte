<script>
  import { cubicOut } from "svelte/easing";

  import { fly } from "svelte/transition";

  import type { BookDetailsQuery } from "../../generated/graphql";
  import AuthorDetails from "./AuthorDetails.svelte";

  export let data: BookDetailsQuery["book"];
  export let animationDuration: number;
  export let params: any;
</script>

<ul
  in:fly="{{
    delay: 3 * 100,
    duration: animationDuration,
    y: 100,
    easing: cubicOut,
  }}">
  <li>Added to library: {new Date(data.createdAt).toLocaleString()}</li>
  <li>Last update: {new Date(data.updatedAt).toLocaleString()}</li>
  <AuthorDetails
    data="{data}"
    params="{params}"
    animationDuration="{animationDuration}" />
</ul>

<style>
  ul {
    padding-left: 1rem;
    margin-top: 1.25rem;
  }
</style>
