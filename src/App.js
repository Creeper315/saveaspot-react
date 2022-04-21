import store from './Redux/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginMain from './Login/main';
import TopNav from './TopNav/topNav';
import MainPage from './MainPage/mainPage';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginMain />} />
                    <Route path="/main" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
