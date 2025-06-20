import type { ReactElement } from "react";
import { useState } from "react";
import type { HrefBuilder } from "..";
import { Paginator } from "..";

const hrefBuilder: HrefBuilder = (page) => `/url/?page=${page}`;

export function WithLinks(): ReactElement {
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
