import React, { memo } from 'react'
import styled from 'styled-components'
import { Progress } from 'antd'

export default memo(({ index, question, percentage = null, children }) =>
  <QuestionStyle>
    <div className="main">
      <div className="header">
        <div className="header__content">
          <div className="header__label">
            Câu hỏi {index}:
               {percentage && <div className="header__progress-bar">
              <Progress type="circle" strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
                percent={percentage} />
            </div>}
          </div>
          <span className="header__question">
          <div dangerouslySetInnerHTML={{ __html: question }} style={{ margin: 0 }} />
          </span>
        </div>
      </div>
      <div className="body">{children}</div>
    </div>
  </QuestionStyle>
)

const QuestionStyle = styled.div`
  position: relative;
  .main {
    padding: 24px 15px;
    margin: 0 auto;
    background: #ffffff;
  }
  .header {
    position: relative;
    display: flex;
    &__content {
      position: relative;
      width: 100%;
    }
    &__label {
      padding-right: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      line-height: 140%;
      color: #676e86;
      letter-spacing: 0.01em;
      @media only screen and (min-width: 992px) {
        padding-right: 0;
        font-size: 20px;
      }
    }
    &__progress-bar {
      width: 55.88px;
      .CircularProgressbar {
        .CircularProgressbar-path {
          stroke: #00bf2a;
        }
        .CircularProgressbar-text {
          fill: #676e86;
          font-size: 14px;
        }
      }
      @media only screen and (min-width: 992px) {
        position: absolute;
        width: 114.5px;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        .CircularProgressbar {
          .CircularProgressbar-text {
            font-size: 20px;
          }
        }
      }
    }
    &__question {
      margin-top: 16px;
      margin-bottom: 0;
      font-weight: bold;
      font-size: 16px;
      line-height: 130%;
      letter-spacing: 0.01em;
      color: #0b46a9;
      width: 100%;
      @media only screen and (min-width: 992px) {
        margin-top: 4px;
        font-size: 18px;
      }
    }
  }
  .body {
    margin-top: 24px;
    .mapping-container {
      display: flex;
      justify-content: space-between;
      @media only screen and (min-width: 992px) {
        padding-left: 72px;
        padding-right: 66px;
      }
      .mapping-item {
        padding: 8px 4px 8px 8px;
        width: 131px;
        text-align: center;
        background: #e1e5f1;
        border: 1px solid #b8bec8;
        border-radius: 10px;
        font-size: 16px;
        letter-spacing: 0.01em;
        color: #000000;
        &:not(:first-child) {
          margin-top: 26px;
        }
        @media only screen and (min-width: 992px) {
          padding: 25px 20px;
          width: 270px;
          text-align: left;
          font-size: 20px;
          &:not(:first-child) {
            margin-top: 20px;
          }
        }
      }
      @media only screen and (min-width: 992px) {
        margin-top: 80px;
        padding: 0 20px;
      }
    }
  }
`