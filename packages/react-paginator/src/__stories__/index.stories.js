import { storiesOf } from '@storybook/react';

import Simple from './Simple';
import WithLinks from './WithLinks';

storiesOf('Examples')
  .add('Simple', Simple)
  .add('WithLinks', WithLinks);
