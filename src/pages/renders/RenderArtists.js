import React from "react";
import styles from "./renderStylesheets/RenderArtists.module.css"
import artistIcon from "./icons/artistNoImageIcon.png"

 // Συνάρτηση για την απόδοση της λίστας των καλλιτεχνών
export function renderArtists({artists}){
    const remainingArtists = artists.slice(1);

    return(
        <div className={styles.artistsContainer}>
            {remainingArtists.map(artist =>(
                <div className={styles.artistContainer} key={artist.id}>
                    {/* Εμφάνιση της εικόνας του καλλιτέχνη εάν υπάρχει, αλλιώς εμφάνιση του αντίστοιχου μηνύματος */}
                    {artist.images.length? <img className={styles.artistImage} src={artist.images[1].url} alt=""/> :
                        <img className={styles.artistImage} src={artistIcon} alt=""/> }

                    {/* Εμφάνιση του ονόματος του καλλιτέχνη */}
                    <h2 className={styles.titles}>{artist.name}</h2>

                    {/* Εμφάνιση των επιπλέον πληροφοριών του καλλιτέχνη, αν υπάρχουν*/}
                    {renderArtistInfo(artist)}
                </div>
            ))}
        </div>
    )
}

export function renderTopResultsOfArtist({artists}){
    if (artists.length === 0) {
        return null;
    }

    const artist = artists[0]

    return (
        <div>
            <h2>Top Result</h2>
            <div className={styles.artistsContainerTopResult}>
                <div className={styles.artistContainerTopResult} key={artist.id}>
                    {/* Εμφάνιση του ονόματος του καλλιτέχνη */}
                    <h2 className={styles.titles}>{artist.name}</h2>
                    {/* Εμφάνιση της εικόνας του καλλιτέχνη εάν υπάρχει, αλλιώς εμφάνιση του αντίστοιχου μηνύματος */}
                    {artist.images.length? <img className={styles.artistImage} src={artist.images[1].url} alt=""/> :
                        <img className={styles.artistImage} src={artistIcon} alt=""/> }

                    {/* Εμφάνιση των επιπλέον πληροφοριών του καλλιτέχνη, αν υπάρχουν*/}
                    {renderArtistInfo(artist)}
                </div>
            </div>
        </div>

    )
}

//Για να εμφανίσουμε τους καλλιτέχνες οι οποίοι είναι σχετικοί με τους καλλιτέχνες που αναζητήσαμε
export function renderRelatedArtists({relatedArtists}){

    return(
        <div className={styles.artistsContainer}>
            {relatedArtists.map(artist =>(
            <div className={styles.artistContainer} key={artist.id}>

                {/* Εμφάνιση της εικόνας του καλλιτέχνη εάν υπάρχει, αλλιώς εμφάνιση του αντίστοιχου μηνύματος */}
                {artist.images.length? <img className={styles.artistImage} src={artist.images[1].url} alt=""/> : <div>No image</div> }

                {/* Εμφάνιση του ονόματος του καλλιτέχνη */}
                <h2 className={styles.titles}>{artist.name}</h2>

                {/* Εμφάνιση των επιπλέον πληροφοριών του καλλιτέχνη, αν υπάρχουν*/}
                {renderArtistInfo(artist)}
            </div>
        ))}
    </div>
    )
}

function renderArtistInfo(artist) {
    return (
    <p>
        <strong>Genre:</strong>{" "}
        {artist.genres && artist.genres.length ? artist.genres.join(", ") : "N/A"}{" "}
        <br />

        <strong>Total followers:</strong>{" "}
        {artist.followers && artist.followers.total ? artist.followers.total : "N/A"}{" "}
        <br />

        <strong>Popularity:</strong>{" "}
        {artist.popularity !== null && artist.popularity !== undefined ? artist.popularity : "N/A"}
        <br/>

        {artist.external_urls.spotify && (
            <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
            </a>
        )}
    </p>
    );
}
