import type { ReactElement, ReactNode, SyntheticEvent } from "react";
import { memo } from "react";

import type {
	HrefBuilder,
	LinkComponent,
	LinkInnerProps,
	OnPageChange,
	PreviousLinkComponent,
	RootProps,
} from "./types";

export type PreviousLinkWrapperProps<Payload> = {
	Link: LinkComponent<Payload>;
	PreviousLink: PreviousLinkComponent<Payload>;
	onPageChange: OnPageChange;
	hrefBuilder?: HrefBuilder;
	previousLabel: ReactNode;
	page: number;
	rootProps: RootProps<Payload>;
};

function PreviousLinkWrapperInner<Payload>({
	Link,
	PreviousLink,
	onPageChange,
	hrefBuilder = undefined,
	previousLabel,
	page,
	rootProps,
}: PreviousLinkWrapperProps<Payload>): ReactElement {
	const isDisabled: boolean = page === 1;

	const onClick = (event: SyntheticEvent): void => {
		event.preventDefault();
		onPageChange(page - 1);
	};

	const innerProps: LinkInnerProps = {};

	if (isDisabled) {
		innerProps.disabled = true;
	} else {
		innerProps.onClick = onClick;

		if (hrefBuilder) {
			innerProps.href = hrefBuilder(page - 1);
		}
	}

	return (
		<PreviousLink
			Link={Link}
			isDisabled={isDisabled}
			innerProps={innerProps}
			rootProps={rootProps}
		>
			{previousLabel}
		</PreviousLink>
	);
}

export const PreviousLinkWrapper = memo(
	PreviousLinkWrapperInner,
) as typeof PreviousLinkWrapperInner;
