// Vendor
import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { store } from './redux/store';
import { Provider } from 'react-redux';
// Redux-persist
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// Custom
import './styles/global.css';
import App from './App';

let persistor = persistStore(store)

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

