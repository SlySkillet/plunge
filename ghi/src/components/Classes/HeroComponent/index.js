import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import HeroComponent from './HeroComponent';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<StrictMode>
		<HeroComponent />
	</StrictMode>,
	rootElement
);
