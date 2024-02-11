<script lang="ts">
	import { getEventCountInRange } from '$lib/utils';

	export let dates;

	// for a range of days, create a {date, avaliable_count} object
	const from = '2024-03-01';
	const to = '2024-04-31';

	const counts = getEventCountInRange(from, to, dates);
</script>

<div class="flex">
	{#each counts as count}
		<div class="flex h-8 w-8 items-center justify-center border bg-red-500">{count}</div>
	{/each}
</div>
