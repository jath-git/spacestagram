// This App is Deployed. See Live Site at:
// https://image-spacestagram.netlify.app

import React from 'react'

// block of nasa object with image and details
export default function Image({ data, index, toggleLike }) {
    const { date, src, title, description, author, like } = data[index];

    const hasYoutube = string => {
        const YOUTUBE = 'youtube';
        const YOUTUBE_LENGTH = YOUTUBE.length;
        const STRING_LENGTH = string.length;
        if (STRING_LENGTH < YOUTUBE_LENGTH) {
            return false;
        }

        let lowerString = string.toLowerCase();
        for (let i = 0; i < STRING_LENGTH - YOUTUBE_LENGTH; ++i) {
            if (lowerString.substring(i, i + YOUTUBE_LENGTH) === YOUTUBE) {
                return true;
            }
        }
        return false;
    }

    return (
        <div>
            {src ? <div className="imageHolder block">
                <h1 className="center">{title ? title : 'No Name'}</h1>
                {author ? <h2 className="center">From {author}</h2> : null}
                {hasYoutube(src) ? <iframe allow="fullscreen" width="100%" height="250px" src={src} /> : <img src={src} alt="NASA" onClick={() => window.open(src, '_blank')} />}
                {date ? <h2 className="right">{date}</h2> : null}
                {description ? <h3>{description}</h3> : null}
                <div className={like ? 'button' : 'disabled'} onClick={() => {
                    toggleLike(index);
                }}>{like ? 'Unlike' : 'Like'}</div>
            </div> : null}
        </div>
    )
}
