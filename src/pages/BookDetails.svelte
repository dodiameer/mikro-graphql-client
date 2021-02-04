<script lang="ts">
  /* GraphQL imports */
  import { operationStore, query } from "@urql/svelte";
  import { BookDetailsDocument } from "../generated/graphql";
  import type { BookDetailsQuery } from "../generated/graphql";

  /* Component imports */
  import BookTitle from "../components/BookDetails/BookTitle.svelte";
  import BookAuthor from "../components/BookDetails/BookAuthor.svelte";
  import BookDetailsList from "../components/BookDetails/BookDetailsList.svelte";
  import BackButton from "../components/BackButton.svelte";

  /* Constants */
  const animationDuration = 500;

  /**
   * Params prop filled by router
   * Currently only takes in a book id
   */
  export let params: any = {};

  /* GraphQL store and query */
  const book = operationStore(BookDetailsDocument, { id: params.id });

  /**
   * The router uses the same component instance if possible,
   * changing only the parameters in the params object
   *
   * We have to add a reactive statement to re-assign the variable in
   * the GraphQL query when params.id changes so it loads the new book
   */
  $: $book.variables.id = params.id;

  query(book);

  /* Book data put into a data variable for easy access */
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
