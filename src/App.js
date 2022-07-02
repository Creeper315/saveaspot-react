import store from './Redux/store';
import MainPage from './MainPage/mainPage';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Login/welcome';
import LoginMain from './Login/loginMain';
import { useEffect } from 'react';

// export const heroku = 'https://fun-together.herokuapp.com/';
// export const heroku = 'http://localhost:3001/';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<LoginMain />} />
                    <Route path="/main" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
