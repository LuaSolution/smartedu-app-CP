import React, { useState } from 'react'
import { Upload, Progress, message, Spin } from 'antd'
import axios from 'helpers/axios'

const { Dragger } = Upload

const B2MB = 0.000001

const FileUpload = ({ zip, uploadedFile, fileType = 'all' }) => {
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setPropgress] = useState(0)

  const handleUpload = () => {
    const formData = new FormData()
    formData.append('file', fileList[0])
    const fileSize = fileList[0].size
    setUploading(true)

    axios
      .post(
        zip ? 'admin/file-managers/upload-zip' : 'admin/file-managers/upload',
        formData,
        {
          timeout: 1000 * 60 * 10,
          onUploadProgress: (progressEvent) =>
            setPropgress(((progressEvent.loaded / fileSize) * 100).toFixed(0)),
        }
      )
      .then((res) => {
        message.success('Đã upload lên server')
        const { id, file_path } = res.data
        uploadedFile(id, file_path, fileSize * B2MB)
        setFileList([])
      })
      .catch((err) => {
        message.error('Không thể upload')
      })
      .finally(() => setUploading(false))
  }

  const props = {
    onRemove: (file) => {
      setFileList((fileList) => {
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        return {
          fileList: newFileList,
        }
      })
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    onChange: (info) => handleUpload(),
    fileList,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    multiple: false,
  }

  const accept = () => {
    switch (fileType) {
      case 'video':
        return '.mp4,.ogg'
      case 'document':
        return '.pdf'
      case 'scorm':
        return '.zip'
      default:
        return '*'
    }
  }

  return (
    <>
      <Spin spinning={uploading}>
        <Dragger {...props} maxCount={1} accept={accept()}>
          <p className="ant-upload-drag-icon">
            <span
              className="simple-icon-cloud-upload"
              style={{ fontSize: 32 }}
            ></span>
          </p>
          <p className="ant-upload-text">
            Kéo thả file vào khung này để upload
          </p>
          <p className="ant-upload-hint">Định dạng: {accept()}</p>
        </Dragger>
      </Spin>
      <Progress percent={progress} style={{ width: '70%' }} size="small" />
    </>
  )
}

export default FileUpload
