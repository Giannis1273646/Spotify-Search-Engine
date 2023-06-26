import React from "react";
import {formatDuration} from "./RenderTracks";
import Description from "./RenderDescription";
import styles from "./renderStylesheets/Render.module.css"
import showIcon from "./icons/noShowImageIcon.jpg"
import episodeIcon from "./icons/noEpisodeImageIcon.png";

export function renderShows({shows}){
    const remainingShows = shows.slice(1);
    return (
        <div className={styles.showsContainer}>
            {remainingShows.map(show =>(
                <div className={styles.showContainer} key={show.id}>
                     {/* Εμφάνιση της εικόνας εάν υπάρχει, αλλιώς εμφάνιση δικού μας εικονιδίου */}
                        {show.images.length? <img className={styles.showImage} src={show.images[1].url} alt=""/> :
                            <img className={styles.showImage} src={showIcon} alt=""/> }
                     <h2 className={styles.titles}>{show.name}</h2>
                     {renderShowDetails({show})}
                </div>
            ))}
        </div>
    )
}

export function renderTopResultsOfShows({shows}){
    if (shows.length === 0) {
        return null;
    }

    const show = shows[0];

    return (
        <div>
            <h2>Top Result</h2>
            <div className={styles.showsContainer}>
                <div className={styles.showContainerTopResult} key={show.id}>
                    <h2 className={styles.titles}>{show.name}</h2>
                     {/* Εμφάνιση της εικόνας εάν υπάρχει, αλλιώς εμφάνιση δικού μας εικονιδίου */}
                        {show.images.length? <img className={styles.showImage} src={show.images[1].url} alt=""/> :
                            <img className={styles.showImage} src={showIcon} alt=""/> }
                    {renderShowDetails({show})}

                </div>
            </div>
        </div>

    )
}

function renderShowDetails({show}) {
    return(
        <p>
            <Description  description={show.html_description}/>
            <strong>Total Episodes: </strong>{show.total_episodes}<br/>
            <strong>Publisher: </strong>{show.publisher}<br/>
            {show.external_urls.spotify && (
                <a href={show.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    Listen on Spotify
                </a>
            )}
        </p>
    )
}

export function renderEpisodes({episodes}){
    const remainingEpisodes = episodes.slice(1);
    return(
        <div className={styles.episodesContainer}>
            { remainingEpisodes.map(episode => (
                <div className={styles.episodeContainer} key={episode.id}>
                    {/* Εμφάνιση της εικόνας εάν υπάρχει, αλλιώς εμφάνιση δικού μας εικονιδίου */}
                    {episode.images.length? <img className={styles.episodeImage} src={episode.images[1].url} alt=""/> :
                        <img className={styles.episodeImage} src={episodeIcon} alt=""/> }

                    <h2 className={styles.titles}>{episode.name}</h2>
                    {renderEpisodeDetails({episode})}
                </div>
            ))}
        </div>
    )
}

export function renderTopResultsOfEpisodes({episodes}){
     if (episodes.length === 0) {
        return null;
    }

    const episode = episodes[0];

     return (
         <div>
             <h2>Top Result</h2>
             <div className={styles.episodesContainer}>
                 <div className={styles.episodeContainerTopResult} key={episode.id}>
                    <h2 className={styles.titles}>{episode.name}</h2>
                     {/* Εμφάνιση της εικόνας εάν υπάρχει, αλλιώς εμφάνιση του δικού μας εικονιδίου */}
                        {episode.images.length? <img className={styles.episodeImage} src={episode.images[1].url} alt=""/> :
                            <img className={styles.episodeImage} src={episodeIcon} alt=""/> }

                    {renderEpisodeDetails({episode})}
                </div>

             </div>
         </div>
     )
}

function renderEpisodeDetails({episode}){
    return(
         <p>
            <Description  description={episode.html_description}/>
            <strong>Duration: </strong>{formatDuration(episode.duration_ms)}<br/>
            <strong>Release Date: </strong>{episode.release_date}<br/>
            {episode.external_urls.spotify && (
                <a href={episode.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    Listen on Spotify
                </a>
            )}
        </p>
    )
}