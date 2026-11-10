import { useState } from "react";
import { Paginator } from "../index.js";

export function FewPages() {
	const [page, setPage] = useState(1);

	return <Paginator page={page} pageCount={5} onPageChange={setPage} />;
}
