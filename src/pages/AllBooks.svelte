<script lang="ts">
  /* Imports */
  import { operationStore, query } from "@urql/svelte";
  import PaginationBar from "../components/AllBooks/PaginationBar.svelte";
  import BookListItem from "../components/BookListItem.svelte";
  import { AllBooksDocument } from "../generated/graphql";
  import pageState from "../stores/pageState";

  /* GraphQL Query */
  let books = operationStore(AllBooksDocument, {
    limit: $pageState.AllBooks.limit,
    offset: $pageState.AllBooks.offset,
  });

  $: $books.variables.limit = $pageState.AllBooks.limit;
  $: $books.variables.offset = $pageState.AllBooks.offset;

  query(books);
</script>

<PaginationBar books="{books}" pageState="{pageState}" />
<ul class="book-list">
  {#if $books.fetching}
    loading...
  {:else if $books.error}
    Error! {$books.error.message}
  {:else}
    {#key $pageState.AllBooks.offset}
      {#each $books.data.books as book, index}
        <BookListItem book="{book}" index="{index}" />
      {:else}
        No books found
      {/each}
    {/key}
  {/if}
</ul>

<style>
  .book-list {
    padding: 1rem;
  }
</style>
