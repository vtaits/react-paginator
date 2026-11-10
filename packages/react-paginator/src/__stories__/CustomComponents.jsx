import { useState } from "react";
import { Paginator } from "../index.js";

/**
 * @import { Components, PageLinkProps } from "../index.js"
 */

/**
 * @param {PageLinkProps<unknown>} props
 */
function PageLink({ page, isCurrent, rootProps }) {
	return (
		<label
			style={{
				textAlign: "center",
				padding: "0 4px",
			}}
		>
			<div>{page}</div>

			<div>
				<input
					type="radio"
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

export function CustomComponents() {
	const [page, setPage] = useState(1);

	return (
		<Paginator
			page={page}
			pageCount={15}
			onPageChange={setPage}
			components={components}
		/>
	);
}
