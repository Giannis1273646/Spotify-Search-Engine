import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styles from "./stylesheets/History.module.css"
import searchStyles from "./stylesheets/Search.module.css";
import userIcon from "./images/userNoImageIcon.png";

function History() {
    const [history, setHistory] = useState([]);
    const [userProfile, setUserProfile] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        // Ανακτούμε το JSON string από το local storage
        const storedUserProfileJSON = window.localStorage.getItem('userProfile');

        // Μετατρέπουμε το JSON string σε μορφή πίνακα και το αποθηκεύουμε στο UserProfile
        const userProfileArray = JSON.parse(storedUserProfileJSON);
        setUserProfile(userProfileArray);

        // Ελέγχουμε αν το userProfile δεν είναι null πριν συνεχίσουμε
        if (userProfileArray) {
            const userId = userProfileArray[2];
            const distinct = false;

            //Για να πάρουμε το ιστορικό αναζητητής του χρήστη από τη βάση δεδομένων μας
            axios.get(`http://localhost:4000/api/get-history?userId=${userId}`, {
                params: {
                    isDistinct: distinct,
                }
            })
            .then((response) => {
                setHistory(response.data);
                console.log("History:" + response.data); // The response data from the server
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, []);

    const deleteHistory = async () => {
        const userId = userProfile[2];

        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete your search history? ") === true) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/delete-users-history?userId=${userId}`);
                setHistory([]);
                console.log(response.data); // Server response
                alert("History Cleared Successfully");
            } catch (error) {
                console.error('Error deleting records:', error);
                alert("Something went wrong! Try again later");
            }
        } else {
            console.log("You canceled!");
        }
    }

    return(
        <div className={styles.body}>
            <h1 className={styles.center}>Search History</h1>
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

            {/*Ελέγχουμε αν υπάρχει ιστορικό αναζήτησης*/}
            {history && history.length > 0 ? (
                history.map((item) => (
                    <div className={styles.container} key={item.value.id}>
                        {item.value}
                    </div>
                ))
            ) : (
                <div className={styles.container}>No search history available.</div>
            )}

            <div className={styles.buttonContainer}>
                <button className={styles.goBackButton} onClick={() => navigate('/music_player')}>Back</button>

                {/*Το κουμπί Clear History θα κάνει render μόνο αν υπάρχει διαθέσιμο ιστορικό αναζήτησης */}
                {history && history.length > 0 && (
                    <button
                        className={styles.clearButton}
                        onClick={deleteHistory}
                    >Clear History</button>)}
            </div>
        </div>
    )
}

export default History;