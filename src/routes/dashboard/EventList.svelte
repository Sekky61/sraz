<script lang="ts">
	import type { RootDates } from '$lib/schema';

	export let dates: RootDates;
	export let classmate: string;

	const events = dates[classmate].events;
</script>

<div class="rounded border p-4">
	<h2>Events</h2>
	{#if events}
		{#each events as event}
			<p>{event.name}, {event.dateFrom}</p>
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</div>
