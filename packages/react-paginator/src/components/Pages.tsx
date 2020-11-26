import styled from 'styled-components';

import getStyle from './getStyle';

import type {
  PagesComponent as PagesComponentType,
} from '../types';

export const PagesComponent = styled.div((props) => getStyle(
  'pages',

  {
    display: 'flex',
    alignItems: 'center',
  },

  props,
));

const Pages: PagesComponentType = ({
  rootProps,
  children,
}) => (
  <PagesComponent
    rootProps={rootProps}
  >
    {children}
  </PagesComponent>
);

export default Pages;
