import type { ReactElement } from "react";
import { useState } from "react";
import type { Components, PageLinkProps } from "..";
import { Paginator } from "..";

function PageLink({
	page,
	isCurrent,
	rootProps,
}: PageLinkProps<unknown>): ReactElement {
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
					onChange={(): void => {
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

export function CustomComponents(): ReactElement {
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
