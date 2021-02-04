<script lang="ts">
  import { operationStore, query } from "@urql/svelte";
  import { pop as goBack } from "svelte-spa-router";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { link } from "svelte-spa-router";
  import { BookDetailsDocument } from "../generated/graphql";
  import type { BookDetailsQuery } from "../generated/graphql";

  const duration = 500;

  export let params: any = {};

  const book = operationStore(BookDetailsDocument, { id: params.id });
  $: $book.variables.id = params.id;

  query(book);

  let data: BookDetailsQuery["book"];
  $: data = $book?.data?.book ?? null;
</script>

<button on:click="{() => goBack()}" class="back-button"> Back </button>
{#if $book.fetching}
  loading...
{:else if $book.error}
  Error! {$book.error.message}
{:else}
  <article>
    <h1
      in:fly="{{
        delay: 1 * 100,
        duration,
        y: 100,
        easing: cubicOut,
      }}">
      {data.title}
    </h1>
    <h2
      in:fly="{{
        delay: 2 * 100,
        duration,
        y: 100,
        easing: cubicOut,
      }}">
      By {data.author.name}, {data.author.age ?? "unknown age"}
    </h2>
    <ul
      class="parent-list"
      in:fly="{{
        delay: 3 * 100,
        duration,
        y: 100,
        easing: cubicOut,
      }}">
      <li>Added to library: {new Date(data.createdAt).toLocaleString()}</li>
      <li>Last update: {new Date(data.updatedAt).toLocaleString()}</li>
      <li>Author details:</li>
      <ul
        in:fly="{{
          delay: 4 * 100,
          duration,
          y: 100,
          easing: cubicOut,
        }}">
        <li>
          Added to library: {new Date(data.author.createdAt).toLocaleString()}
        </li>
        <li>Last update: {new Date(data.author.updatedAt).toLocaleString()}</li>
        <li>Other books:</li>
        <ul
          in:fly="{{
            delay: 5 * 100,
            duration,
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
      </ul>
    </ul>
  </article>
{/if}

<style lang="scss">
  @import "../global.scss";
  button.back-button {
    margin-bottom: 1rem;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.2rem;
    color: #5c5c5c;
  }
  ul {
    padding-left: 1rem;
    &.parent-list {
      margin-top: 1.25rem;
    }
  }
</style>
