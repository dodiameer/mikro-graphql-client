<script lang="ts">
  import { operationStore, query } from "@urql/svelte";
  import { BookDetailsDocument } from "../generated/graphql";
  import type { BookDetailsQuery } from "../generated/graphql";
  import BookTitle from "../components/BookDetails/BookTitle.svelte";
  import BookAuthor from "../components/BookDetails/BookAuthor.svelte";
  import BookDetailsList from "../components/BookDetails/BookDetailsList.svelte";
  import BackButton from "../components/BackButton.svelte";

  const animationDuration = 500;

  export let params: any = {};

  const book = operationStore(BookDetailsDocument, { id: params.id });
  $: $book.variables.id = params.id;

  query(book);

  let data: BookDetailsQuery["book"];
  $: data = $book?.data?.book ?? null;
</script>

<BackButton />
{#if $book.fetching}
  loading...
{:else if $book.error}
  Error! {$book.error.message}
{:else}
  <article>
    <BookTitle data="{data}" animationDuration="{animationDuration}" />
    <BookAuthor data="{data}" animationDuration="{animationDuration}" />
    <BookDetailsList
      data="{data}"
      params="{params}"
      animationDuration="{animationDuration}" />
  </article>
{/if}
