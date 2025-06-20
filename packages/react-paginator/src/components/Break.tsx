import type { ReactElement } from "react";

import styled from "styled-components";
import type { BreakComponentProps, StylingBreakProps } from "../types";
import { getStyle } from "./getStyle";

export const InnerBreak = styled.div<StylingBreakProps<any>>((props) =>
	getStyle(
		"break",

		{
			color: "#999",
			padding: "7px 14px",
		},

		props,
	),
);

export function Break<Payload>({
	rootProps,
	children,
}: BreakComponentProps<Payload>): ReactElement {
	return <InnerBreak $rootProps={rootProps}>{children}</InnerBreak>;
}
