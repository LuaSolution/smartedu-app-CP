import React from 'react'
import knowledgeHover from 'atoms/home/knowledgeHover.svg'
import styled from 'styled-components'

export default ({ item }) =>
  <Method className="method-box-item" icon={item.icon}>
    <div className="icon"></div>
    <p className="title t-css">{item.title}</p>
    <p className="sub-title">{item.subTitle}</p>
    <p className="content">{item.content}</p>
  </Method>

const Method = styled.div`
  background-color: #fff;
  padding: 50px 20px 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  .title {
    margin: 20px 0 5px 0;
    font-weight: 450;
    font-size: 20px;
    line-height: 26px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .sub-title {
    font-weight: 450;
    font-size: 16px;
    line-height: 20.8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }
  .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 20px;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
  }
  .icon {
    background-image: url(${props => props.icon});
    width: 56px;
    height: 56px;
    background-repeat: no-repeat;
  }
  &:hover {
    background-color: #cc001b;
    color: #fff;
  }
`
