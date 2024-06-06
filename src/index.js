import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './Components/rootReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
   
  </React.StrictMode>
);


