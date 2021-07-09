import React, { useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import FileManager from 'components/fileManager'
import { Alert } from 'antd'

const UploadVideo = ({ data, setData }) => {
    const [fileName, setFileName] = useState(null)

    const attachFile = (id, name) => {
        setFileName(name)
        setData({ ...data, file: id })
    }

    return <Card >
        <CardBody>
            {fileName && <Alert message={'Đã chọn file: ' + fileName} type="info" />}
            <br />
            <FileManager attachFile={attachFile} zip={true} fileType='scorm' />
        </CardBody>
    </Card>
}

export default UploadVideo