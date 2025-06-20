import type { ReactElement } from "react";

import styled from "styled-components";
import type { ContainerComponentProps, StylingContainerProps } from "../types";
import { getStyle } from "./getStyle";

export const InnerContainer = styled.div<StylingContainerProps<any>>((props) =>
	getStyle(
		"container",

		{
			display: "inline-flex",
		},

		props,
	),
);

export function Container<Payload>({
	rootProps,
	children,
}: ContainerComponentProps<Payload>): ReactElement {
	return <InnerContainer $rootProps={rootProps}>{children}</InnerContainer>;
}
