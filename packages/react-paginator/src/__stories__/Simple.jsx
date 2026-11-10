import { useState } from "react";
import { Paginator } from "../index.js";

export function Simple() {
	const [page, setPage] = useState(1);

	return <Paginator page={page} pageCount={15} onPageChange={setPage} />;
}
