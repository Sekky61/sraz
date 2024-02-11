<script lang="ts">
	const dates = [
		{ date: '2024-07-01', avaliable: 27 },
		{ date: '2024-07-02', avaliable: 27 },
		{ date: '2024-07-03', avaliable: 28 }
	];
</script>

<div class="flex">
	{#each dates as date}
		<div class="flex h-8 w-8 items-center justify-center border bg-red-500">{date.avaliable}</div>
	{/each}
</div>
