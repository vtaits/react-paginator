import type { ReactElement, ReactNode } from "react";
import { memo } from "react";

import { PageLinkWrapper } from "./PageLinkWrapper";

import type {
	HrefBuilder,
	LinkComponent,
	OnPageChange,
	PageLinkComponent,
	PageLinkGroupComponent,
	RootProps,
} from "./types";

export type PageLinkGroupWrapperProps<Payload> = {
	Link: LinkComponent<Payload>;
	PageLink: PageLinkComponent<Payload>;
	PageLinkGroup: PageLinkGroupComponent<Payload>;
	start: number;
	end: number;
	onPageChange: OnPageChange;
	hrefBuilder?: HrefBuilder;
	page: number;
	rootProps: RootProps<Payload>;
};

function PageLinkGroupWrapperInner<Payload>({
	Link,
	PageLink,
	PageLinkGroup,
	start,
	end,
	onPageChange,
	hrefBuilder = undefined,
	page,
	rootProps,
}: PageLinkGroupWrapperProps<Payload>): ReactElement {
	const renderedPages: ReactNode[] = [];
	for (let pageForLink = start; pageForLink <= end; ++pageForLink) {
		renderedPages.push(
			<PageLinkWrapper
				Link={Link}
				PageLink={PageLink}
				onPageChange={onPageChange}
				hrefBuilder={hrefBuilder}
				page={page}
				pageForLink={pageForLink}
				rootProps={rootProps}
				key={pageForLink}
			/>,
		);
	}

	return (
		<PageLinkGroup start={start} end={end} rootProps={rootProps}>
			{renderedPages}
		</PageLinkGroup>
	);
}

export const PageLinkGroupWrapper = memo(
	PageLinkGroupWrapperInner,
) as typeof PageLinkGroupWrapperInner;
