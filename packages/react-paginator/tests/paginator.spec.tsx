import { useState } from "react";
import { expect, test } from "vitest";
import { type RenderResult, render } from "vitest-browser-react";
import { Paginator, type PaginatorProps } from "../src";

function TestPaginator({
	page: initialPage,
	...rest
}: Omit<PaginatorProps<unknown>, "onPageChange">) {
	const [page, setPage] = useState(initialPage);

	return <Paginator page={page} onPageChange={setPage} {...rest} />;
}

function getPrevButton(screen: RenderResult) {
	return screen.getByText("prev");
}

function getNextButton(screen: RenderResult) {
	return screen.getByText("next");
}

test("example test", async () => {
	const screen = render(<TestPaginator page={1} pageCount={5} />);

	await expect.element(getPrevButton(screen)).toBeDisabled();
	await expect.element(getNextButton(screen)).toBeEnabled();

	await screen.getByText("5").click();

	await expect.element(getPrevButton(screen)).toBeEnabled();
	await expect.element(getNextButton(screen)).toBeDisabled();
});
