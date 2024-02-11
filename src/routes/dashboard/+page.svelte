<script lang="ts">
	import Timeline from './Timeline.svelte';
	import Person from './Person.svelte';

	export let data;

	console.log(data);
</script>

{#if data}
	<h1>Dashboard</h1>
	{#each Object.entries(data.dates) as [name, d]}
		<p>{name}: {d.events.length}</p>
	{/each}
{:else}
	<p>Loading...</p>
{/if}
<Person dates={data.dates} />
<Timeline dates={data.dates} />
