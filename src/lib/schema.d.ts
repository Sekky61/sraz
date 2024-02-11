import type { S } from "vitest/dist/reporters-1evA5lom.js";

export type Availability = "yes" | "no" | "maybe";

// dates in the format "YYYY-MM-DD"
export type Event = {
	name: string;
	dateFrom: string;
	dateTo: string;
	note: string;
	availability: Availability;
};

export type Classmate = {
	name: string;
	events: Event[];
};

export type RootDates = {
	[name: string]: Classmate;
};
