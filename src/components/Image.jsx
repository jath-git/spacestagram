// This App is Deployed. See Live Site at:
// https://image-spacestagram.netlify.app

import React from 'react'

// block of nasa object with image and details
export default function Image({ data, index, toggleLike, deletePost }) {
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

    const parseDate = date => {
        const year = date.substring(0, 4);
        const month = Number(date.substring(5, 7));
        const day = date.substring(8);

        const translateMonth = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        }

        return `${translateMonth[month]} ${day}, ${year}`;
    }

    return (
        <div>
            {src ? <div className={like ? "activate imageHolder lightBlock" : "deactivate imageHolder lightBlock"}>
                <div className="innerMain">
                    <h1 className="imageTitle center">{title ? title : 'No Name'}</h1>
                    {author ? <h2>From {author}</h2> : null}
                    {date ? <h2>{parseDate(date)}</h2> : null}
                </div>
                <div className="innerSupport">
                    <img alt="like" className="pointer" onClick={() => {
                        toggleLike(index);
                    }} src={like ? "./assets/heart-filled.png" : "./assets/heart-no-filled.png"} />
                    <img alt="share" className="copy" onClick={() => {
                        navigator.clipboard.writeText(src);
                    }} src="./assets/share.png" />
                    <img alt="zoom" className="zoom-in" onClick={() => {
                        window.open(src, '_blank')
                    }} src="./assets/zoom.png" />
                    <img alt="trash" className="pointer" onClick={() => {
                        deletePost(index);
                    }} src="./assets/trash.png" />
                </div>
                {hasYoutube(src) ? <iframe className="image" title={index} allow="fullscreen" width="100%" height="250px" src={src} /> : <img className="image" src={src} alt="NASA" onClick={() => window.open(src, '_blank')} />}
                <div className="inner">
                    {description ? <h3>{description}</h3> : null}
                </div>
                <div className="innerSupport">
                    <img alt="like" className="pointer" onClick={() => {
                        toggleLike(index);
                    }} src={like ? "./assets/heart-filled.png" : "./assets/heart-no-filled.png"} />
                    <img alt="share" className="copy" onClick={() => {
                        navigator.clipboard.writeText(src);
                    }} src="./assets/share.png" />
                    <img alt="zoom" className="zoom-in" onClick={() => {
                        window.open(src, '_blank')
                    }} src="./assets/zoom.png" />
                    <img alt="trash" className="pointer" onClick={() => {
                        deletePost(index);
                    }} src="./assets/trash.png" />
                </div>
            </div> : null}
        </div>
    )
}
