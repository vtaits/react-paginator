import { useState } from "react";
import { Paginator } from "../index.js";

/**
 * @param {number} page
 */
const hrefBuilder = (page) => `/url/?page=${page}`;

export function WithLinks() {
	const [page, setPage] = useState(1);

	return (
		<Paginator
			page={page}
			pageCount={15}
			onPageChange={setPage}
			hrefBuilder={hrefBuilder}
		/>
	);
}
