[![NPM](https://img.shields.io/npm/v/@vtaits/react-paginator.svg)](https://www.npmjs.com/package/@vtaits/react-paginator)
![dependencies status](https://img.shields.io/librariesio/release/npm/@vtaits/react-paginator)

# @vtaits/react-paginator

Simple customizable pagination component for react applications based on replacable components

## Sandbox examples

- [Simple](https://codesandbox.io/s/3cvut)
- [Few pages](https://codesandbox.io/s/rv12j)
- [Custom styles](https://codesandbox.io/s/g1358)
- [Custom components](https://codesandbox.io/s/58tvx)

## Installation

```
npm install @vtaits/react-paginator --save
```

or

```
yarn add @vtaits/react-paginator
```

or

```
bun add @vtaits/react-paginator
```

### Don't forget to import styles

```
import '@vtaits/react-paginator/styles.css';
```

## Usage

```typescript
import { useState } from 'react';

import { Paginator } from '@vtaits/react-paginator';
import '@vtaits/react-paginator/styles.css';

function Example() {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={15}
      onPageChange={setPage}
    />
  );
}
```

## Props

| Name                 | Type                         | Description                                                                                  | Default value |
| -------------------- | ---------------------------- | -------------------------------------------------------------------------------------------- | ------------- |
| page                 | `number`                     | **Required**. Current page number. Starts from 1.                                            |               |
| pageCount            | `number`                     | **Required**. The total number of pages.                                                     |               |
| onPageChange         | `(nextPage: number) => void` | Callback of current page change.                                                             |               |
| pageRangeDisplayed   | `number`                     | The range of pages displayed.                                                                | 5             |
| marginPagesDisplayed | `number`                     | The number of pages to display for margins.                                                  | 2             |
| previousLabel        | react node                   | Label for the previous button.                                                               | `'prev'`      |
| nextLabel            | react node                   | Label for the next button.                                                                   | `'next'`      |
| breakLabel           | react node                   | Label for break between buttons.                                                             | `'...'`       |
| hrefBuilder          | `(page: number) => string`   | The method is called to generate the `href` attribute value on tag `a` of each page element. | `undefined`   |
| components           | `Object`                     | Custom components                                                                            | `undefined`   |
| styles               | `Object`                     | Custom styles                                                                                | `{}`          |
| payload              | generic                      | Additional prop for custom components and styles                                             | `undefined`   |

## Styling

### With custom styles

Redefining like in [react-select](https://react-select.com/styles).

```typescript
import { useState } from 'react';

import { Paginator } from '@vtaits/react-paginator';
import '@vtaits/react-paginator/styles.css';

const styles = {
  container: (_props) => ({
    backgroundColor: '#EEE',
    padding: 10,
  }),

  pageLink: (_props) => ({
    borderWidth: 0,
    marginLeft: 0,
  }),
};

function Example() {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={15}
      onPageChange={setPage}
      styles={styles}
    />
  );
}
```

#### Style keys

- `break`
- `container`
- `nextLink`
- `pageLink`
- `pageLinkGroup`
- `pages`
- `previousLink`

### With custom components

Redefining like in [react-select](https://react-select.com/components).

```typescript
import { useState } from 'react';

import { Paginator } from '@vtaits/react-paginator';
import '@vtaits/react-paginator/styles.css';

function PageLink({
  page,
  isCurrent,
  rootProps,
}) {
  return (
    <label
      style={{
        textAlign: 'center',
        padding: '0 4px',
      }}
    >
      <div>
        {page}
      </div>

      <div>
        <input
          type="radio"
          onChange={() => {
            rootProps.onPageChange(page);
          }}
          checked={isCurrent}
        />
      </div>
    </label>
  );
}

const components = {
  PageLink,
};

function Example() {
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
```

#### Components keys

- `Break`
- `Container`
- `Link`
- `NextLink`
- `PageLink`
- `PageLinkGroup`
- `Pages`
- `PreviousLink`
