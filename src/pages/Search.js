import React from 'react';
import axios from 'axios'
import {useEffect, useState} from "react";

import {renderArtists, renderRelatedArtists, renderTopResultsOfArtist} from "./renders/RenderArtists";
import {renderTracks, renderRecommendedTracks, renderTopResultOfTracks} from "./renders/RenderTracks";
import {
    renderAlbums,
    renderPlaylist,
    renderTopResultOfAlbum,
    renderTopResultsOfPlaylists
} from "./renders/RenderAlbums";
import {renderEpisodes, renderShows, renderTopResultsOfEpisodes, renderTopResultsOfShows} from "./renders/Renders";
import {
    renderAlbumsTitle,
    renderArtistsTitle, renderEpisodesTitle,
    renderNewReleaseAlbumsTitle, renderPlaylistsTitle, renderRecommendedTracksTitle,
    renderRelatedArtistTitle, renderShowsTitle, renderTracksTitle, renderUsersPlaylistsTitle
} from "./renders/RenderTitles";

import styles from "./stylesheets/Search.module.css"
import userIcon from "./images/userNoImageIcon.png"

function Search(){
    //Ορισμός των State variables

    //Λίστες για να δεδομένα που θα πάρουμε από το Spotify API
    const [artists, setArtists] = useState([])
    const [tracks, setTracks] = useState([])
    const [albums, setAlbums] = useState([])
    const [albumTracks, setAlbumTracks] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [shows, setShows] = useState([])
    const [episodes, setEpisodes] = useState([])
    const [recommendedTracks, setRecommendedTracks] = useState([])
    const[relatedArtists, setRelatedArtists] = useState([])
    const [userProfile, setUserProfile] = useState([])
    const [isNewRelease, setIsNewRelease] = useState(true)
    const [isUsersPlaylists, setIsUsersPlaylists] = useState(true)

    // Για να έχουμε πρόσβαση στο token που λαμβάνουμε από το Spotify API
    const [token, setToken] = useState("")

    //Για να αναζητούμε λέξεις κλειδιά
    const [searchKey, setSearchKey] = useState('')
    const [searchType, setSearchType] = useState('artist'); // Default search type
    const searchEndpoint = 'https://api.spotify.com/v1/search';


    //Για να εκτελείται μόνο στο πρώτο render
    useEffect(() => {
        setToken(window.localStorage.getItem('token'));
        getUserProfile();
        console.log("getUserProfile()")
        getNewAlbums()
    }, [token]);

    //Για να καλεί τη συνάρτηση getRecommendedTracks, μόνο όταν έχουμε αναζητήσει κομμάτια
     useEffect(() => {
        if (tracks.length > 0) {
            console.log('getRecommendedTracks()')
            getRecommendedTracks();
        }
    }, [tracks]);

    //Για να καλεί τη συνάρτηση getRelatedArtists, μόνο όταν έχουμε αναζητήσει για καλλιτέχνες
     useEffect(() => {
        if (artists.length > 0) {
            getRelatedArtists();
            console.log('getRelatedArtists()')
        }
    }, [artists]);

    const search = async (e) =>{
        e.preventDefault()

        try {
            clearState();

            // Συγχρονισμός των searchKey και searchType πριν από την υποβολή του αιτήματος αναζήτησης
            const currentSearchKey = searchKey;
            const currentSearchType = searchType;

             console.log('Search Key:', currentSearchKey);
             console.log('Search Type:', currentSearchType);

            // Πραγματοποιούμε ένα αίτημα GET στο Spotify API
            const response = await axios.get(searchEndpoint, {
                headers: {Authorization: `Bearer ${token}`},
                params: {
                    q: currentSearchKey,
                    type: currentSearchType,
                    limit: 11
                }
            })

            //Ορίζουμε τη λίστα των δεδομένων μας, ανάλογα με την αναζήτηση που κάναμε
            if(currentSearchType === "artist"){
                setArtists(response.data.artists.items)
                console.log(response.data.artists.items)

            }else if(currentSearchType === "track"){
                setTracks(response.data.tracks.items)
                console.log(response.data.tracks.items)

            }else if(currentSearchType === "album"){
                setIsNewRelease(false)
               await fetchAlbumTrucks(response.data.albums.items)

            }else if(currentSearchType === "playlist"){
                setIsUsersPlaylists(false)
                setPlaylists(response.data.playlists.items)
                console.log(response.data.playlists.items)

            }else if(currentSearchType === "show"){
                setShows(response.data.shows.items)
                console.log(response.data.shows.items)

            }else if(currentSearchType === "episode"){
                setEpisodes(response.data.episodes.items)
                console.log(response.data.episodes.items)
            }

        }catch (error){
            //Σημαίνει ότι έχει λήξει το access token, οπότε κάνουμε logout για να πάρουμε καινούργιο
            if (error.response && error.response.status === 401) {
                logout()
            } else {
                console.error(error);
            }
        }
    }

    //Συνάρτηση για να καθαρίζει ολόκληρο το παράθυρο
    const clearState = () => {
            setArtists([]);
            setTracks([]);
            setAlbums([]);
            setAlbumTracks([]);
            setPlaylists([]);
            setShows([]);
            setEpisodes([]);
            setRecommendedTracks([]);
            setRelatedArtists([])
    }

    //Συνάρτηση που αναζητά και επιστρέφει τα κομμάτια του άλμπουμ, μέσω του id
    const getAlbumTracks = async (albumId, token) => {
        const endpoint = `https://api.spotify.com/v1/albums/${albumId}/tracks`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            //Επιστροφή των κομματιών από την απόκριση του API
             return response.data.items;

        } catch (error) {
             if (error.response && error.response.status === 401) {
                logout()
             } else {
                console.error("Failed to search for album tracks:", error);
             }
        }
    };

     // logout συνάρτηση για την εκκαθάριση του κουπονιού πρόσβασης
    const logout = () => {

        setToken("")
        window.localStorage.removeItem("token")

        //Πηγαίνουμε στην αρχική σελίδα
        window.location.href = "/login"
    }

    // Συνάρτηση που αναζητά τα άλμπουμ που έχουν κυκλοφορήσει πρόσφατα
    const getNewAlbums = async () => {
        const endpoint = 'https://api.spotify.com/v1/browse/new-releases'
        setIsNewRelease(true)

        try {
            // Πραγματοποιούμε ένα αίτημα GET στο Spotify API
            const response = await axios.get(endpoint, {
                headers: {Authorization: `Bearer ${token}`},
            })

            // Καλούμε τη συνάρτηση για να πάρουμε τα κομμάτια του κάθε άλμπουμ
           await fetchAlbumTrucks(response.data.albums.items)
        } catch (error) {
             if (error.response && error.response.status === 401) {
                logout()
             } else {
                console.error(error);
             }
        }
    }

     const fetchAlbumTrucks = async (albumItems) => {
        setAlbums(albumItems);
        console.log(albumItems)

        // Loop που διατρέχει κάθε άλμπουμ για να πάρει τα κομμάτια του
        const tracksPromises = albumItems.map((album) =>
            getAlbumTracks(album.id, token).then((tracks) =>
                setAlbumTracks((prevAlbumTracks) => ({
                    ...prevAlbumTracks,
                    [album.id]: tracks,
                }))
            )
        );
        // Ορισμός των άλμπουμ με κομμάτια
        await Promise.all(tracksPromises);
        console.log(albumTracks);

    }

    // Παίρνουμε προτεινόμενα κομμάτια με βάση το top result, αναζητώντας τα με βάση τον καλλιτέχνη του κομματιού
    const getRecommendedTracks = async () => {
        const endpoint = 'https://api.spotify.com/v1/recommendations';

        let artistId = '';
        let trackId = '';
        let i = 0;

        // eslint-disable-next-line array-callback-return
        tracks.map((track) => {
            //Για να έχουμε πρόσβαση μόνο στο πρώτο κομμάτι
            if (track.artists && track.artists.length > 0 && i===0) {
                //Πρόσβαση στο αναγνωριστικό του πρώτου καλλιτέχνη χρησιμοποιώντας τον δείκτη 0
                artistId = track.artists[0].id;
                trackId = track.id;
            }
            i++
        });

        try {
            // Πραγματοποιούμε ένα αίτημα GET στο Spotify API
            const response = await axios.get(endpoint, {
            headers: {Authorization: `Bearer ${token}`},
            params: {
                setArtists: artistId,
                seed_tracks: trackId,
                limit: 10
            },
        },)

        setRecommendedTracks(response.data.tracks)
        console.log(response.data.tracks)
        } catch (error) {
            console.log(error)
        }
    }

    // Παίρνουμε σχετικούς καλλιτέχνες με βάση το top result, αναζητώντας τα με βάση τον καλλιτέχνη
    const getRelatedArtists = async() => {
        const artistId = artists[0].id; // Παίρνουμε το αναγνωριστικό του πρώτου καλλιτέχνη
        const endpoint = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;

         try {
            // Πραγματοποιούμε ένα αίτημα GET στο Spotify API
            const response = await axios.get(endpoint, {
                headers: {Authorization: `Bearer ${token}`},
                params: {limit: 10}
            },)

           setRelatedArtists(response.data.artists)
             console.log(response.data.artists)
        } catch (error) {
            console.log(error)
        }
    }

    // Για να πάρουμε τις πληροφορίες προφίλ του συνδεδεμένου χρήστη
    const getUserProfile =  async () => {
        const endpoint = 'https://api.spotify.com/v1/me'

        try {
            // Πραγματοποιούμε ένα αίτημα GET στο Spotify API
            const response = await axios.get(endpoint, {
                headers: {Authorization: `Bearer ${token}`},
            })

            //Ελέγχουμε πρώτα αν ο χρήστης έχει εικόνα προφίλ, αν όχι την αποθηκεύουμε σαν null
            const userProfileImages = response.data.images;
            const imageUrl = userProfileImages.length > 0 ? userProfileImages[0].url : null;

            // Αποθηκεύουμε μόνο το user name, την εικόνα προφίλ και το id
            setUserProfile([response.data.display_name, imageUrl, response.data.id]);
            console.log(userProfile)

        } catch (error) {
            if (error.response && error.response.status === 401) {
                logout()
            } else {
                console.error(error);
            }
        }
    }

    const renderUser = () =>{

        // Για να διαχειριστούμε τις επιλογές του χρήστη από το μενού
        const handleMenuOption = (option) =>{
            if (option === "getPlaylist"){
                getUsersPlaylist();
            }else if(option === "logout"){
                logout();
            }
        }
         return (
            <div className={styles.profileContainer}>
                {/* Εμφανίζει την εικόνα του user, αν δεν έχει εμφανίζουμε ένα δικό μας εικονίδιο*/}
                {userProfile && userProfile[1] ?(
                    <img
                        className={styles.profileImage}
                        src={userProfile[1]}
                        alt=""/>
                ) : (
                    <img className={styles.profileImage} src={userIcon} alt=""/>
                )}
                <h2 className={styles.profileUsername}>{userProfile[0]}</h2>

                {/* Drop-down menu */}
                <div className={styles.dropdown}>
                    <button
                        className={styles.dropdownButton}></button>
                    <div className={styles.dropdownContent}>
                        <button onClick={() => handleMenuOption("getPlaylist")}>Get Saved Playlist</button>
                        <button onClick={() => handleMenuOption("logout")}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }

    // Παίρνουμε τις αποθηκευμένες Playlists του χρήστη
    const getUsersPlaylist = async () =>{
        const usersId = userProfile[2].id; // Get the ID of the user
        const endpoint = `https://api.spotify.com/v1/users/${usersId}/playlists`;
        setIsUsersPlaylists(true)

        try {
           clearState();

            // Πραγματοποιούμε ένα αίτημα GET στο Spotify API
            const response = await axios.get(endpoint, {
                headers: {Authorization: `Bearer ${token}`},
            })

            setPlaylists(response.data.items)
            console.log(response.data.items)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                logout()
            } else {
                console.error("Failed to get user's playlist: ", error);
            }
        }
    }

    // Για να διαχειριστούμε τις αλλαγές του τύπου αναζήτησης
    const handleSearchTypeChange  = (event) => {
        setSearchType(event.target.value);
    };

    return(
        <header className={styles.AppHeader}>
            <form className={styles.formContainer} onSubmit={(event) => search(event)}>

                <div>
                    {/* Επιλέγουμε πεδίο για τον τύπο αναζήτησης */}
                    <select
                        className={styles.selectField}
                        value={searchType}
                        onChange={handleSearchTypeChange}
                    >
                        <option value="artist">Artist</option>
                        <option value="track">Track</option>
                        <option value="album">Album</option>
                        <option value="playlist">Playlist</option>
                        <option value="show">Show</option>
                        <option value="episode">Episode</option>
                    </select>

                    {/* Πεδίο εισαγωγής της λέξης κλειδί για την αναζήτηση */}
                    <input
                        className={styles.inputField}
                        type="text"
                        value={searchKey}
                        onChange={(event) => {
                            setSearchKey(event.target.value);
                            console.log('Input value:', event.target.value);
                        }}
                    />
                </div>

                {/* Search button */}
                <button className={styles.searchButton} type="submit">Search</button>

            </form>

            {renderUser()}

            {/*Ελέγχουμε ποια λίστα αλλάζει για να κάνουμε τα αντίστοιχα renders*/}
            {artists && (
                <>
                    {renderTopResultsOfArtist({artists})}
                    {renderArtistsTitle({artists})}
                    {renderArtists({artists})}
                </>
            )}
            {albums && renderNewReleaseAlbumsTitle({albums, isNewRelease: isNewRelease})}

            {albums && albumTracks && (
                <>
                    {renderTopResultOfAlbum({albums, albumTracks, isNewRelease: isNewRelease})}
                    {renderAlbumsTitle({albums, isNewRelease: isNewRelease})}
                    {renderAlbums({albums, albumTracks})}
                </>
            )}

            {relatedArtists && (
                <>
                    {renderRelatedArtistTitle({ relatedArtists })}
                    {renderRelatedArtists({ relatedArtists })}
                </>
            )}
            {tracks && (
                <>
                    {renderTopResultOfTracks({tracks})}
                    {renderTracksTitle({tracks})}
                    {renderTracks({ tracks })}
                </>
            )}

            {recommendedTracks && (
                <>
                    {renderRecommendedTracksTitle({ recommendedTracks })}
                    {renderRecommendedTracks({ recommendedTracks })}
                </>
            )}

            {playlists && (
                <>
                    {isUsersPlaylists ?
                        renderUsersPlaylistsTitle({ playlists})
                        : (
                            <>
                                {renderTopResultsOfPlaylists({playlists})}
                                {renderPlaylistsTitle({ playlists})}
                            </>
                        )}
                    {renderPlaylist({ playlists, isUsersPlaylists: isUsersPlaylists  })}
                </>
            )}

            {shows && (
                <>
                    {renderTopResultsOfShows({shows})}
                    {renderShowsTitle({shows})}
                    {renderShows({ shows })}
                </>
            )}

            {episodes && (
                <>
                    {renderTopResultsOfEpisodes({episodes})}
                    {renderEpisodesTitle({ episodes })}
                    {renderEpisodes({ episodes })}
                </>
            )}
        </header>
    )
}

export default Search;