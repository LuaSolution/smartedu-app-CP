import React, { useState, useEffect } from 'react'
import UserTopLayout from 'components/users/UserTopLayout'
import {
  PlusOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { Modal, Form, Input, DatePicker, Spin, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { NoData } from 'atoms'
import chungchi from 'assets/mau-chung-chi-cp.png'
import axios from 'helpers/axios'
import moment from 'moment'
import QRCode from 'react-qr-code'
import { getBase64 } from 'helpers/Utils'
import fileDownload from 'js-file-download'
import { EX_CERTIFICATE_PATH } from 'defines'
import useFormDatePicker from 'helpers/useFormDatePicker'
import 'assets/user/user-dashboard.scss'

const _user = JSON.parse(localStorage.getItem('@current_user'))

const MyCertificate = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalDisplayVisible, setIsModalDisplayVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [data, setData] = useState([])
  const [fileList, setFileList] = useState([])
  const [image, setImage] = useState(null)
  const date = useFormDatePicker()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    axios
      .get(`certificate/paging/${_user.id}/${data.length}`)
      .then((res) => {
        if (res.data.status === 200) {
          const ex_certificates = res.data.ex_certificates.map((i) => {
            return { ...i, type: 2 }
          })
          setData([...data, ...ex_certificates, ...res.data.data])
        }
      })
      .finally(() => setLoading(false))
  }

  const download = (url, fileName) => {
    setLoading(true)
    axios
      .get(url, { responseType: 'blob' })
      .then((res) => {
        fileDownload(res.data, fileName)
      })
      .finally(() => setLoading(false))
  }

  const onFinish = (values) => {
    setLoading(true)
    axios
      .post('certificates/upload-ex-certificate', {
        name: values.name,
        date: date.getValue(),
        image,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setData([
            {
              id: res.data.data,
              type: 2,
              title: values.name,
              release_date: date.getValue(),
            },
            ...data,
          ])
          message.success('Upload chứng chỉ thành công')
          setIsModalVisible(false)
        }
      })
      .finally(() => setLoading(false))
  }

  const handleChangeAvatar = async ({ fileList }) => {
    fileList.length > 1 ? setFileList([fileList[1]]) : setFileList(fileList)

    if (fileList[0] && 'originFileObj' in fileList[0]) {
      setImage(await getBase64(fileList[0].originFileObj))
    }
  }

  return (
    <Spin spinning={loading} size="large">
      <div className="box-certificate-user" style={{ marginBottom: 40 }}>
        <div className="row-btn-right-header">
          <button
            className="style-btn-add-cer"
            onClick={() => setIsModalVisible(!isModalVisible)}
          >
            <PlusOutlined />
            <span>Thêm chứng chỉ khác</span>
          </button>
        </div>
        <div className="box-list-item-cer">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div className="item-cer" key={index}>
                <div className="box-image-left">
                  <div
                    className="icon-download"
                    onClick={() => {
                      if (item.type !== 2) {
                        setSelected({
                          courseId: item.course_id,
                          userId: item.user_id,
                        })
                        setIsModalDisplayVisible(true)
                      } else {
                        const link = document.createElement('a')
                        link.download = `image-${index}.png`
                        link.href = document.getElementById(
                          `image-${index}`
                        ).src
                        link.target = '_blank'
                        link.click()
                      }
                    }}
                  >
                    <DownloadOutlined />
                  </div>
                  <img
                    src={
                      item.type !== 2
                        ? chungchi
                        : EX_CERTIFICATE_PATH + item.id + '.webp'
                    }
                    id={`image-${index}`}
                    className="style-image-left"
                  />
                </div>
                <div className="box-content-right">
                  <div className="title-1">{item.title}</div>
                  {/* <div className="soccer-1">
                        <img className="icon-cer" src={null} /> Điểm số:{' '}
                        <b>85/100</b>
                      </div> 
                      */}
                  <div className="date-create-1">
                    <ClockCircleOutlined
                      style={{ alignSelf: 'center', marginRight: 8 }}
                    />
                    Đã đạt được vào:{' '}
                    <b>{moment(item.release_date).format('DD/MM/YYYY')}</b>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoData />
          )}
        </div>
        {data.length > 0 && (
          <div className="btn-load-more-expert">
            <button onClick={fetchData}>Xem thêm</button>
          </div>
        )}
      </div>
      <Modal
        footer={false}
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="box-modal-upload-certificate">
          <div className="title-header-certificate">Thêm chứng chỉ đã có</div>
          <div className="form-upload-certificate">
            <Form onFinish={onFinish}>
              <label className="label-input-certificate">
                Nhập tên chứng chỉ
              </label>
              <Form.Item label="" name="name">
                <Input className="input-text-certificate" />
              </Form.Item>
              <label className="label-input-certificate">
                Ngày được cấp chứng chỉ *
              </label>
              <Form.Item label="" name="datetime">
                <DatePicker
                  className="date-input-certificate"
                  placeholder="dd/mm/yyyy"
                  {...date}
                />
              </Form.Item>
              <div className="input-file-submit">
                <Upload
                  action={''}
                  accept="image/*"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChangeAvatar}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Hình ảnh chứng chỉ</div>
                  </div>
                </Upload>
              </div>
              {/* <div className="input-file-submit">
              <input type="file" className="input-file-certificate" name="file-cer" />
              <label className="label-file-input">Tải lên chứng chỉ</label>
            </div> */}
              <div className="row-footer-btn-submit">
                <button type="submit" className="btn-submit-modal-certificate">
                  Hoàn tất
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
      <DisplayCertificate
        isModalVisible={isModalDisplayVisible}
        setIsModalVisible={setIsModalDisplayVisible}
        selectedCertificate={selected}
      />
    </Spin>
  )
}

export default React.memo(MyCertificate)

const DisplayCertificate = ({
  isModalVisible,
  setIsModalVisible,
  selectedCertificate,
}) => {
  const [loading, setLoading] = useState(false)
  const [certificate, setCertificate] = useState(null)

  useEffect(() => {
    certificate && renderCertificate(1)
  }, [certificate])

  useEffect(() => {
    if (selectedCertificate && document.getElementById('canvas')) {
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
      setLoading(true)
      axios
        .post('admin/courses/certificate-info', {
          user_id: selectedCertificate.userId,
          course_id: selectedCertificate.courseId,
        })
        .then((res) => {
          return res.data
        })
        .then((data) => {
          if (data.status === 200) {
            setCertificate(data.data)
          } else {
            setLoading(false)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [selectedCertificate])

  const renderCertificate = (seq) => {
    if (certificate && document.getElementById('canvas')) {
      addTextToImage(chungchi)
    }
  }

  const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    var cars = text.split('\n')

    for (var ii = 0; ii < cars.length; ii++) {
      var line = ''
      var words = cars[ii].split(' ')

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' '
        var metrics = context.measureText(testLine)
        var testWidth = metrics.width

        if (testWidth > maxWidth) {
          context.fillText(line, x, y)
          line = words[n] + ' '
          y += lineHeight
        } else {
          line = testLine
        }
      }

      context.fillText(line, x, y)
      y += lineHeight
    }
  }

  const addTextToImage = (imagePath) => {
    const circle_canvas = document.getElementById('canvas')
    const context = circle_canvas.getContext('2d')
    const contextDOB = circle_canvas.getContext('2d')
    const contextClass = circle_canvas.getContext('2d')
    const contextTimeFrom = circle_canvas.getContext('2d')
    const contextTimeTo = circle_canvas.getContext('2d')
    const contextID = circle_canvas.getContext('2d')
    const contextReleaseDate = circle_canvas.getContext('2d')
    const contextCourseName = circle_canvas.getContext('2d')
    const contextCourseNameEN = circle_canvas.getContext('2d')

    const svgElement = document.getElementById('qr-code')
    let clonedSvgElement = svgElement.cloneNode(true)
    let outerHTML = clonedSvgElement.outerHTML
    const blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' })
    let URL = window.URL || window.webkitURL || window
    let blobURL = URL.createObjectURL(blob)

    // Draw Image function
    const imrqr = new Image()
    imrqr.src = blobURL
    imrqr.onload = () => {
      context.drawImage(imrqr, 460, 455)
    }

    // Draw Image function
    const img = new Image()
    img.src = imagePath
    img.onload = () => {
      context.drawImage(img, 0, 0)
      context.fillStyle = '#000'
      context.textAlign = 'center'
      context.font = '700 37px Time New Roman'
      context.fillText(
        certificate.first_name + ' ' + certificate.last_name,
        410,
        275
      )

      contextDOB.fillStyle = '#000'
      contextDOB.textAlign = 'left'
      contextDOB.font = '12px Time New Roman'
      contextDOB.fillText(
        moment(certificate.birthday).format('DD/MM/YYYY'),
        432,
        299
      )

      contextClass.fillStyle = '#000'
      contextClass.font = '12px Time New Roman'
      contextClass.fillText(certificate.cert_class || '', 150, 465)

      contextTimeFrom.fillStyle = '#000'
      contextTimeFrom.font = '12px Time New Roman'
      contextTimeFrom.fillText(certificate.cert_time_from || '', 130, 480)

      contextTimeTo.fillStyle = '#000'
      contextTimeTo.font = '12px Time New Roman'
      contextTimeTo.fillText(certificate.cert_time_to || '', 130, 493)

      contextID.fillStyle = '#000'
      contextID.font = '12px Time New Roman'
      contextID.fillText(certificate.cert_id || '', 140, 507)

      contextCourseName.fillStyle = '#000'
      contextCourseName.textAlign = 'center'
      contextCourseName.font = '700 24px Time New Roman'
      wrapText(contextCourseName, certificate.title, 420, 355, 700, 28)

      contextCourseNameEN.fillStyle = '#000'
      contextCourseNameEN.textAlign = 'center'
      contextCourseNameEN.font = '700 24px Time New Roman'
      wrapText(
        contextCourseNameEN,
        certificate.cert_title || '',
        420,
        410,
        700,
        28
      )

      contextReleaseDate.fillStyle = '#000'
      contextReleaseDate.font = '14px Time New Roman'
      contextReleaseDate.fillText(
        moment(certificate.release_date || null).format('DD/MM/YYYY'),
        735,
        532
      )
    }
  }

  const downloadCertificate = () => {
    const link = document.createElement('a')
    link.download = 'filename.png'
    link.href = document.getElementById('canvas').toDataURL()
    link.click()
  }

  return (
    <Modal
      footer={false}
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
      width={900}
    >
      <div className="box-modal-upload-certificate">
        <div className="title-header-certificate">Chứng chỉ của bạn</div>
        <Spin spinning={loading}>
          <canvas
            id="canvas"
            width="840.48"
            height="592.56"
            style={{ margin: '0 auto', display: 'flex' }}
          ></canvas>
          {selectedCertificate && (
            <div style={{ display: 'none' }}>
              <QRCode
                value={`https://smarte.edu.vn/profile/${_user.id}/certificates?p=${selectedCertificate.courseId}`}
                size={80}
                id="qr-code"
                bgColor="#ffe9b6"
              />
            </div>
          )}
        </Spin>
        <br />
        <div className="form-upload-certificate">
          <div className="row-footer-btn-submit">
            <button
              className="btn-submit-modal-certificate"
              onClick={downloadCertificate}
            >
              Tải xuống
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
