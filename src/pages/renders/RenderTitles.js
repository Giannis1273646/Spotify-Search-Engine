import React from "react";
import styles from "./renderStylesheets/RenderTitles.module.css"

/*Συναρτήσεις που μας επιστρέφουν τον τίτλο κάθε κατηγορίας που κάνουμε αναζήτηση*/
export function renderArtistsTitle({artists}){
    return (
        artists.length > 0 &&(
            <h1 className={styles.h1}>Artists</h1>
        )
    )
}

export function renderRelatedArtistTitle({relatedArtists}){
    return(
        relatedArtists.length > 0 && (
            <h1 className={styles.h1}>Related Artists</h1>
        )
    )
}

export function renderAlbumsTitle({albums, isNewRelease = false}){
    return(
        albums.length > 0 && !isNewRelease &&(
            <h1 className={styles.h1}>Albums</h1>
        )
    )
}

export function renderNewReleaseAlbumsTitle({albums, isNewRelease= false}){
    return(
        albums.length > 0  && isNewRelease &&(
            <h1 className={styles.h1}>New Released Albums</h1>
        )
    )
}

export function renderTracksTitle({tracks}){
    return(
        tracks.length > 0 && (
            <h1 className={styles.h1}>Tracks</h1>
        )
    )
}

export function renderRecommendedTracksTitle({recommendedTracks}){
    return(
        recommendedTracks.length > 0 && (
            <h1 className={styles.h1}>Recommended Tracks</h1>
        )
    )
}

export function renderPlaylistsTitle({playlists}){
    return(
        playlists.length > 0 &&(
            <h1 className={styles.h1}>Playlists</h1>
        )
    )
}

export function renderUsersPlaylistsTitle({playlists}){
    return(
        playlists.length > 0 &&(
            <h1 className={styles.h1}>My Playlists</h1>
        )
    )
}

export function renderShowsTitle({shows}){
    return(
        shows.length > 0 && (
            <h1 className={styles.h1}>Shows</h1>
        )
    )
}

export function renderEpisodesTitle({episodes}){
    return(
        episodes.length > 0 && (
            <h1 className={styles.h1}>Episodes</h1>
        )
    )
}