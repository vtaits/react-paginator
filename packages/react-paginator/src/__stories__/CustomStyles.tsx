import type { ReactElement } from "react";
import { useState } from "react";
import type { Styles } from "..";
import { Paginator } from "..";

const styles: Styles<unknown> = {
	container: (baseStyle) => ({
		...baseStyle,
		backgroundColor: "#EEE",
		padding: "10px",
	}),

	pageLink: (baseStyle) => ({
		...baseStyle,
		borderWidth: 0,
		marginLeft: 0,
	}),
};

export function CustomStyles(): ReactElement {
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
