import store from './Redux/store';
import MainPage from './MainPage/mainPage';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginMain from './Login/loginMain';
import NotFound from './MainPage/notFound404';

// export const heroku = 'https://fun-together.herokuapp.com/';
// export const heroku = 'http://localhost:3001/';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginMain />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
