import React from 'react'
import styled from 'styled-components'
import brief from 'atoms/home/brief.svg'

const ItemImageBlock = styled.div`
&:after{
  background: linear-gradient(180deg, rgba(6, 12, 22, 0) 36.98%, #0D1F3E 100%);
}

`

const Title = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-weight: 700;
  font-size: 24px;
  line-height: 33.6px;
  z-index: 1;
`


const WhyItem = ({ item }) =>
  <div className="item ifa-item">
    <ItemImageBlock className='item-img-block'>
      <img src={item.img} alt="video" />
      <Title className="t-css">{item.title}</Title>
    </ItemImageBlock>
    <div className="item-content-block-wrapper">
      <div className="item-content-block">{item.content}</div>
    </div>
  </div>

export default WhyItem
