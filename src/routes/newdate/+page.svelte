<script lang="ts">
	import { getNames } from '$lib/utils.js';
	import { Button, Label, Radio, Select, Textarea } from 'flowbite-svelte';

	export let data;
	export let dates = data.dates;

	const people = getNames(dates).map((name) => ({ value: name, name }));
	let avail = 'no';
	let selected = people[0];
</script>

<form method="POST">
	<Label for="name">Select a Name:</Label>
	<Select id="name" name="name" class="mt-2" items={people} bind:value={selected} />
	<br /><br />

	<Label for="dateFrom">From:</Label>
	<input type="date" id="dateFrom" name="dateFrom" />

	<Label for="dateTo">To:</Label>
	<input type="date" id="dateTo" name="dateTo" />
	<br /><br />

	<Label for="note" class="mb-2">Optional Note:</Label>
	<Textarea id="note" name="note" placeholder="Your message" rows="4" />
	<br /><br />

	<Label for="availability">Availability:</Label>
	<Radio name="availability" bind:group={avail} value="yes">Yes</Radio>
	<Radio name="availability" bind:group={avail} value="no">No</Radio>
	<Radio name="availability" bind:group={avail} value="maybe">Maybe</Radio>
	<br /><br />

	<Button type="submit" value="Submit">Create Event</Button>
</form>
