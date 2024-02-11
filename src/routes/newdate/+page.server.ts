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
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const name = data.get("name");
		const dateFrom = data.get("dateFrom");
		const dateTo = data.get("dateTo");
		const note = data.get("note");
		const availability = data.get("availability");

		// Validate

		console.log("event", data);
		console.log("name", name);
		console.log("dateFrom", dateFrom);

		// Append the new event to the classmate's events array
		await validateAppendEvent(data);
	},
};

export async function load({ params }) {
	return {
		dates: await loadDates(),
	};
}
