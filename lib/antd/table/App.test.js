import * as ReactDOM from 'react-dom';
import { content } from './App';
it('renders without crashing', function () {
    var div = document.createElement('div');
    ReactDOM.render(content, div);
    ReactDOM.unmountComponentAtNode(div);
});
//# sourceMappingURL=App.test.js.map