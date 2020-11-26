import styled from 'styled-components';

import getStyle from './getStyle';

import type {
  BreakComponent as BreakComponentType,
} from '../types';

export const BreakComponent = styled.div((props) => getStyle(
  'break',

  {
    color: '#999',
    padding: '7px 14px',
  },

  props,
));

const Break: BreakComponentType = ({
  rootProps,
  children,
}) => (
  <BreakComponent
    rootProps={rootProps}
  >
    {children}
  </BreakComponent>
);

export default Break;
