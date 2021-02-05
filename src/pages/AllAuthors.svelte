<script>
  import { operationStore, query } from "@urql/svelte";
  import { AllAuthorsDocument } from "../generated/graphql";
  import type { AllAuthorsQuery } from "../generated/graphql";
  import pageState from "../stores/pageState";
  import PaginationBar from "../components/AllAuthors/PaginationBar.svelte";
  import AuthorListItem from "../components/AllBooks/AuthorListItem.svelte";

  const authors = operationStore(AllAuthorsDocument, {
    limit: $pageState.AllAuthors.limit,
    offset: $pageState.AllAuthors.offset,
  });
  $: $authors.variables.limit = $pageState.AllAuthors.limit;
  $: $authors.variables.offset = $pageState.AllAuthors.offset;

  query(authors);
</script>

<PaginationBar authors="{authors}" pageState="{pageState}" />
<ul>
  {#if $authors.fetching}
    loading...
  {:else if $authors.error}
    Error! {$authors.error.message}
  {:else}
    {#key $pageState.AllAuthors.offset}
      {#each $authors.data.authors as author, index}
        <AuthorListItem author="{author}" index="{index}" />
      {/each}
    {/key}
  {/if}
</ul>

<style>
  ul {
    margin-top: 1.25rem;
  }
</style>
