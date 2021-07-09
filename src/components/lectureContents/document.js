import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import { useParams } from "react-router-dom"

const Wrapper = styled.div`
overflow-y: scroll;
 height: ${window.screen.height * 0.8}px;
  padding: 50px 0; 
margin: 0 auto 
`
export default ({ src, type = 'text' }) => {
    const [loading, setLoading] = useState(false)
    const [source, setSource] = useState(null)
    let { lesson } = useParams()

    useEffect(() => {
        console.log(type)
        if (type === 'pdf') {
            setLoading(true)
            setSource('https://drive.google.com/viewerng/viewer?embedded=true&url=' + src)
        } else {
            setLoading(false)
        }
    }, [lesson, type, src]);

    return <Spin spinning={loading}>
        {type === 'text' ?
            <Wrapper className="scrollbar" style={{ backgroundColor: '#fff', padding: '0 15px' }}>
                <div dangerouslySetInnerHTML={{ __html: src + src }} />
            </Wrapper>
            : type === 'pdf' ?
                <iframe className='scrollbar'
                    scrolling="yes"
                    allowFullScreen={true}
                    height={window.innerHeight * 0.9}
                    width='100%'
                    src={source}
                    frameBorder="0"
                    onLoad={() => setLoading(false)}></iframe>
                :
                null}
    </Spin>
}