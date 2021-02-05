<script>
  import type { OperationStore } from "@urql/svelte";
  import type { AllAuthorsQuery } from "../../generated/graphql";

  import type { IPageState } from "../../stores/pageState";

  export let pageState: SvelteStore<IPageState>;
  export let authors: OperationStore<
    AllAuthorsQuery,
    {
      limit: number;
      offset: number;
    }
  >;

  /* Helper functions */
  const nextPage = () => {
    $pageState.AllAuthors.offset += $pageState.AllAuthors.limit;
  };

  const prevPage = () => {
    $pageState.AllAuthors.offset -= $pageState.AllAuthors.limit;
  };

  const resetOffset = () => {
    $pageState.AllAuthors.offset = 0;
  };

  /* UI reactive variables */
  $: currentPage = $authors.variables.offset / $authors.variables.limit + 1;
  // $: lastPage = () => {
  //   try {
  //     const division = $authors.data.countBooks / $authors.variables.limit;
  //     return Math.floor(division + 1);
  //   } catch {
  //     return null;
  //   }
  // };
</script>

<div class="container">
  <div>
    <label for="bookLimit"> Show in page: </label>
    <!-- svelte-ignore a11y-no-onchange -->
    <select
      name="limit"
      id="bookLimit"
      bind:value="{$pageState.AllBooks.limit}"
      on:change="{resetOffset}">
      <option value="{5}">5</option>
      <option value="{10}">10</option>
      <option value="{25}">25</option>
    </select>
  </div>
  <div>
    <button
      on:click="{prevPage}"
      disabled="{$authors.fetching || $authors.variables.offset === 0}">
      Previous
    </button>
    <button
      on:click="{nextPage}"
      disabled="{$authors.fetching ||
        $authors.data.authors.length !== $pageState.AllAuthors.limit}">
      Next
    </button>
  </div>
</div>
<span>
  Page {currentPage}
  <!-- {#if lastPage() !== null}
    of {lastPage()}
  {/if} -->
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
  span {
    display: block;
  }
</style>
