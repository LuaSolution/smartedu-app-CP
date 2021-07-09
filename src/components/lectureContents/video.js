import React from 'react'
import ReactJWPlayer from "react-jw-player"
import { COURSES_PATH, ROOT } from 'defines'

import './iframe.css'

export default ({ src, isYoutube = false, isLocal = true, courseId }) => {
    const playYoutube = () => {
        const embedlink = "https://www.youtube.com/embed/" + getId(src)
        return <div className="video-container">
            <iframe id="myIframe"
                width={window.screen.width * 0.7}
                style={{
                    marginLeft: 'auto', marginRight: 'auto'
                }} frameBorder="0" allowFullScreen src={embedlink}></iframe>
        </div>
    }

    return isYoutube ? playYoutube() : <ReactJWPlayer
        isAutoPlay={true}
        playerId="jw-player"
        playerScript="https://content.jwplatform.com/libraries/jvJ1Gu3c.js"
        file={isLocal ? ROOT + "storage/app/public/" + src : src}
        image={COURSES_PATH + courseId + '.webp'}
    />
}

const getId = url => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return (match && match[2].length === 11)
        ? match[2]
        : null
}