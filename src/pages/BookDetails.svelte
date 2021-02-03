<script lang="ts">
  import { operationStore, query } from "@urql/svelte";
  import { pop as goBack } from "svelte-spa-router";

  import { BookDetailsDocument } from "../generated/graphql";
  import type { BookDetailsQuery, Scalars } from "../generated/graphql";
  export let params: any = {};
  let id: Scalars["ID"] = params.id;

  const book = operationStore(BookDetailsDocument, { id });

  query(book);

  let data: BookDetailsQuery["book"];
  $: data = $book?.data?.book ?? null;
</script>

<button on:click="{() => goBack()}"> Back </button>
{#if $book.fetching}
  loading...
{:else if $book.error}
  Error! {$book.error.message}
{:else}
  <article>
    <h1>{data.title}</h1>
    <h2>By {data.author.name}, {data.author.age ?? "unknown age"}</h2>
    <ul class="parent-list">
      <li>Added to library: {new Date(data.createdAt).toLocaleString()}</li>
      <li>Last update: {new Date(data.updatedAt).toLocaleString()}</li>
      <li>Author details:</li>
      <ul>
        <li>
          Added to library: {new Date(data.author.createdAt).toLocaleString()}
        </li>
        <li>Last update: {new Date(data.author.updatedAt).toLocaleString()}</li>
        <li>Other books:</li>
        <ul>
          {#each data.author.books.filter((b) => b.id !== id) as otherBook}
            <li>
              {otherBook.title}
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
      margin-top: 2rem;
    }
  }
</style>
