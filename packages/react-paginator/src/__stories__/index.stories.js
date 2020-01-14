import { storiesOf } from '@storybook/react';

import CustomComponents from './CustomComponents';
import CustomStyles from './CustomStyles';
import FewPages from './FewPages';
import Simple from './Simple';
import WithLinks from './WithLinks';

storiesOf('Examples', module)
  .add('Simple', Simple)
  .add('With links', WithLinks)
  .add('Few pages', FewPages)
  .add('Custom styles', CustomStyles)
  .add('Custom components', CustomComponents);
