import { KV_REST_API_TOKEN, KV_REST_API_URL } from "$env/static/private";
import { createClient } from "@vercel/kv";
import type { Availability, RootDates } from "$lib/schema";
import type { NewDateFormData } from "../../routes/newdate/+page.server";
import { isAvailability } from "$lib/utils";

// The key to the KV store for the root dates object
const ROOT_DATES_KEY = "sraz_root" as const;

function createDefaultObject(): RootDates {
	return {};
}

export async function loadDates() {
	const kv = createClient({
		url: KV_REST_API_URL,
		token: KV_REST_API_TOKEN,
	});
	const data = await kv.get<RootDates>(ROOT_DATES_KEY);

	return data || createDefaultObject();
}

export async function saveDates(dates: RootDates) {
	const kv = createClient({
		url: KV_REST_API_URL,
		token: KV_REST_API_TOKEN,
	});
	await kv.set(ROOT_DATES_KEY, dates);
}

// Append a new event to the classmate's events array
export async function appendEvent(formData: FormData) {
	const name = formData.get("name");
	const dateFrom = formData.get("dateFrom");
	const dateTo = formData.get("dateTo");
	const note = formData.get("note");
	const availability = formData.get("availability");

	// Validate
	if (!name || !dateFrom || !dateTo || !note || !availability) {
		console.dir({ name, dateFrom, dateTo, note, availability });
		throw new Error("Invalid form data");
	}

	if (
		typeof name !== "string" ||
		typeof dateFrom !== "string" ||
		typeof dateTo !== "string" ||
		typeof note !== "string" ||
		typeof availability !== "string"
	) {
		throw new Error("Invalid form data");
	}

	if (!isAvailability(availability)) {
		throw new Error("Invalid availability");
	}

	const event = { dateFrom, dateTo, note, availability };

	const dates = await loadDates();
	const classmate = dates[name];
	if (classmate) {
		classmate.events.push(event);
	} else {
		dates[name] = { name, events: [event] };
	}

	await saveDates(dates);
}
