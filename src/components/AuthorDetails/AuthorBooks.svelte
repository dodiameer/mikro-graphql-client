<script>
  import { cubicOut } from "svelte/easing";

  import { fly } from "svelte/transition";
  import { link } from "svelte-spa-router";

  import type { AuthorDetailsQuery } from "../../generated/graphql";

  export let data: AuthorDetailsQuery["author"];
  export let animationDuration: number;
</script>

<li>Books:</li>
<ul
  in:fly="{{
    delay: 4 * 100,
    duration: animationDuration,
    y: 100,
    easing: cubicOut,
  }}">
  {#each data.books as book}
    <li>
      <a href="/book/{book.id}" use:link>
        {book.title}
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    padding-left: var(--padding);
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
