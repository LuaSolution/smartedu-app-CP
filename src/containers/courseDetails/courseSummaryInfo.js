import React, { useEffect, useState } from 'react'
import {
  CourseDetailsPriceBlock as PriceBlock,
  CourseDetailsInfoWrapper as Wrapper,
  CourseDetailsListButton as ListButton,
  CourseDetailsListInfo as ListInfo,
} from 'atoms'
import { Link } from 'react-router-dom'
import { toCurrency } from 'helpers/Utils'
import { message, Modal, Result } from 'antd'
import axios from 'helpers/axios'

const { confirm, success } = Modal

const CourseSumaryInfo = ({
  linkToContent,
  item,
  totalLesson,
  isBought,
  mentorName,
}) => {
  const [bought, setBought] = useState(false)
  const [inCart, setCart] = useState(false)

  useEffect(() => {
    const cartList = JSON.parse(localStorage.getItem('@cart')) || []
    console.log(cartList)
    if (cartList.findIndex((i) => i.id === item.id) !== -1) {
      setCart(true)
    }
  }, [item.id])

  useEffect(() => {
    setBought(isBought)
  }, [isBought])

  const calcSellPercent = (old_price, new_price) => {
    return 100 - Math.round((new_price / old_price) * 100)
  }

  const renderPrice = () => {
    if (item.new_price > 0 && item.old_price > 0) {
      return (
        <>
          <div className="discount-price">{toCurrency(item.new_price)}</div>
          <div className="origin-price">{toCurrency(item.old_price)}</div>
          <div className="percent">
            tiết kiệm {calcSellPercent(item.old_price, item.new_price) + '%'}
          </div>
        </>
      )
    } else if (item.new_price === 0 && item.old_price === 0) {
      return <div className="discount-price">Được tài trợ</div>
    } else {
      return <div className="discount-price">{toCurrency(item.old_price)}</div>
    }
  }

  const add2Cart = () => {
    let cartList = JSON.parse(localStorage.getItem('@cart')) || []
    cartList = [
      {
        id: item.id,
        slug: item.slug,
        name: item.title,
        mentor: mentorName,
        new_price: item.new_price,
        old_price: item.old_price,
      },
      ...cartList,
    ]
    localStorage.setItem('@cart', JSON.stringify(cartList))
    message.success('Đã thêm vào giỏ hàng')
    setCart(true)
  }

  const successPayment = () => {
    axios.get('courses/add-user/' + item.id).then((res) => {
      if (res.data.status === 200) {
        setBought(true)
        success({
          icon: null,
          content: (
            <Result
              status="success"
              title="Bạn đã đăng ký khóa học thành công!"
              // subTitle="Mã đơn hàng: 2017182818828182881."
            />
          ),
        })
      }
    })
  }

  const buyCourse = () => {
    confirm({
      title: 'Xác nhận đăng ký khóa học để bắt đầu học tập',
      onOk() {
        successPayment()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <Wrapper>
      {item && (
        <>
          {bought ? (
            <ListButton>
              <button className="add-cart">
                <Link to={linkToContent}>Học ngay</Link>
              </button>
            </ListButton>
          ) : (
            item.public_for_all && (
              <>
                <PriceBlock>{renderPrice()}</PriceBlock>
                <ListButton>
                  {!inCart && (
                    <button className="add-cart" onClick={add2Cart}>
                      Thêm vào giỏ hàng
                    </button>
                  )}
                  {/* <button className="buy-now" onClick={buyCourse}>
                    Đăng ký học
                  </button> */}
                </ListButton>
              </>
            )
          )}

          <ListInfo>
            {totalLesson !== null && (
              <div className="total-lesson">
                Khóa học gồm<span> {totalLesson} bài giảng</span>
              </div>
            )}
            {/* <div className="lifetime">
          Sở hữu khóa học<span> trọn đời</span>
        </div> */}
            <div className="certificate">
              Cấp<span> chứng chỉ hoàn thành</span>
            </div>
            {item.is_offline ? (
              <div className="method">Học online kết hợp học tại lớp</div>
            ) : (
              <div className="type">Học online toàn phần</div>
            )}
            {/* <div className="point">
            Nhận <span>{item.point} điểm</span> thưởng
          </div> */}
          </ListInfo>
        </>
      )}
    </Wrapper>
  )
}

export default CourseSumaryInfo
