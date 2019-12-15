import {
  PAGES,
  BREAK,
} from './constants';

const getPages = ({
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

  let startPageInMainRange = Math.max(1, Math.ceil(page - (pageRangeDisplayed / 2)));
  let endPageInMainRange = startPageInMainRange + pageRangeDisplayed - 1;

  if (endPageInMainRange > pageCount) {
    endPageInMainRange = pageCount;
    startPageInMainRange = pageCount - pageRangeDisplayed + 1;
  }

  let hasBreakBefore;
  let hasBreakAfter;

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

  const result = [];

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
