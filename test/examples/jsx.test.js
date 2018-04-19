import * as React        from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter           from 'enzyme-adapter-react-16';

import jsx               from '../../src/examples/jsx';


Enzyme.configure({ adapter: new Adapter() });


test('You know nothing, Jon Snow', () => {
  expect(shallow(jsx({ name: 'Jon Snow' })).html()).toEqual('<div>You know nothing, Jon Snow</div>');
});
