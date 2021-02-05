<script>
  import type { OperationStore } from "@urql/svelte";
  import type { AllBooksQuery, Exact } from "../../generated/graphql";

  import type { IPageState } from "../../stores/pageState";

  export let pageState: SvelteStore<IPageState>;
  export let books: OperationStore<
    AllBooksQuery,
    Exact<{
      limit?: number;
      offset?: number;
    }>
  >;

  /* Helper functions */
  const nextPage = () => {
    $pageState.AllBooks.offset += $pageState.AllBooks.limit;
  };

  const prevPage = () => {
    $pageState.AllBooks.offset -= $pageState.AllBooks.limit;
  };

  /* UI reactive variables */
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

<div class="container">
  <div>
    <label for="bookLimit"> Show in page: </label>
    <select
      name="limit"
      id="bookLimit"
      bind:value="{$pageState.AllBooks.limit}">
      <option value="{5}">5</option>
      <option value="{10}">10</option>
      <option value="{25}">25</option>
    </select>
  </div>
  <div>
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
  </div>
</div>
<span>
  Page {currentPage}
  {#if lastPage() !== null}
    of {lastPage()}
  {/if}
</span>

<style lang="scss">
  @import "../../global.scss";
  div.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    & label[for="bookLimit"] {
      margin-right: 0.25rem;
    }
    & select#bookLimit {
      min-width: 2rem;
      text-align: center;
    }
  }
</style>
