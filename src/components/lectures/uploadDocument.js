import React, { useState } from 'react'
import {
    Card,
    CardBody
} from 'reactstrap'
import { Alert } from 'antd'
import FileManager from 'components/fileManager'
//React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'assets/admin/quill.css'

const TypeDocument = ({ data, setData }) => {
    const [fileName, setFileName] = useState(null)

    const attachFile = (id, name) => {
        setFileName(name)
        setData({ ...data, file: id })
    }

    return <>
        <Card style={{ marginBottom: 15 }}>
            <CardBody>
                <ReactQuill
                    style={{ borderRadius: 15 }}
                    theme="snow"
                    value={data.text_document || ''}
                    modules={quillModules}
                    formats={quillFormats}
                    onChange={e => {
                        setData({ ...data, file: null, text_document: e })
                    }}
                />
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                {fileName && <Alert message={'Đã chọn file: ' + fileName} type="info" />}
                <br />
                <FileManager attachFile={attachFile} fileType='document' />
            </CardBody>
        </Card>
    </>
}

export default TypeDocument

const quillModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
}

const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
]