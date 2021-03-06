import styled from 'styled-components';

import getStyle from './getStyle';

import type {
  PageLinkComponent as PageLinkComponentType,
} from '../types';

export const PageLinkComponent = styled.a((props) => {
  const {
    isCurrent,
  } = props;

  return getStyle(
    'pageLink',

    {
      boxSizing: 'border-box',
      borderWidth: 1,
      borderStyle: 'solid',
      fontFamily: 'Roboto,-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,sans-serif',
      fontSize: '14px',
      fontWeight: isCurrent ? 700 : 400,
      lineHeight: '18px',
      padding: 7,
      textDecoration: 'none',
      outline: 'none',
      minWidth: 36,
      textAlign: 'center',
      cursor: isCurrent ? 'default' : 'pointer',
      backgroundColor: isCurrent ? '#7ab4ff' : '#fff',
      borderColor: isCurrent ? '#7ab4ff' : '#ccc',
      color: isCurrent ? '#fff' : '#333',
      marginLeft: -1,
      position: isCurrent ? 'relative' : 'static',

      ':first-child': {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        marginLeft: 0,
      },

      ':last-child': {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      },
    },

    props,
  );
});

const PageLink: PageLinkComponentType = ({
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  Link,
  isCurrent,
  rootProps,
  innerProps,
  children,
}) => (
  <PageLinkComponent
    as={Link}
    {...innerProps}
    isCurrent={isCurrent}
    rootProps={rootProps}
  >
    {children}
  </PageLinkComponent>
);

export default PageLink;
