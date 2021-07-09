import React, { useState, useEffect } from 'react'
import { Input, Image } from 'antd'
import {
    Card,
    CardBody
} from 'reactstrap'
import FileManager from 'components/fileManager'
import { Avatar } from 'atoms'

const UploadVideo = ({ data, setData }) => {
    const [thumbnail, setThumbnail] = useState()

    useEffect(() => {
        data.video_url && setThumbnail(`http://img.youtube.com/vi/${youtubeParser(data.video_url)}/0.jpg`)
    }, [data])

    const getYoutubeThumbnail = e => {
        const value = e.target.value
        if (value) {
            setThumbnail(`http://img.youtube.com/vi/${youtubeParser(value)}/0.jpg`)
            setData({ ...data, video_url: value, file: null })
        } else {
            setThumbnail(null)
            setData({ ...data, video_url: null })
        }
    }

    const attachFile = id => {
        setThumbnail(null)
        setData({ ...data, video_url: null, file: id })
    }

    return <>
        <Card style={{ marginBottom: 10 }}>
            <CardBody>
                <Input placeholder="Nhúng đường dẫn từ Youtube" allowClear
                    style={{ marginBottom: 5, borderRadius: 5 }}
                    onChange={getYoutubeThumbnail} value={data.video_url}
                />
                {thumbnail && <Avatar
                    src={thumbnail + '?' + Math.random()}
                    height={300} style={{ width: '100%' }} />
                }
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <FileManager attachFile={attachFile} fileType='video' />
            </CardBody>
        </Card>
    </>
}

export default UploadVideo

const youtubeParser = url => {
    if (url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
        var match = url.match(regExp)
        return (match && match[7].length === 11) ? match[7] : false
    }
    return false
}