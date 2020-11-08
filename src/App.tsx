import React from 'react';
import { Provider } from 'react-redux'
import rootReducer from './app/reducers'
import { configureStore } from '@reduxjs/toolkit';
import Main from './components/main';

import './App.css';

const store = configureStore({
    reducer: rootReducer
})

const App: React.FC = () => (
    <Provider store={store}>
        <Main />
    </Provider>
) 


export default App;
