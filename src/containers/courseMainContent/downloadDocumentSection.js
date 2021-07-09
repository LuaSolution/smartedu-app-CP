import React, { useState, useEffect } from 'react'
import { CourseContentDocumentTab as DocumentTab, NoData } from 'atoms'
import axios from 'helpers/axios'
import { Spin } from 'antd'
import fileDownload from 'js-file-download'
import { ROOT } from 'defines'
import { connect } from 'react-redux'
import 'assets/user/downloadDocument.css'

const DownloadDocument = ({ courseId }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (courseId) {
      setLoading(true)
      axios
        .get('admin/courses/resources/paging/' + courseId)
        .then((res) => {
          setData(res.data.data)
        })
        .finally(() => setLoading(false))
    }
  }, [courseId])

  const download = (url, fileName) => {
    setLoading(true)
    axios
      .get(url, { responseType: 'blob' })
      .then((res) => {
        fileDownload(res.data, fileName)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="wrapper-content box-list-comment-course">
      <DocumentTab
        className="document-id tab-item-content active"
        style={{
          backgroundColor: '#ffff',
          boxShadow: '2px 6px 30px rgb(78 82 92 / 10%)',
          border: 'none',
        }}
      >
        <Spin spinning={loading} size="large">
          {data && data.length > 0 ? (
            data.map((i, index) => {
              let fileName = i.fileName.split('/').slice(-1).pop()
              fileName = fileName.substring(fileName.indexOf('-') + 1)
              return (
                <div className="doc" key={'doc' + index}>
                  {fileName}
                  {!i.fileName.includes('http') ? (
                    <a
                      href={ROOT + 'storage/app/public/' + i.fileName}
                      target="_blank"
                    ></a>
                  ) : (
                    <a
                      href={null}
                      onClick={() => download(i.fileName, fileName)}
                    ></a>
                  )}
                </div>
              )
            })
          ) : (
            <NoData title="Không có tài liệu" />
          )}
        </Spin>
      </DocumentTab>
    </div>
  )
}

const mapStateToProps = ({ courseContents }) => {
  const { courseId } = courseContents
  return { courseId }
}

const mapActionToProps = {}

export default connect(mapStateToProps, mapActionToProps)(DownloadDocument)
