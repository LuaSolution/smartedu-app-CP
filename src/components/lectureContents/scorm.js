import React from 'react'

export default ({ src }) => {
    return <iframe allowFullScreen={true}
        allow="autoplay *; fullscreen *"
        style={{ height: 600, width: '100%', border: 'none' }}
        src={src}>
    </iframe>
}