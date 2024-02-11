<script lang="ts">
	import type { RootDates } from '$lib/schema';
	import { getNames } from '$lib/utils';
	import { Button, Select } from 'flowbite-svelte';

	// The dates param loaded from the db
	export let dates: RootDates;

	const people = getNames(dates).map((name) => ({ value: name, name }));

	let selected = people[0];
	let selectedDate = dates[selected.value];
</script>

<div class="rounded border p-4">
	<h2>Person</h2>
	<Select class="mt-2" items={people} bind:value={selected} />

	{#if selectedDate}
		<h3>{selectedDate.name}</h3>
		<Button class="mt-2" color="primary" href="/newdate">New Event</Button>
	{/if}
</div>
