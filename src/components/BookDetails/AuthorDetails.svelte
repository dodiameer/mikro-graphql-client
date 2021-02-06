<script>
  import { link } from "svelte-spa-router";

  import { cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  import type { BookDetailsQuery } from "../../generated/graphql";

  export let data: BookDetailsQuery["book"];
  export let animationDuration: number;
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
  <li>
    <a href="/author/{data.author.id}" use:link> More details </a>
  </li>
</ul>

<style>
  ul {
    padding-left: 1rem;
  }
  a {
    color: inherit;

    &::after {
      content: url("/icons/external-link.svg");
      display: inline-block;
      margin: 0;
      padding: 0;
      margin-left: 0.25rem;
      fill: orangered;
      color: orangered;
      width: 20px;
      height: 20px;
    }
  }
</style>
