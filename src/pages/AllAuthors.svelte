<script>
  import { operationStore, query } from "@urql/svelte";
  import { AllAuthorsDocument } from "../generated/graphql";
  import type { AllAuthorsQuery } from "../generated/graphql";
  import pageState from "../stores/pageState";

  const authors = operationStore(AllAuthorsDocument, {
    limit: $pageState.AllAuthors.limit,
    offset: $pageState.AllAuthors.offset,
  });
  $: $authors.variables.limit = $pageState.AllAuthors.limit;
  $: $authors.variables.offset = $pageState.AllAuthors.offset;

  query(authors);

  let data: AllAuthorsQuery["authors"];
  $: data = $authors?.data?.authors;
</script>

{#if $authors.fetching}
  loading...
{:else if $authors.error}
  Error! {$authors.error.message}
{:else}
  <pre>
  <code>
    {JSON.stringify(data, null, 2)}
  </code>
</pre>
{/if}
