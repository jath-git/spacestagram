// This App is Deployed. See Live Site at:
// https://image-spacestagram.netlify.app

import React from 'react'

export default function Image({ data, index, toggleLike }) {
    const { date, src, title, description, author, like } = data[index];

    return (
        <div>
            {src ? <div className="imageHolder block">
                <h1 className="center">{title ? title : 'No Name'}</h1>
                {author ? <h2 className="center">From {author}</h2> : null}
                <img src={src} alt="NASA" onClick={() => window.open(src, '_blank')} />
                {date ? <h2 className="right">{date}</h2> : null}
                {description ? <h3>{description}</h3> : null}
                <div className={like ? 'button' : 'disabled'} onClick={() => {
                    toggleLike(index);
                }}>{like ? 'Unlike' : 'Like'}</div>
            </div> : null}
        </div>
    )
}
