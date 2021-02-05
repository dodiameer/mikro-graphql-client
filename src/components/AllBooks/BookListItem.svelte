<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { link } from "svelte-spa-router";

  import type { AllBooksQuery } from "../../generated/graphql";

  export let book: AllBooksQuery["books"][0];
  export let index: number;
</script>

<li
  in:fly="{{
    delay: index * 100,
    duration: 300,
    y: 100,
    easing: cubicOut,
  }}">
  <a href="/book/{book.id}" use:link>
    <span class="title">{book.title}</span>
  </a>
  <span class="author"
    >By {book.author.name}, {book.author.age ?? "Unknown age"}</span>
</li>

<style>
  li {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 1.25rem;
    font-style: italic;
    color: black;
  }
  .author {
    font-size: 1rem;
    color: #5c5c5c;
  }
</style>
