import { useState } from "react";
import { Paginator } from "../index.js";

/**
 * @import { Styles } from "../index.js"
 */

/** @type {Styles<unknown>} */
const styles = {
	container: () => ({
		backgroundColor: "#EEE",
		padding: "10px",
	}),

	pageLink: () => ({
		borderWidth: 0,
		marginLeft: 0,
	}),
};

export function CustomStyles() {
	const [page, setPage] = useState(1);

	return (
		<Paginator
			page={page}
			pageCount={15}
			onPageChange={setPage}
			styles={styles}
		/>
	);
}
