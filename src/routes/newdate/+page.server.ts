import { loadDates } from "$lib/server/loadDates.js";
import type { Availability } from "$lib/schema";
import { appendEvent as validateAppendEvent } from "$lib/server/loadDates.js";

export type NewDateFormData = {
	name: string;
	dateFrom: Date;
	dateTo: Date;
	note: string;
	availability: Availability;
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// Append the new event to the classmate's events array
		await validateAppendEvent(data);
	},
};

export async function load({ params }) {
	return {
		dates: await loadDates(),
	};
}
