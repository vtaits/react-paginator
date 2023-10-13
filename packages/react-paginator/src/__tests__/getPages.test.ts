import { expect, test } from "vitest";
import { getPages } from "../getPages";

import { BREAK, PAGES } from "../constants";

test("should render all pages if pageCount not bigger than pageRangeDisplayed", () => {
	expect(
		getPages({
			pageCount: 5,
			pageRangeDisplayed: 5,
			page: 123,
			marginPagesDisplayed: 345,
		}),
	).toEqual([
		{
			type: PAGES,
			start: 1,
			end: 5,
		},
	]);
});

test("should render all intervals", () => {
	expect(
		getPages({
			pageCount: 25,
			pageRangeDisplayed: 5,
			page: 17,
			marginPagesDisplayed: 3,
		}),
	).toEqual([
		{
			type: PAGES,
			start: 1,
			end: 3,
		},

		{
			type: BREAK,
			previous: 3,
			next: 15,
		},

		{
			type: PAGES,
			start: 15,
			end: 19,
		},

		{
			type: BREAK,
			previous: 19,
			next: 23,
		},

		{
			type: PAGES,
			start: 23,
			end: 25,
		},
	]);
});

test("should render intervals without first break", () => {
	expect(
		getPages({
			pageCount: 25,
			pageRangeDisplayed: 5,
			page: 7,
			marginPagesDisplayed: 3,
		}),
	).toEqual([
		{
			type: PAGES,
			start: 1,
			end: 9,
		},

		{
			type: BREAK,
			previous: 9,
			next: 23,
		},

		{
			type: PAGES,
			start: 23,
			end: 25,
		},
	]);
});

test("should render intervals without second break", () => {
	expect(
		getPages({
			pageCount: 25,
			pageRangeDisplayed: 5,
			page: 19,
			marginPagesDisplayed: 3,
		}),
	).toEqual([
		{
			type: PAGES,
			start: 1,
			end: 3,
		},

		{
			type: BREAK,
			previous: 3,
			next: 17,
		},

		{
			type: PAGES,
			start: 17,
			end: 25,
		},
	]);
});
