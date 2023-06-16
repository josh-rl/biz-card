import React from 'react';
import ReactDOM from 'react-dom/client';
// import reportWebVitals from './lib/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode >
);

// Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
