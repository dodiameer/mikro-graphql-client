<script>
  import { cubicOut } from "svelte/easing";

  import { fly } from "svelte/transition";

  import type { AllAuthorsQuery } from "../../generated/graphql";

  export let author: AllAuthorsQuery["authors"][0];
  export let index: number;
</script>

<li
  in:fly="{{
    delay: index * 100,
    duration: 300,
    y: 100,
    easing: cubicOut,
  }}">
  <a href="/author/{author.id}">
    {author.name}, {author.age ?? "unknown age"}
  </a>
</li>

<style>
  a {
    color: black;
  }
  li {
    list-style: none;
    font-size: 1.25rem;
    font-style: italic;
  }
</style>
