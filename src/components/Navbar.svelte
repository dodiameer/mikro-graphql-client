<script>
  import NavLink from "./NavLink.svelte";
</script>

<nav>
  <ul>
    <NavLink href="/">Books</NavLink>
    <NavLink href="/authors">Authors</NavLink>
  </ul>
</nav>

<style>
  @import "../global.scss";
  nav {
    padding: 0.5rem;
    background: darken(orangered, 15%);
    color: white;
    & > ul {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      list-style: none;
    }
  }
</style>
