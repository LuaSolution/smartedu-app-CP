import React, { memo } from 'react'
import styled from 'styled-components'

export default memo(({ content, ...inputProps }) =>
  <RadioStyle>
    <input type="radio" {...inputProps} hidden/>
    <div className="content">
      {content}
      <span className="indicator" />
    </div>
  </RadioStyle>
)

const RadioStyle = styled.label`
cursor:pointer;
  width: 100%;
  &:not(:first-child) {
    margin-top: 20px;
  }
  &:hover {
    > .content {
      .indicator {
        background-color: unset;
        border: 2px solid #0b46a9;
      }
    }
  }
  > .content {
    position: relative;
    display: flex;
    align-items: center;
    padding: 17px 20px;
    background: #ffffff;
    border: 1px solid #676e86;
    border-radius: 10px;
    color: #091230;
    font-size: 16px;
    line-height: 140%;
    @media only screen and (min-width: 992px) {
      font-size: 20px;
    }
  }
  .indicator {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    background-color: #f7f7f7;
    border: 2px solid #b8bec8;
    border-radius: 50%;
    right: 20px;
  }
  input:checked + .content {
    color: #0b46a9;
    font-weight: bold;
    .indicator {
      background-color: unset;
      border: 2px solid #0b46a9;
      &::before {
        background-color: #0b46a9;
        border: 2px solid #0b46a9;
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
  }
`