import { storiesOf } from '@storybook/react';

import FewPages from './FewPages';
import Simple from './Simple';
import WithLinks from './WithLinks';

storiesOf('Examples')
  .add('Simple', Simple)
  .add('With links', WithLinks)
  .add('Few pages', FewPages);
