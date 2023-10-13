import type { ReactElement } from "react";

import styled from "styled-components";

import { getStyle } from "./getStyle";

import type { PagesProps, StylingPagesComponentProps } from "../types";

export const PagesComponent = styled.div<StylingPagesComponentProps<any>>(
	(props) =>
		getStyle(
			"pages",

			{
				display: "flex",
				alignItems: "center",
			},

			props,
		),
);

export function Pages<Payload>({
	rootProps,
	children,
}: PagesProps<Payload>): ReactElement {
	return <PagesComponent $rootProps={rootProps}>{children}</PagesComponent>;
}
