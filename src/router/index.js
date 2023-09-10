import {Route, Routes} from "react-router-dom";
import Layout from "../pages/Layout";
import LoginPage from "../pages/LoginPage";
import Search from "../pages/Search";
import History from "../pages/History";
import UsersPlaylist from "../pages/UsersPlaylist";

function MyRouter() {

    // Function to navigate to the "history" page

    return(
        //Ορίζουμε τα Routes για να μπορούμε να αλλάζουμε σελίδες
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="login" element={<LoginPage />}/>
                <Route path="music_player" element={<Search />} />
            </Route>
            <Route path="history" element={<History />} />
            <Route path="saved_playlists" element={<UsersPlaylist />} />
        </Routes>
    )
}

export default MyRouter;