import React, { useState, useEffect } from 'react'
import { Tabs, Button, List, Spin, Alert } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
// import fileDownload from 'js-file-download'
import axios from 'helpers/axios'
import FileUpload from 'atoms/fileUpload'

const { TabPane } = Tabs
const DOCUMENT_EXT = ["pdf", "docx", "doc"]

const FileResource = ({ downloadList, setDownloadList }) => {
    const [currentTab, setCurrentTab] = useState("1")
    const [currentFile, setCurrentFile] = useState(null)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('admin/file-managers/all')
            .then(res => {
                setData(res.data.filter(i => {
                    if (DOCUMENT_EXT.some(v => { return i.file_path.indexOf(v) >= 0 })) {
                        return i
                    }
                }))
            })
            .finally(() => setLoading(false))
    }, [])

    const uploadedFile = (id, fileName, fileSize) => {
        setData([
            { id: id, file_path: fileName, size: fileSize },
            ...data
        ])
        setCurrentTab("1")
    }

    // const download = (url, fileName) => {
    //     setLoading(true)
    //     axios.get(url, { responseType: 'blob' })
    //         .then(res => {
    //             fileDownload(res.data, fileName)
    //         })
    //         .finally(() => setLoading(false))
    // }

    const removeFile = (fileId, filePath) => {
        setLoading(true)
        const params = {
            file_id: fileId,
            file_path: filePath
        }
        axios
            .post('admin/file-managers/remove', params)
            .then(res => {
                const newItems = data.filter(i => i.id !== fileId)
                setData(newItems)
            })
            .finally(() => setLoading(false))
    }

    return <>
        {currentFile && <Alert message={'Đã chọn file: ' + currentFile.file_path.split('/').slice(-1).pop()} type="info" />}
        <br />
        <Tabs tabPosition='left' activeKey={currentTab} onChange={activeKey => setCurrentTab(activeKey)}>
            <TabPane tab="File đã tải lên" key="1">
                <Spin spinning={loading}>
                    <List style={{ height: 300, overflow: 'auto' }}
                        className="scrollbar"
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => {
                            const fileName = item.file_path.split('/').slice(-1).pop()

                            return <List.Item
                                actions={[
                                    // <Button icon={<DownloadOutlined onClick={() => download(item.file_path, fileName)} />} size={'middle'} />,
                                    currentFile === null || item.id !== currentFile.id ? <Button type="primary" icon={<PlusOutlined onClick={() => {
                                        setDownloadList([{
                                            id: item.id,
                                            fileName,
                                            size: item.size.toFixed(1)
                                        },
                                        ...downloadList])
                                        setCurrentFile(item)
                                    }} />} size={'middle'} />
                                        : null,
                                    currentFile === null || item.id !== currentFile.id ?
                                        <Button type="danger" icon={<DeleteOutlined />} size={'middle'}
                                            onClick={() => removeFile(item.id, item.file_path)} />
                                        : null]}
                            >
                                <List.Item.Meta description={fileName} />
                                <div>{item.size.toFixed(1)}MB</div>
                            </List.Item>
                        }}
                    />
                </Spin>
            </TabPane>
            <TabPane tab="Tải lên file mới" key="2" style={{ paddingBottom: 20 }}>
                <Spin spinning={loading}>
                    <FileUpload uploadedFile={uploadedFile} fileType='document' />
                </Spin>
            </TabPane>
        </Tabs>
    </>
}
export default FileResource