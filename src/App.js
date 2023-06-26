import LoginPage from './pages/LoginPage';
import Search from "./pages/Search";
import Layout from "./pages/Layout";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

    return (
        //Ορίζουμε τα Routes για να μπορούμε να αλλάζουμε σελίδες
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="login" element={<LoginPage />}/>
                    <Route path="music_player" element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
