import React from 'react';

// Για να εμφανίζει τη html περιγραφεί σε κανονική μορφή
function Description({ description }) {
    const hasDescription = description && description.length > 0;

    const createMarkup = (htmlString) => ({ __html: htmlString });

    return (
        <div>
            <strong>Description: </strong>
            {hasDescription ? (
                <span dangerouslySetInnerHTML={createMarkup(description)} />
            ) : (
                <span>No description available</span>
            )}
        </div>
    );
}

export default Description;
