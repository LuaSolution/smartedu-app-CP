import React, { memo } from 'react'
import stars from 'atoms/course-contents/stars.svg'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'

export default memo(({ modal, closeModal, content = null, customBtn = null }) => {
    return <CustomModal
        show={modal}
        onHide={closeModal}
        animation={true}
        centered
        size="lg"
    >
        <Modal.Body>
            <i className="icon-complete" />
            {content && <h3 className="title">{content}</h3>}
            {customBtn || null}
        </Modal.Body>
    </CustomModal>
})

const CustomModal = styled(Modal)`
  .modal-content {
    border:none;
    border-radius: 20px;
  }
  .modal-body {
    padding: 64px 14px;
    max-width: 770px;
    text-align: center;
    @media only screen and (min-width: 992px) {
      padding: 60px;
    }
    .icon-complete {
      display: block;
      width: 146px;
      height: 142px;
      background: linear-gradient(#ffc444 1.87%, #f36f56 199.91%);
      mask-image: url(${stars});
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      margin: 0 auto;
    }
    .title {
      margin: 40px -10px 0;
      margin-bottom: 0;
      color: #193769;
      letter-spacing: 0.01em;
      font-size: 22px;
      font-weight: bold;
      line-height: 130%;
      @media only screen and (min-width: 992px) {
        font-size: 32px;
      }
    }
  }
`