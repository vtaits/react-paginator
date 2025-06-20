import type { ReactElement, SyntheticEvent } from "react";
import { memo } from "react";

import type {
	HrefBuilder,
	LinkComponent,
	LinkInnerProps,
	OnPageChange,
	PageLinkComponent,
	RootProps,
} from "./types";

export type PageLinkWrapperProps<Payload> = {
	Link: LinkComponent<Payload>;
	PageLink: PageLinkComponent<Payload>;
	onPageChange: OnPageChange;
	hrefBuilder?: HrefBuilder;
	page: number;
	pageForLink: number;
	rootProps: RootProps<Payload>;
};

function PageLinkWrapperInner<Payload>({
	Link,
	PageLink,
	onPageChange,
	hrefBuilder = undefined,
	page,
	pageForLink,
	rootProps,
}: PageLinkWrapperProps<Payload>): ReactElement {
	const isCurrent = page === pageForLink;

	const onClick = (event: SyntheticEvent): void => {
		event.preventDefault();
		onPageChange(pageForLink);
	};

	const innerProps: LinkInnerProps = {};

	if (isCurrent) {
		innerProps.disabled = true;
	} else {
		innerProps.onClick = onClick;

		if (hrefBuilder) {
			innerProps.href = hrefBuilder(pageForLink);
		}
	}

	return (
		<PageLink
			Link={Link}
			isCurrent={isCurrent}
			innerProps={innerProps}
			rootProps={rootProps}
			page={pageForLink}
		>
			{pageForLink}
		</PageLink>
	);
}

export const PageLinkWrapper = memo(
	PageLinkWrapperInner,
) as typeof PageLinkWrapperInner;
