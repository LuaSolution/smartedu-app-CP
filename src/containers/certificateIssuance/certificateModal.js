import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { Carousel, DatePicker, Popconfirm, Spin } from 'antd'
import IntlMessages from 'helpers/IntlMessages'
import chungchi from 'assets/mau-chung-chi-cp.png'
import chungchi2 from 'assets/mau-chung-chi-SE.png'
import moment from 'moment'
import Tour from 'reactour'
import axios from 'helpers/axios'
import QRCode from 'react-qr-code'

const steps = [
  {
    selector: '.first-step',
    content: 'Vui lòng chọn mẫu chứng chỉ',
  },
  {
    selector: '.second-step',
    content: 'Thay đổi ngày cấp chứng chỉ',
  },
]

const CertificateModal = ({
  certificateModal,
  setCertificateModal,
  userId,
  courseId,
}) => {
  const [seq, setSeq] = useState(1)
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(false)
  const [isTourOpen, setIsTourOpen] = useState(true)
  const [releaseDate, setReleaseDate] = useState(moment().format('DD/MM/YYYY'))
  const [certificate, setCertificate] = useState({
    first_name: 'Nguyễn',
    last_name: 'Duy',
    birthday: '09/09/1994',
    cert_class: 'SD1',
    cert_time_from: '09/09/1994',
    cert_time_to: '09/09/1994',
    cert_id: 'CER001',
    title: 'kỹ năng giao tiếp bán hàng',
    cert_title:
      'kỹ năng giao tiếp bán hàng và tạo động lực cho nhân viên phần 2 kỹ năng giao tiếp bán hàng',
  })

  useEffect(() => {
    if (userId && courseId) {
      setLoading(true)
      axios
        .post('admin/courses/certificate-info', {
          user_id: userId,
          course_id: courseId,
        })
        .then((res) => {
          return res.data
        })
        .then((data) => {
          if (data.status === 200) {
            setCertificate(data.data)
            if (data.data.release_date) {
              setActive(true)
            }
          }
        })
        .finally(() => setLoading(false))
    }
  }, [userId, courseId])

  useEffect(() => {
    renderCertificate(seq)
  }, [releaseDate])

  const closeModal = () => setCertificateModal(false)

  const renderCertificate = (seq) => {
    if (document.getElementById('canvas')) {
      if (seq === 1) addTextToImage(chungchi)
      else if (seq === 2) addTextToImage(chungchi2)
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
      contextReleaseDate.fillText(releaseDate, 735, 532)
    }
  }

  const downloadCertificate = () => {
    const link = document.createElement('a')
    link.download = 'filename.png'
    link.href = document.getElementById('canvas').toDataURL()
    link.click()
  }

  const changeReleaseDate = (date, dateString) => {
    setReleaseDate(moment(dateString).format('DD/MM/YYYY'))
  }

  const releaseCertificate = () => {
    if (releaseDate) {
      setLoading(true)
      axios
        .post('admin/courses/release-certificate', {
          user_id: userId,
          course_id: courseId,
          release_date: moment(releaseDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        })
        .then((res) => {
          return res.data
        })
        .then((data) => {
          if (data.status === 200) {
            console.log(1)
          }
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <Modal
      isOpen={certificateModal}
      toggle={closeModal}
      backdrop="static"
      style={{ maxWidth: 1000 }}
    >
      <ModalHeader>Cấp phát chứng chỉ</ModalHeader>
      <ModalBody style={{ overflow: 'auto' }} className="scrollbar">
        <Spin spinning={loading}>
          <Tour
            steps={steps}
            isOpen={isTourOpen}
            onRequestClose={() => setIsTourOpen(false)}
          />
          <Carousel className="first-step">
            <div>
              <img
                src={chungchi}
                style={{
                  margin: '0 auto',
                  height: 200,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSeq(1)
                  setIsTourOpen(false)
                  renderCertificate(1)
                }}
              />
            </div>
            <div>
              <img
                src={chungchi2}
                style={{
                  margin: '0 auto',
                  height: 200,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSeq(2)
                  setIsTourOpen(false)
                  renderCertificate(2)
                }}
              />
            </div>
          </Carousel>
          <canvas
            id="canvas"
            width="840.48"
            height="592.56"
            style={{ margin: '0 auto', display: 'flex' }}
          ></canvas>
          <div style={{ display: 'none' }}>
            <QRCode
              value={`https://smarte.edu.vn/profile/${userId}/certificates?p=${courseId}`}
              size={80}
              id="qr-code"
              bgColor="#ffe9b6"
            />
          </div>
        </Spin>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={closeModal}>
          <IntlMessages id="user.cancel" />
        </Button>
        <Button color="danger" onClick={downloadCertificate}>
          Tải chứng chỉ
        </Button>
        {!active && (
          <>
            <DatePicker
              className="second-step"
              onChange={changeReleaseDate}
              placeholder="Chọn ngày cấp chứng chỉ"
            />
            <Popconfirm
              title="Xác nhận cấp chứng chỉ cho học viên?"
              onConfirm={releaseCertificate}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button color="primary">Cấp chứng chỉ</Button>
            </Popconfirm>
          </>
        )}
      </ModalFooter>
    </Modal>
  )
}

export default CertificateModal
