<script lang="ts">
  import { gql, operationStore, query } from "@urql/svelte";
  const limit = 10;
  let offset = 0;

  const books = operationStore<any, any>(
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

  $: $books.variables.limit = limit;
  $: $books.variables.offset = offset;
</script>

{#if $books.fetching}
  loading...
{:else if $books.error}
  Error! {$books.error.message}
{:else}
  {#if offset !== 0}
    <button on:click="{() => (offset -= limit)}">Previous</button>
  {/if}
  {#if $books.data.books.length === limit}
    <button>Next</button>
  {/if}
  {#each $books.data.books as book}
    <p>
      {book.id} - {book.title} (Author: {book.author.id} - {book.author.name}, {book
        .author.age ?? "Unknown age"}) <br />
      Created: {new Date(book.createdAt).toLocaleString()}.
      <br />
      Updated: {new Date(book.updatedAt).toLocaleString()}
    </p>
  {:else}
    No books found
  {/each}
{/if}
