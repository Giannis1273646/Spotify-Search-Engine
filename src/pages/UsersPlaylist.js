import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "./renders/renderStylesheets/RenderAlbums.module.css";
import playlistIcon from "./renders/icons/noPlaylistImageIcon.png";
import {renderPlaylistDetails} from "./renders/RenderAlbums";
import searchStyles from "./stylesheets/Search.module.css";
import userIcon from "./images/userNoImageIcon.png";

function UsersPlaylist(){

    const [playlists, setPlaylists] = useState([])
    const [userProfile, setUserProfile] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        // Ανακτούμε το JSON string από το local storage
        const storedUserProfileJSON = window.localStorage.getItem('userProfile');

        // Μετατρέπουμε το JSON string σε μορφή πίνακα και το αποθηκεύουμε στο UserProfile
        const userProfileArray = JSON.parse(storedUserProfileJSON);
        setUserProfile(userProfileArray);
        const usersId = userProfileArray[2]; // Get the ID of the user
        const usersToken = window.localStorage.getItem('token');
        getUsersPlaylist(usersId, usersToken);

    }, []);

    // Παίρνουμε τις αποθηκευμένες Playlists του χρήστη
    const getUsersPlaylist = async (usersId, token) =>{
        const endpoint = `https://api.spotify.com/v1/users/${usersId}/playlists`;

        try {
            // Πραγματοποιούμε ένα αίτημα GET στο Spotify API
            const response = await axios.get(endpoint, {
                headers: {Authorization: `Bearer ${token}`},
            })

            setPlaylists(response.data.items)
            console.log(response.data.items)

        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                //Πηγαίνουμε στην αρχική σελίδα
                window.location.href = "/login"

            } else {
                console.error("Failed to get user's playlist: ", error);
            }
        }
    }

    return(
        <div className={styles.userContainer}>
            <div>
                <h2>Your Saved Playlists</h2>
            </div>

            <div className={searchStyles.profileContainer}>
                {userProfile && userProfile[1] ?(
                    <img
                        className={searchStyles.profileImage}
                        src={userProfile[1]}
                        alt=""/>
                    ) : (
                        <img className={searchStyles.profileImage} src={userIcon} alt=""/>
                )}

                <h2 className={searchStyles.profileUsername}>{userProfile[0]}</h2>
            </div>

            <div className={styles.playlistsContainerTopResult}>
                {playlists && playlists.length > 0 ? (
                    playlists.map((playlist) => (
                        <div className={styles.playlistContainerTopResult} key={playlist.id}>
                            {playlist.images && playlist.images.length ? (
                                <img className={styles.playlistImage} src={playlist.images[0].url} alt="" />
                            ) : (
                                <img className={styles.playlistImage} src={playlistIcon} alt="" />
                            )}

                            <h2 className={styles.titles}>{playlist.name}</h2>
                            {renderPlaylistDetails({ playlist })}
                        </div>
                    ))
                ) : (
                    <p>No playlists available.</p>
                )}
            </div>

            <div>
                <button className={styles.goBackButton} onClick={() => navigate("/music_player")}>Back</button>
            </div>

        </div>

    )
}

export default UsersPlaylist