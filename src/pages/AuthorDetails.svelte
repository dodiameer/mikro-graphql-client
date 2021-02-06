<script>
  import { operationStore, query } from "@urql/svelte";
  import { AuthorDetailsDocument } from "../generated/graphql";
  import type { AuthorDetailsQuery } from "../generated/graphql";
  import AuthorName from "../components/AuthorDetails/AuthorName.svelte";
  import AuthorAge from "../components/AuthorDetails/AuthorAge.svelte";
  import AuthorDetailsList from "../components/AuthorDetails/AuthorDetailsList.svelte";
  import BackButton from "../components/BackButton.svelte";

  const animationDuration = 500;
  export let params: any = {};

  const author = operationStore(AuthorDetailsDocument, { id: params.id });
  $: author.variables.id = params.id;

  query(author);

  let data: AuthorDetailsQuery["author"];
  $: data = $author?.data?.author;
</script>

<BackButton />
{#if $author.fetching}
  loading...
{:else if $author.error}
  Error! {$author.error.message}
{:else}
  <article>
    <AuthorName data="{data}" animationDuration="{animationDuration}" />
    <AuthorAge data="{data}" animationDuration="{animationDuration}" />
    <AuthorDetailsList data="{data}" animationDuration="{animationDuration}" />
  </article>
{/if}
