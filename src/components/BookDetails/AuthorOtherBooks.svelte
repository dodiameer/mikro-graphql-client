<script>
  import { cubicOut } from "svelte/easing";

  import { fly } from "svelte/transition";
  import { link } from "svelte-spa-router";

  import type { BookDetailsQuery } from "../../generated/graphql";

  export let data: BookDetailsQuery["book"];
  export let animationDuration: number;
  export let params: any;
</script>

<li>Other books:</li>
<ul
  in:fly="{{
    delay: 5 * 100,
    duration: animationDuration,
    y: 100,
    easing: cubicOut,
  }}">
  {#each data.author.books.filter((b) => b.id !== params.id) as otherBook}
    <li>
      <a href="/book/{otherBook.id}" use:link>
        {otherBook.title}
      </a>
    </li>
  {:else}
    No other books
  {/each}
</ul>

<style>
  ul {
    padding-left: 1rem;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a::after {
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
</style>
