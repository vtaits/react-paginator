import { type ReactElement, useState } from "react";
import { describe, expect, test } from "vitest";
import { type RenderResult, render } from "vitest-browser-react";
import {
	type Components,
	type NextLinkProps,
	type PageLinkProps,
	Paginator,
	type PaginatorProps,
	type PreviousLinkProps,
} from "../src";

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

function getPageLink(screen: RenderResult, index: number) {
	return screen.getByRole("button", {
		name: `${index}`,
		exact: true,
	});
}

describe("render pages", () => {
	test("render 1 page", async () => {
		const screen = render(<TestPaginator page={1} pageCount={1} />);

		expect(getPageLink(screen, 2).query()).not.toBeInTheDocument();

		await expect.element(getPageLink(screen, 1)).toBeDisabled();

		await expect.element(getPrevButton(screen)).toBeDisabled();
		await expect.element(getNextButton(screen)).toBeDisabled();
	});

	test("render 5 pages", async () => {
		const screen = render(<TestPaginator page={1} pageCount={5} />);

		for (let i = 1; i <= 5; ++i) {
			expect(getPageLink(screen, i).query()).toBeInTheDocument();
		}

		expect(getPageLink(screen, 6).query()).not.toBeInTheDocument();

		await expect.element(getPageLink(screen, 1)).toBeDisabled();

		await expect.element(getPrevButton(screen)).toBeDisabled();
		await expect.element(getNextButton(screen)).toBeEnabled();

		await getPageLink(screen, 3).click();

		await expect.element(getPageLink(screen, 1)).toBeEnabled();
		await expect.element(getPageLink(screen, 3)).toBeDisabled();

		await expect.element(getPrevButton(screen)).toBeEnabled();
		await expect.element(getNextButton(screen)).toBeEnabled();

		await getPageLink(screen, 5).click();

		await expect.element(getPageLink(screen, 3)).toBeEnabled();
		await expect.element(getPageLink(screen, 5)).toBeDisabled();

		await expect.element(getPrevButton(screen)).toBeEnabled();
		await expect.element(getNextButton(screen)).toBeDisabled();
	});

	test("render 15 pages", async () => {
		const screen = render(<TestPaginator page={1} pageCount={15} />);

		expect(getPageLink(screen, 6).query()).not.toBeInTheDocument();
		expect(getPageLink(screen, 13).query()).not.toBeInTheDocument();
		await expect.element(getPageLink(screen, 14)).toBeInTheDocument();

		await getPageLink(screen, 5).click();
		await getPageLink(screen, 7).click();

		await expect.element(getPageLink(screen, 1)).toBeInTheDocument();
		await expect.element(getPageLink(screen, 2)).toBeInTheDocument();

		expect(getPageLink(screen, 3).query()).not.toBeInTheDocument();
		expect(getPageLink(screen, 4).query()).not.toBeInTheDocument();

		await expect.element(getPageLink(screen, 5)).toBeInTheDocument();
		await expect.element(getPageLink(screen, 6)).toBeInTheDocument();
		await expect.element(getPageLink(screen, 7)).toBeInTheDocument();
		await expect.element(getPageLink(screen, 8)).toBeInTheDocument();
		await expect.element(getPageLink(screen, 9)).toBeInTheDocument();

		for (let i = 10; i <= 13; ++i) {
			expect(getPageLink(screen, i).query()).not.toBeInTheDocument();
		}

		await expect.element(getPageLink(screen, 14)).toBeInTheDocument();
		await expect.element(getPageLink(screen, 15)).toBeInTheDocument();

		await getPageLink(screen, 15).click();

		await expect.element(getNextButton(screen)).toBeDisabled();

		await expect.element(getPageLink(screen, 1)).toBeInTheDocument();
		await expect.element(getPageLink(screen, 2)).toBeInTheDocument();

		for (let i = 3; i <= 10; ++i) {
			expect(getPageLink(screen, i).query()).not.toBeInTheDocument();
		}

		for (let i = 11; i <= 15; ++i) {
			await expect.element(getPageLink(screen, i)).toBeInTheDocument();
		}
	});

	test("render custom 5 pages", async () => {
		function PageLink<Payload>({
			page,
			isCurrent,
			rootProps,
		}: PageLinkProps<Payload>): ReactElement {
			return (
				<label>
					<div>{page}</div>

					<div>
						<input
							data-testid={page}
							type="radio"
							value={page}
							onChange={() => {
								rootProps.onPageChange(page);
							}}
							checked={isCurrent}
						/>
					</div>
				</label>
			);
		}

		const components: Partial<Components<unknown>> = {
			PageLink,
		};

		function getCustomPageLink(screen: RenderResult, index: number) {
			return screen.getByTestId(`${index}`);
		}

		const screen = render(
			<TestPaginator page={1} pageCount={5} components={components} />,
		);

		for (let i = 1; i <= 5; ++i) {
			expect(getCustomPageLink(screen, i).query()).toBeInTheDocument();
		}

		expect(getCustomPageLink(screen, 6).query()).not.toBeInTheDocument();

		await expect.element(getCustomPageLink(screen, 1)).toBeChecked();

		await expect.element(getPrevButton(screen)).toBeDisabled();
		await expect.element(getNextButton(screen)).toBeEnabled();

		await getCustomPageLink(screen, 3).click();

		await expect.element(getCustomPageLink(screen, 1)).not.toBeChecked();
		await expect.element(getCustomPageLink(screen, 3)).toBeChecked();

		await expect.element(getPrevButton(screen)).toBeEnabled();
		await expect.element(getNextButton(screen)).toBeEnabled();

		await getCustomPageLink(screen, 5).click();

		await expect.element(getCustomPageLink(screen, 3)).not.toBeChecked();
		await expect.element(getCustomPageLink(screen, 5)).toBeChecked();

		await expect.element(getPrevButton(screen)).toBeEnabled();
		await expect.element(getNextButton(screen)).toBeDisabled();
	});
});

describe("arrows", () => {
	test("switch page using arrows", async () => {
		const screen = render(<TestPaginator page={1} pageCount={3} />);

		await expect.element(getPageLink(screen, 1)).toBeDisabled();
		await expect.element(getPageLink(screen, 2)).toBeEnabled();

		await getNextButton(screen).click();

		await expect.element(getPageLink(screen, 2)).toBeDisabled();
		await expect.element(getPageLink(screen, 3)).toBeEnabled();

		await getNextButton(screen).click();

		await expect.element(getPageLink(screen, 2)).toBeEnabled();
		await expect.element(getPageLink(screen, 3)).toBeDisabled();

		await getPrevButton(screen).click();

		await expect.element(getPageLink(screen, 2)).toBeDisabled();
		await expect.element(getPageLink(screen, 3)).toBeEnabled();

		await getPrevButton(screen).click();

		await expect.element(getPageLink(screen, 1)).toBeDisabled();
		await expect.element(getPageLink(screen, 2)).toBeEnabled();
	});

	test("switch page using custom arrows", async () => {
		function NextLink<Payload>({
			isDisabled,
			innerProps,
		}: NextLinkProps<Payload>): ReactElement {
			return (
				<button type="button" {...innerProps} disabled={isDisabled}>
					forward
				</button>
			);
		}

		function PreviousLink<Payload>({
			isDisabled,
			innerProps,
		}: PreviousLinkProps<Payload>): ReactElement {
			return (
				<button type="button" {...innerProps} disabled={isDisabled}>
					backward
				</button>
			);
		}

		const components: Partial<Components<unknown>> = {
			NextLink,
			PreviousLink,
		};

		function getCustomPrevButton(screen: RenderResult) {
			return screen.getByText("backward");
		}

		function getCustomNextButton(screen: RenderResult) {
			return screen.getByText("forward");
		}

		const screen = render(
			<TestPaginator components={components} page={1} pageCount={3} />,
		);

		await expect.element(getPageLink(screen, 1)).toBeDisabled();
		await expect.element(getPageLink(screen, 2)).toBeEnabled();

		await getCustomNextButton(screen).click();

		await expect.element(getPageLink(screen, 2)).toBeDisabled();
		await expect.element(getPageLink(screen, 3)).toBeEnabled();

		await getCustomNextButton(screen).click();

		await expect.element(getPageLink(screen, 2)).toBeEnabled();
		await expect.element(getPageLink(screen, 3)).toBeDisabled();

		await getCustomPrevButton(screen).click();

		await expect.element(getPageLink(screen, 2)).toBeDisabled();
		await expect.element(getPageLink(screen, 3)).toBeEnabled();

		await getCustomPrevButton(screen).click();

		await expect.element(getPageLink(screen, 1)).toBeDisabled();
		await expect.element(getPageLink(screen, 2)).toBeEnabled();
	});
});
