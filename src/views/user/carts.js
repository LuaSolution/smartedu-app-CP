import React, { useEffect, useState } from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import { Button, Popconfirm, Alert, message } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { NoData } from 'atoms'
import { toCurrency } from 'helpers/Utils'
import { COURSES_PATH } from 'defines'
import Modal from 'react-bootstrap/Modal'
import useFormInput from 'helpers/useFormInput'
import wrong from 'atoms/home/wrong.svg'
import 'assets/user/carts.css'
import 'assets/user/ifa-home.css'
import 'assets/user/ifa-form.css'
import axios from 'helpers/axios'
const rand = Math.random()

const CartList = () => {
  const [list, setList] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    const cartList = JSON.parse(localStorage.getItem('@cart'))
    if (cartList) {
      setList(cartList)
    }
  }, [])

  const removeFromCarts = (id) => {
    let cartList = JSON.parse(localStorage.getItem('@cart'))
    cartList = cartList.filter((i) => i.id !== id)
    localStorage.setItem('@cart', JSON.stringify(cartList))
    setList(cartList)
  }

  const flushCarts = () => {
    localStorage.setItem('@cart', JSON.stringify([]))
    setList([])
  }

  const handleClose = () => setShow(false)
  const payment = () => {
    setShow(true)
  }

  return (
    <>
      <UserHeaderLayout />
      <div className="box-cart-course container">
        <div className="header-cart-course">
          <span>{(list && list.length) || 0}</span> khóa học trong giỏ hàng
        </div>
        <div className="box-body-cart">
          {list && list.length > 0 ? (
            <>
              <div className="box-list-items-cart">
                {list.map((item, index) => {
                  return (
                    <div className="item-cart" key={index}>
                      <div className="col-1-img-style">
                        <img src={COURSES_PATH + item.id + '.webp?' + rand} />
                      </div>
                      <div className="col-2-info-name">
                        <div className="name-course">
                          <a href={'/course-details/' + item.slug || item.id}>
                            {item.name}
                          </a>
                        </div>
                        <div className="teacher">
                          Giảng viên: <span>{item.mentor}</span>
                        </div>
                      </div>
                      <div className="col-3-action">
                        <Popconfirm
                          title="Bạn có muốn xóa khóa học khỏi giỏ hàng?"
                          onConfirm={() => removeFromCarts(item.id)}
                          okText="Xóa"
                          cancelText="Không"
                        >
                          <Button type="text">
                            <DeleteFilled
                              style={{ fontSize: 18, color: '#676E86' }}
                            />
                          </Button>
                        </Popconfirm>

                        {/* <Button danger type="text">
                          <HeartFilled
                            style={{ fontSize: 24, color: '#ff0000' }}
                          />
                        </Button> */}
                      </div>
                      <div className="col-4-price">
                        {item.new_price > 0 ? (
                          <>
                            <div className="new-price">
                              {toCurrency(item.new_price)}
                            </div>
                            <div className="old-price">
                              {toCurrency(item.old_price)}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="new-price">
                              {toCurrency(item.old_price)}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="box-total-price">
                <div className="title-total">
                  Tổng cộng:{' '}
                  {toCurrency(
                    list.reduce((accumulator, currentValue) => {
                      if (currentValue.new_price > 0) {
                        return accumulator + currentValue.new_price
                      } else {
                        return accumulator + currentValue.old_price
                      }
                    }, 0)
                  )}
                </div>
                {/* <div className="title-total">
                  Giảm giá:{' '}
                  {toCurrency(
                    list.reduce(
                      (accumulator, currentValue) =>
                        accumulator +
                        (currentValue.old_price - currentValue.new_price),
                      0
                    )
                  )}
                </div> */}
                <div className="title-total">Thành tiền:</div>
                <div className="total-price">
                  {toCurrency(
                    list.reduce((accumulator, currentValue) => {
                      if (currentValue.new_price > 0) {
                        return accumulator + currentValue.new_price
                      } else {
                        return accumulator + currentValue.old_price
                      }
                    }, 0)
                  )}
                </div>
                <button onClick={payment}>Thanh toán</button>
              </div>
            </>
          ) : (
            <div style={{ width: '100%', margin: 20 }}>
              <NoData title="Giỏ hàng trống" />
            </div>
          )}
        </div>
        {/* <div className="btn-chon-them-KH">
          <button> Chọn thêm khóa học</button>
        </div> */}
      </div>
      <ModalPayment
        show={show}
        handleClose={handleClose}
        cartList={list}
        flushCarts={flushCarts}
      />
      <UserFooterLayout />
    </>
  )
}

export default CartList

const ModalPayment = ({ show, handleClose, cartList, flushCarts }) => {
  const [_err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const name = useFormInput()
  const phone = useFormInput()
  const email = useFormInput()
  const content = useFormInput()

  const submitConsulting = (e) => {
    e.preventDefault()
    if (name.value === '' || phone.value === '' || email.value === '') {
      setErr(true)
    } else {
      setLoading(true)
      const carts = cartList.map((i) => {
        return i.id
      })
      axios
        .post('payment/send-payment-form', {
          name: name.value,
          phone: phone.value,
          email: email.value,
          content: content.value,
          carts,
        })
        .then((res) => {
          if (res.data.status === 200) {
            flushCarts()
            setErr(false)
            message.success('Đơn hàng đã được gửi đi thành công !')
            handleClose()
          }
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <Modal show={show} onHide={handleClose} className="ifa-modal">
      <Modal.Body>
        <button
          className="ifa-popup-close-btn"
          onClick={handleClose}
          style={{ backgroundImage: `url(${wrong})` }}
        ></button>
        <div className="form-page">
          <div className="form-wrapper">
            <p className="title">Gửi thông tin giỏ hàng cho SmartEdu</p>
            <p className="sub-title">
              Chúng tôi sẵn sàng tư vấn, hoàn toàn miễn phí
            </p>
            {_err && (
              <Alert
                message="Vui lòng nhập đầy đủ thông tin"
                type="error"
                showIcon
              />
            )}
            <form onSubmit={submitConsulting}>
              <div className="ifa-form-control">
                <p className="label">Họ tên*</p>
                <div className="input-group">
                  <input {...name} placeholder="Nhập họ và tên" />
                </div>
              </div>
              <div className="ifa-form-control">
                <p className="label">Số điện thoại*</p>
                <div className="input-group">
                  <input {...phone} placeholder="Nhập số điện thoại" />
                </div>
              </div>
              <div className="ifa-form-control">
                <p className="label">Email*</p>
                <div className="input-group">
                  <input {...email} placeholder="Nhập email của bạn" />
                </div>
              </div>
              <div className="ifa-form-control ifa-form-control-no-title">
                <div className="input-group">
                  <textarea placeholder="Ghi chú thêm (nếu có)" {...content} />
                </div>
              </div>
              <div className="ifa-submit-btn">
                <input type="submit" value="Gửi thông tin" />
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
