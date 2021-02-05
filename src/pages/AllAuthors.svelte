<script>
  import pageState from "../stores/pageState";
</script>

<h1>All authors page</h1>
<select name="" id="" bind:value="{$pageState.AllAuthors.limit}">
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  <option value="25">25</option>
</select>
<button> Next </button>
<button> Previous </button>
<p>
  limit: {$pageState.AllAuthors.limit}
</p>
<p>
  offset: {$pageState.AllAuthors.offset}
</p>
