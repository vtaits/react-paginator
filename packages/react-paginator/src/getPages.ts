import {
  PAGES,
  BREAK,
} from './constants';

import {
  GetPages,
  PagesBlock,
} from './types';

const getPages: GetPages = ({
  pageCount,
  pageRangeDisplayed,
  marginPagesDisplayed,
  page,
}) => {
  if (pageCount <= pageRangeDisplayed) {
    return [
      {
        type: PAGES,
        start: 1,
        end: pageCount,
      },
    ];
  }

  let startPageInMainRange: number = Math.max(1, Math.ceil(page - (pageRangeDisplayed / 2)));
  let endPageInMainRange: number = startPageInMainRange + pageRangeDisplayed - 1;

  if (endPageInMainRange > pageCount) {
    endPageInMainRange = pageCount;
    startPageInMainRange = pageCount - pageRangeDisplayed + 1;
  }

  let hasBreakBefore: boolean;
  let hasBreakAfter: boolean;

  if (startPageInMainRange <= marginPagesDisplayed + 2) {
    startPageInMainRange = 1;
    hasBreakBefore = false;
  } else {
    hasBreakBefore = true;
  }

  if (endPageInMainRange > pageCount - marginPagesDisplayed - 2) {
    endPageInMainRange = pageCount;
    hasBreakAfter = false;
  } else {
    hasBreakAfter = true;
  }

  const result: PagesBlock[] = [];

  if (hasBreakBefore) {
    result.push(
      {
        type: PAGES,
        start: 1,
        end: marginPagesDisplayed,
      },
    );

    result.push(
      {
        type: BREAK,
        previous: marginPagesDisplayed,
        next: startPageInMainRange,
      },
    );
  }

  result.push(
    {
      type: PAGES,
      start: startPageInMainRange,
      end: endPageInMainRange,
    },
  );

  if (hasBreakAfter) {
    result.push(
      {
        type: BREAK,
        previous: endPageInMainRange,
        next: pageCount - marginPagesDisplayed + 1,
      },
    );

    result.push(
      {
        type: PAGES,
        start: pageCount - marginPagesDisplayed + 1,
        end: pageCount,
      },
    );
  }

  return result;
};

export default getPages;
