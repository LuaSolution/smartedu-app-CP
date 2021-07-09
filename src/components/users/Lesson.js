import React from 'react'
import styled from 'styled-components'
import downIntro from 'atoms/course-details/downIntro.svg'
import upIntro from 'atoms/course-details/upIntro.svg'

const Lesson = ({ item }) => {
  const showHide = (e) => {
    e.preventDefault()
    e.target.parentElement.classList.toggle('active')
  }

  return <Wrapper className={item.isActive ? 'active' : ''}>
    <Header className="lesson-header" onClick={(e) => showHide(e)}>
      {item.title}
    </Header>
    <ListContent className="list-content">
      {item.list.map((i, index) => (
        <p key={index}>
          {index + 1}. {i.name}
        </p>
      ))}
    </ListContent>
  </Wrapper>
}

export default Lesson

const Wrapper = styled.div`
  margin-top: 16px;
  border: 1px solid #eee;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  &:first-child {
    margin-top: 24px;
  }
  &.active .lesson-header {
    -webkit-border-radius: unset;
    -moz-border-radius: unset;
    border-radius: unset;
    -webkit-border-top-left-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    -moz-border-radius-topleft: 10px;
    -moz-border-radius-topright: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-image: url(${downIntro});
  }
  &.active .list-content {
    display: block;
  }
`
const Header = styled.div`
  padding-left: 46px;
  height: 50px;
  font-weight: 600;
  font-size: 18px;
  line-height: 50px;
  letter-spacing: 0.01em;
  color: #091230;
  background-image: url(${upIntro});
  background-size: 24px;
  background-position: left 16px center;
  background-repeat: no-repeat;
  background-color: #f7f7f7;
  cursor: pointer;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  @media only screen and (max-width: 992px) {
    font-size: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }
`
const ListContent = styled.div`
  display: none;
  p {
    padding: 12.5px 46px;
    height: 50px;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  p:last-child {
    border-bottom: none;
  }
  @media only screen and (max-width: 992px) {
    p {
      padding: 12.5px 20px;
      height: auto;
      font-size: 15px;
    }
  }
`
