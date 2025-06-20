import type { ReactElement } from "react";

import styled from "styled-components";
import type {
	PageLinkGroupProps,
	StylingPageLinkGroupComponentProps,
} from "../types";
import { getStyle } from "./getStyle";

export const PageLinkGroupComponent = styled.div<
	StylingPageLinkGroupComponentProps<any>
>((props) =>
	getStyle(
		"pageLinkGroup",

		{
			display: "flex",
		},

		props,
	),
);

export function PageLinkGroup<Payload>({
	rootProps,
	children,
}: PageLinkGroupProps<Payload>): ReactElement {
	return (
		<PageLinkGroupComponent $rootProps={rootProps}>
			{children}
		</PageLinkGroupComponent>
	);
}
