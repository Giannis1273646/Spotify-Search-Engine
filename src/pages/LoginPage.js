import React from 'react';
import styles from './stylesheets/LoginPage.module.css';
import backgroundImage from './images/backgroundImage.jpg';

function LoginPage() {
    const CLIENT_ID = "Replace it with your ID"
    const REDIRECT_URI = "http://localhost:3000/login"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    //Ορίζουμε το style του background της σελίδας
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    return (
        <div style={backgroundStyle}>
            <div className={styles.div}>
                <h1 className={styles.h1}>Music Search Engine</h1>
                <p className={styles.par}>
                    Welcome to the music search engine. Please{' '}
                    <a
                        className={styles.link}
                        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                    >
                        Login to Spotify
                    </a>{' '}
                    to continue
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
