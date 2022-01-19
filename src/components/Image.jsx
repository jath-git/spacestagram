import React from 'react'

export default function Image({ data, index, toggleLike }) {
    const { date, src, title, description, author, like } = data[index];

    return (
        <div className="imageHolder block">
            <h1 className="center">{title ? title : 'No Name'}</h1>
            {author ? <h2 className="center">From {author}</h2> : null}
            {src ? <img src={src} alt="NASA" /> : null}
            {date ? <h2 className="right">{date}</h2> : null}
            {description ? <h3>{description}</h3> : null}
            <div className="button" onClick={() => {
                toggleLike(index);
            }}>{like ? 'Unlike' : 'Like'}</div>
        </div>
    )
}
