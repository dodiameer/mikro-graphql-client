<script>
  import { operationStore, query } from "@urql/svelte";
  import { AuthorDetailsDocument } from "../generated/graphql";
  import type { AuthorDetailsQuery } from "../generated/graphql";

  const animationDuration = 500;
  export let params: any = {};

  const author = operationStore(AuthorDetailsDocument, { id: params.id });
  $: author.variables.id = params.id;

  query(author);

  let data: AuthorDetailsQuery["author"];
  $: data = $author?.data?.author;
</script>

{#if $author.fetching}
  loading...
{:else if $author.error}
  Error! {$author.error.message}
{:else}
  <article>
    {data.id}
    {data.name}
  </article>
{/if}
