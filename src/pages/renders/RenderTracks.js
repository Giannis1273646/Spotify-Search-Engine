import React from "react";
import styles from "./renderStylesheets/RenderTracks.module.css"
import trackIcon from "./icons/noTrackImageIcon.png"

export function renderTracks({tracks}){
    //Αφαιρεί το πρώτο κομμάτι
    const remainingTracks = tracks.slice(1); //

    return (
        <div className={styles.tracksContainer}>
            {remainingTracks.map(track =>(
            <div className={styles.trackContainer} key={track.id}>
                {renderTrackImage(track)}
                <h2 className={styles.titles}>{track.name}</h2>
                {renderTracksInformation(track)}
            </div>
            ))}
        </div>
    )
}

export function renderTopResultOfTracks({tracks}){
    if (tracks.length === 0) {
        return null; //Εάν ο πίνακας tracks είναι άδειος, επιστρέψτε null
    }

    //Παίρνουμε το πρώτο αντικείμενο από τον πίνακα tracks
    const track = tracks[0];

    return (
        <div>
            <h2>Top Result</h2>
            <div className={styles.tracksContainerTopResult}>
                <div className={styles.trackContainerTopResult} key={track.id}>
                    <h2 className={styles.titles}>{track.name}</h2>
                    {renderTrackImage(track)}
                    {renderTracksInformation(track)}
                </div>
            </div>

        </div>
    );
}

export function renderRecommendedTracks({recommendedTracks})  {

    return (
        <div className={styles.tracksContainer}>
            {recommendedTracks.map(track =>(
                <div className={styles.trackContainer} key={track.id}>
                    {renderTrackImage(track)}
                    <h2 className={styles.titles}>{track.name}</h2>
                    {renderTracksInformation(track)}
                </div>
            ))}
        </div>
    )
}

function renderTrackImage(track) {
    return (
    <>
        {track.album.images && track.album.images.length ? (
            <img className={styles.trackImage} src={track.album.images[1].url} alt="" />
        ) : (
            <img className={styles.trackImage} src={trackIcon} alt="" />
        )}
    </>
    );
}

/*Κάνει render τις πληροφορίες των κομματιών*/
function renderTracksInformation(track) {
    return(
        <p>
            <strong>Artist: </strong>
            {renderArtistNames(track)}<br/>
            <strong>Album Name: </strong> {track.album.name}<br/>
            <strong>Duration: </strong> {formatDuration(track.duration_ms)}<br/>
            <strong>Album's Track Number: </strong>{track.track_number}<br/>
            {track.external_urls.spotify && (
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
            </a>
            )}
        </p>
    )
}

function renderArtistNames(track) {
    return track.artists.map((artist, index) => (
        <span key={artist.id}>
            {artist.name}
            {index !== track.artists.length - 1 && ", "}
        </span>
    ));
}

//Μετατρέπουμε το track.duration_ms σε λεπτά και παράλληλα ορίζουμε το format του
export function formatDuration(duration_ms) {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = Math.floor((duration_ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");

    return `${minutes}:${seconds} minutes`;
}
