import type { Availability, RootDates } from "$lib/schema";
import { differenceInCalendarDays, isBefore } from "date-fns";
import { A } from "flowbite-svelte";

export function isAvailability(value: string): value is Availability {
	return value === "yes" || value === "no" || value === "maybe";
}

export function getNames(dates: RootDates) {
	return Object.keys(dates);
}

export function getAllEvents(dates: RootDates) {
	return Object.values(dates).flatMap((classmate) => classmate.events);
}

function dat(date: string) {
	return new Date(date);
}

export function dateInRange(
	date: string,
	dateFrom: string,
	dateTo: string,
): boolean {
	return isBefore(dat(date), dat(dateTo)) && isBefore(dat(dateFrom), dat(date));
}

// Return all events happening during the given date
// events are in the format "YYYY-MM-DD"
export function getEventsAt(date: string, dates: RootDates) {
	return getAllEvents(dates).filter((event) =>
		dateInRange(date, event.dateFrom, event.dateTo),
	);
}

// For a range of dates, return the number of events happening on each date
// events are in the format "YYYY-MM-DD"
export function getEventCountInRange(
	dateFrom: string,
	dateTo: string,
	dates: RootDates,
) {
	const days = differenceInCalendarDays(dat(dateTo), dat(dateFrom)) + 1;
	const eventCount = new Array(days).fill(0);

	for (const event of getAllEvents(dates)) {
		if (dateInRange(dateFrom, event.dateFrom, event.dateTo)) {
			console.log("event in range", event);
			const start = differenceInCalendarDays(
				dat(event.dateFrom),
				dat(dateFrom),
			);
			const end = differenceInCalendarDays(dat(event.dateTo), dat(dateFrom));
			console.log("start", start, "end", end);
			for (let i = start; i <= end; i++) {
				eventCount[i]++;
			}
		}
	}

	return eventCount;
}
