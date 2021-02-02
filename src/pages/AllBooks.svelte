<script lang="ts">
  import { gql, operationStore, query } from "@urql/svelte";
  import type { Query, QueryBooksArgs } from "../generated/graphql";
  const limit = 10;
  const offset = 0;

  import { fly } from "svelte/transition";

  const books = operationStore<{ books: Query["books"] }, QueryBooksArgs>(
    gql`
      query allBooks($limit: Int, $offset: Int) {
        books(limit: $limit, offset: $offset) {
          id
          title
          createdAt
          updatedAt
          author {
            id
            name
            age
          }
        }
      }
    `,
    { limit, offset }
  );

  query(books);

  const nextPage = () => {
    $books.variables.offset += limit;
  };

  const prevPage = () => {
    $books.variables.offset -= limit;
  };

  $: currentPage = $books.variables.offset / $books.variables.limit + 1;
</script>

{#if $books.fetching}
  loading...
{:else if $books.error}
  Error! {$books.error.message}
{:else}
  {#key $books.data.books}
    {#each $books.data.books as book, index}
      <p in:fly="{{ delay: index * 100, duration: 150, y: 20 }}">
        {book.id} - {book.title} (Author: {book.author.id} - {book.author.name}, {book
          .author.age ?? "Unknown age"}) <br />
        Created: {new Date(book.createdAt).toLocaleString()}.
        <br />
        Updated: {new Date(book.updatedAt).toLocaleString()}
      </p>
    {:else}
      No books found
    {/each}
  {/key}
{/if}
<div>
  <button
    on:click="{prevPage}"
    disabled="{$books.fetching || $books.variables.offset === 0}">
    Previous
  </button>
  <button
    on:click="{nextPage}"
    disabled="{$books.fetching || $books.data.books.length !== limit}">
    Next
  </button>
  <p>Page {currentPage}</p>
</div>
