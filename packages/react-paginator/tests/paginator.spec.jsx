// biome-ignore-start lint/correctness/noComponentHookFactories: testing custom components

import { useState } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Paginator } from "../src/index.js";

/**
 * @import { RenderResult } from "vitest-browser-react"
 * @import { Components, NextLinkProps, PageLinkProps, PaginatorProps, PreviousLinkProps } from "../src/index.js"
 */

/**
 * @param {Omit<PaginatorProps<unknown>, "onPageChange">} props
 */
function TestPaginator({ page: initialPage, ...rest }) {
	const [page, setPage] = useState(initialPage);

	return <Paginator page={page} onPageChange={setPage} {...rest} />;
}

/**
 * @param {RenderResult} screen
 */
function getPrevButton(screen) {
	return screen.getByText("prev");
}

/**
 * @param {RenderResult} screen
 */
function getNextButton(screen) {
	return screen.getByText("next");
}

/**
 * @param {RenderResult} screen
 * @param {number} index
 */
function getPageLink(screen, index) {
	return screen.getByRole("button", {
		name: `${index}`,
		exact: true,
	});
}

describe("render pages", () => {
	test("render 1 page", async () => {
		const screen = await render(<TestPaginator page={1} pageCount={1} />);

		expect(getPageLink(screen, 2).query()).not.toBeInTheDocument();

		await expect.element(getPageLink(screen, 1)).toBeDisabled();

		await expect.element(getPrevButton(screen)).toBeDisabled();
		await expect.element(getNextButton(screen)).toBeDisabled();
	});

	test("render 5 pages", async () => {
		const screen = await render(<TestPaginator page={1} pageCount={5} />);

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
		const screen = await render(<TestPaginator page={1} pageCount={15} />);

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
		/**
		 * @template Payload
		 * @param {PageLinkProps<Payload>} props
		 */
		function PageLink({ page, isCurrent, rootProps }) {
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

		/** @type {Partial<Components<unknown>>} */
		const components = {
			PageLink,
		};

		/**
		 * @param {RenderResult} screen
		 * @param {number} index
		 */
		function getCustomPageLink(screen, index) {
			return screen.getByTestId(`${index}`);
		}

		const screen = await render(
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
		const screen = await render(<TestPaginator page={1} pageCount={3} />);

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
		/**
		 * @template Payload
		 * @param {NextLinkProps<Payload>} props
		 */
		function NextLink({ isDisabled, innerProps }) {
			return (
				<button type="button" {...innerProps} disabled={isDisabled}>
					forward
				</button>
			);
		}

		/**
		 * @template Payload
		 * @param {PreviousLinkProps<Payload>} props
		 */
		function PreviousLink({ isDisabled, innerProps }) {
			return (
				<button type="button" {...innerProps} disabled={isDisabled}>
					backward
				</button>
			);
		}

		/** @type {Partial<Components<unknown>>} */
		const components = {
			NextLink,
			PreviousLink,
		};

		/**
		 * @param {RenderResult} screen
		 */
		function getCustomPrevButton(screen) {
			return screen.getByText("backward");
		}

		/**
		 * @param {RenderResult} screen
		 */
		function getCustomNextButton(screen) {
			return screen.getByText("forward");
		}

		const screen = await render(
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
// biome-ignore-end lint/correctness/noComponentHookFactories: testing custom components
