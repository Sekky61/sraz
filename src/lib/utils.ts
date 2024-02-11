import type { Availability, RootDates } from "$lib/schema";

export function isAvailability(value: string): value is Availability {
	return value === "yes" || value === "no" || value === "maybe";
}

export function getNames(dates: RootDates) {
	return Object.keys(dates);
}
