<script lang="ts">
	import type { RootDates } from '$lib/schema';
	import { getNames } from '$lib/utils';
	import { Button, Select } from 'flowbite-svelte';
	import EventList from './EventList.svelte';

	// The dates param loaded from the db
	export let dates: RootDates;

	const people = getNames(dates).map((name) => ({ value: name, name }));

	let selected = people[0];
	const selectedName = selected.name;
	let selectedPerson = dates[selected.value];
</script>

<div class="rounded border p-4">
	<h2>Person</h2>
	{#if selectedPerson}
		<h3>{selectedPerson.name}</h3>
	{/if}
	<div class="flex gap-4">
		<div>
			<Select class="mt-2" items={people} bind:value={selected} />
			<Button class="mt-2" color="primary" href="/newdate">New Event</Button>
		</div>
		<EventList {dates} classmate={selectedName} />
	</div>
</div>
