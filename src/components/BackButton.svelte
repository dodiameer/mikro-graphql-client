<script>
  import { pop as goBack } from "svelte-spa-router";
</script>

<button on:click="{() => goBack()}"> Back </button>

<style>
  @import "../global.scss";
  button {
    margin-bottom: 1rem;
  }
</style>
