<script lang="ts">
  import { operationStore, query } from "@urql/svelte";
  import BookListItem from "../components/BookListItem.svelte";
  import { AllBooksDocument } from "../generated/graphql";
  import pageState from "../stores/pageState";

  let books = operationStore(AllBooksDocument, {
    limit: $pageState.AllBooks.limit,
    offset: $pageState.AllBooks.offset,
  });

  $: $books.variables.limit = $pageState.AllBooks.limit;
  $: $books.variables.offset = $pageState.AllBooks.offset;

  query(books);

  const nextPage = () => {
    $pageState.AllBooks.offset += $pageState.AllBooks.limit;
  };

  const prevPage = () => {
    $pageState.AllBooks.offset -= $pageState.AllBooks.limit;
  };

  $: currentPage = $pageState.AllBooks.offset / $pageState.AllBooks.limit + 1;
  $: lastPage = () => {
    try {
      const division = $books.data.countBooks / $books.variables.limit;
      return Math.floor(division + 1);
    } catch {
      return null;
    }
  };
</script>

<div>
  <label for="bookLimit">Show in page</label>
  <select name="limit" id="bookLimit" bind:value="{$pageState.AllBooks.limit}">
    <option value="{5}">5</option>
    <option value="{10}">10</option>
    <option value="{25}">25</option>
  </select>
  <button
    on:click="{prevPage}"
    disabled="{$books.fetching || $books.variables.offset === 0}">
    Previous
  </button>
  <button
    on:click="{nextPage}"
    disabled="{$books.fetching ||
      $books.data.books.length !== $pageState.AllBooks.limit}">
    Next
  </button>
  <p>
    Page {currentPage}
    {#if lastPage() !== null}
      of {lastPage()}
    {/if}
  </p>
</div>
<ul class="book-list">
  {#if $books.fetching}
    loading...
  {:else if $books.error}
    Error! {$books.error.message}
  {:else}
    {#key currentPage}
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
