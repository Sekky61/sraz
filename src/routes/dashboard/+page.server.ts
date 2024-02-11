import { loadDates } from "$lib/server/loadDates.js";

export async function load({ params }) {
	return {
		dates: await loadDates(),
	};
}
