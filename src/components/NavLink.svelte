<script>
  import { link } from "svelte-spa-router";
  export let href: string;
</script>

<li>
  <a href="{href}" use:link> <slot /> </a>
</li>

<style>
  li {
    display: inline-block;
    margin: 0.5rem;
    & > a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
