<script lang="ts">
  import { operationStore, query } from "@urql/svelte";
  import BookListItem from "../components/BookListItem.svelte";
  import { AllBooksDocument } from "../generated/graphql";

  let limit = 5;
  let offset = 0;

  let books = operationStore(AllBooksDocument, {
    limit,
    offset,
  });

  query(books);

  const nextPage = () => {
    $books.variables.offset += limit;
  };

  const prevPage = () => {
    $books.variables.offset -= limit;
  };

  function changeLimit() {
    $books.variables.offset = 0;
    $books.variables.limit = limit;
  }

  $: limit && changeLimit();
  $: currentPage = $books.variables.offset / $books.variables.limit + 1;
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
  <select name="limit" id="bookLimit" bind:value="{limit}">
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
    disabled="{$books.fetching || $books.data.books.length !== limit}">
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
