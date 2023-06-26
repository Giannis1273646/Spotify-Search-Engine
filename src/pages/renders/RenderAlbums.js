import React from "react";
import Description from "./RenderDescription";
import styles from "./renderStylesheets/RenderAlbums.module.css"
import albumIcon from "./icons/noAlbumImageIcon.png"
import playlistIcon from "./icons/noPlaylistImageIcon.png"

export function renderAlbums({albums, albumTracks}){
    const remainingAlbums = albums.slice(1);

    return (
        <div className={styles.albumsContainer}>
            {remainingAlbums.map((album) => (
                <div key={album.id} className={styles.albumContainer}>

                    {/* Εμφανίζει την εικόνα του άλμπουμ, αν δεν υπάρχει εμφανίζει το αντίστοιχο μήνυμα */}
                    {album.images && album.images.length ? (
                        <img src={album.images[1].url} alt="" className={styles.albumImage} />
                    ) : (
                        <img className={styles.albumImage} src={albumIcon} alt=""/>
                    )}

                    <h2 className={styles.titles}>{album.name}</h2>

                    {/* Εμφανίζει τους καλλιτέχνες του κάθε άλμπουμ αν υπάρχουν */}
                    {renderAlbumsArtists({album})}

                    {/* Εμφανίζει όλα τα κομμάτια του άλμπουμ. Αν δεν υπάρχον καθόλου εμφανίζει το αντίστοιχο μήνυμα */}
                    {renderAlbumsTracks({album, albumTracks})}
                </div>
            ))}
        </div>
    );
}

export function renderTopResultOfAlbum({albums, albumTracks, isNewRelease = false}){
    if (albums.length === 0) {
        return null;
    }

    const album = albums[0];

    // Αν εμφανίζουμε νέες κυκλοφορίες μην εμφανίσεις το Top Result
    if(isNewRelease){
        return
    }

    return (
        <div>
            <h2>Top Result</h2>
            <div className={styles.albumsContainer}>
                <div key={album.id} className={styles.albumContainerTopResult}>

                    <h2 className={styles.titles}>{album.name}</h2>
                    {/* Εμφανίζει την εικόνα του άλμπουμ, αν δεν υπάρχει εμφανίζει το αντίστοιχο μήνυμα */}
                    {album.images && album.images.length ? (
                        <img src={album.images[1].url} alt="" className={styles.albumImage} />
                    ) : (
                        <img className={styles.albumImage} src={albumIcon} alt=""/>
                    )}

                    {renderAlbumsArtists({album})}
                    {renderAlbumsTracks({album, albumTracks})}
                </div>

            </div>
        </div>

    )
}

// Εμφανίζει τους καλλιτέχνες του κάθε άλμπουμ αν υπάρχουν
function renderAlbumsArtists({album}){
    return(
        <div className={styles.artistsContainer}>
            {album && album.artists && album.artists.length ? (
            <p>
                <strong>Artist: </strong>
                {album.artists.map((artist, index) => (
                <span key={artist.id}>
                    {artist.name}

                    {/* Προσθέτει ένα διαχωριστικό κόμμα μεταξύ των καλλιτεχνών */}
                    {index !== album.artists.length - 1 && ", "}
                </span>
                ))}
                <br/>
                <strong>Album Type: </strong>{album.album_type}<br/>
                <strong>Released Date: </strong>{album.release_date}<br/>
                {album.external_urls.spotify && (
                    <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                        Listen on Spotify
                    </a>
                )}

            </p>
            ) : null}
        </div>
    )
}

//Εμφανίζει όλα τα κομμάτια του άλμπουμ. Αν δεν υπάρχον καθόλου εμφανίζει το αντίστοιχο μήνυμα
function renderAlbumsTracks({album, albumTracks}){
    return(
        <div className={styles.tracksContainer}>
            <h4>Tracks:</h4>
            {albumTracks && albumTracks[album.id] && albumTracks[album.id].length ? (
                <ol className={styles.trackList}>
                    {albumTracks[album.id].map((track, index) => {
                        // Μετατρέπουμε τα ms σε λεπτά. Αναφέρονται για τη διάρκεια του κάθε κομματιού
                        const durationMinutes = Math.floor(track.duration_ms / 60000);
                        const durationSeconds = Math.floor((track.duration_ms % 60000) / 1000);

                        // Format the duration as MM:SS
                        const formattedDuration = `${durationMinutes}:${durationSeconds
                        .toString()
                        .padStart(2, "0")}`;

                        return (
                        <li key={track.id}>
                        <span className={styles.trackNumber}>{index + 1}</span>
                        {track.name} ({formattedDuration} min)
                        </li>
                        );
                    })}
                </ol>
            ) : (
                <p>No tracks available</p>
            )}
        </div>
    )
}

//Συνάρτηση για να εμφανίζει τα playlists
export function renderPlaylist({ playlists, isUsersPlaylists = false }) {

    //Ελέγχουμε αν θέλουμε να κάνουμε render τα playlists του χρήστη. Αν ναι δεν αφαιρούμε το top result
    let remainingPlaylists = playlists
    if(!isUsersPlaylists){
        //Αφαιρούμε το top result
        remainingPlaylists = playlists.slice(1)
    }

    return (
    <div className={styles.playlistsContainer}>
        {remainingPlaylists.map((playlist) => (
            <div className={styles.playlistContainer} key={playlist.id}>

                {playlist.images && playlist.images.length ? (
                        <img className={styles.playlistImage} src={playlist.images[0].url} alt="" />
                    ) : (
                        <img className={styles.playlistImage} src={playlistIcon} alt=""/>
                    )}

                <h2 className={styles.titles}>{playlist.name}</h2>
                {renderPlaylistDetails({playlist})}

            </div>
        ))}
        </div>
    )
}

export function renderTopResultsOfPlaylists({playlists}){
    if (playlists.length === 0) {
        return null; // Εάν ο πίνακας tracks είναι άδειος, επιστρέφει null
    }

    const playlist = playlists[0];

    return (
        <div>
            <h2>Top Result</h2>
            <div className={styles.playlistsContainer}>
                <div className={styles.playlistContainerTopResult} key={playlist.id}>
                    <h2 className={styles.titles}>{playlist.name}</h2>
                    {playlist.images && playlist.images.length ? (
                            <img className={styles.playlistImage} src={playlist.images[0].url} alt="" />
                        ) : (
                            <img className={styles.playlistImage} src={playlistIcon} alt=""/>
                        )}

                    {renderPlaylistDetails({playlist})}

                </div>
            </div>
        </div>
    )
}

function renderPlaylistDetails({playlist}){
    return(
        <div className={styles.playlistDescription}>
            <p>
                <Description description={playlist.description} />
                <strong>Total tracks: </strong>
                <span>{playlist.tracks.total}</span><br/>
                {playlist.external_urls.spotify && (
                    <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                        Listen on Spotify
                    </a>
                )}
            </p>
        </div>
    )
}


