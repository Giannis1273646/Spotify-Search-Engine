import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Layout = () => {
    // Για να έχουμε πρόσβαση στο token που λαμβάνουμε από το Spotify API
    const [token, setToken] = useState("")

    useEffect(() => {
        // Ελέγχουμε αν το token υπάρχει στον τοπικό αποθηκευτικό χώρο ή στο URL hash
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if(!token && hash){
            // Εξάγουμε το access token από το URL hash
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            // Καθαρίζουμε το URL hash και αποθηκεύουμε το token στο localStorage
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        // Ορίζουμε το access token
        setToken(token)

    }, [])//Για να εκτελείται μόνο στο πρώτο render

    const navigate = useNavigate();

    //Αν δεν έχουμε token πηγαίνουμε στη σελίδα σύνδεσης
    //Διαφορετικά πηγαίνουμε στην κύρια σελίδα
    //Εκτελείτε μόνο αν αλλάξουν οι λειτουργίες token ή navigate
    useEffect(() => {
        if (token) {
            navigate("/music_player");
        } else {
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <>
            <Outlet />
        </>
    );
}

export default Layout;