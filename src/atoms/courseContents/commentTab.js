import styled from 'styled-components'
import down from 'atoms/course-contents/down.svg'
import upOldMessage from 'atoms/course-contents/upOldMessage.svg'

export default styled.div`
  display: none;
  padding: 50px 190px;
  box-shadow: 2px 6px 30px rgba(78, 82, 92, 0.1);
  position: relative;
  &.active {
    display: block;
  }
  .comment-wrapper {
    margin-top: 20px;
  }
  &.qa-id {
    margin-top: 30px;
  }
  &.qa-id:first-child {
    margin-top: 0;
  }
  .comment-wrapper.first-item {
    margin-top: 0;
  }
  .comment-wrapper .comment-top {
    padding: 20px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background-color: #f7f7f7;
    border: 1px solid #eee;
  }
  .comment-wrapper .comment-top .user-info {
    padding-left: 76px;
    position: relative;
    height: 60px;
  }
  .comment-wrapper .comment-top .user-info .avatar,
  .comment-wrapper .comment-bottom .reply .reply-avatar {
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-color: #fff;
    background-position: center;
    width: 60px;
    height: 60px;
    background-size: 60px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid #eee;
  }
  .comment-wrapper .comment-top .user-info .name {
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0.01em;
    color: #193769;
  }
  .comment-wrapper .comment-top .user-info .date {
    font-weight: normal;
    font-size: 14px;
    line-height: 30px;
    letter-spacing: 0.01em;
    color: #676e86;
  }
  .comment-wrapper .comment-top .comment-title {
    font-weight: bold;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0.01em;
    color: #091230;
    margin-top: 24px;
  }
  .comment-wrapper .comment-top .comment-content {
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #676e86;
    margin-top: 12px;
  }
  .comment-wrapper .comment-bottom {
    margin-top: 20px;
  }
  .comment-wrapper .comment-bottom .reply {
    padding-left: 70px;
    position: relative;
    margin-top: 20px;
    margin-left: 50px;
    min-height: 60px;
  }
  .comment-wrapper .comment-bottom .reply:first-child {
    margin-top: 0;
  }
  .comment-wrapper .comment-bottom .reply .reply-body {
    padding: 13px 15px;
    background-color: #f7f7f7;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  .comment-wrapper .comment-bottom .reply .reply-body .reply-name {
    font-weight: bold;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #193769;
  }
  .comment-wrapper .comment-bottom .reply .reply-body .reply-date {
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #676e86;
    margin-top: 6px;
  }
  .comment-wrapper .comment-bottom .reply .reply-body .reply-content {
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #676e86;
    margin-top: 10px;
  }
  .comment-wrapper .comment-bottom .reply .my-reply input {
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #363e57;
    padding: 13px 15px;
    border: 1px solid #eee;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  .ask-question {
    position: absolute;
    top: 60px;
    right: 50px;
    display: block;
    width: 110px;
    height: 40px;
    background-color: #0b46a9;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 16px;
    line-height: 40px;
    letter-spacing: 0.01em;
    color: #ffffff;
    text-align: center;
  }
  .show-more-reply {
    display: block;
    text-align: right;
    padding: 12.5px 8px;
    padding-right: 34px;
    background-image: url(${down});
    background-size: 24px;
    background-position: right 0 center;
    background-repeat: no-repeat;
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #4063e0;
    margin-top: 20px;
  }
  .old-question {
    display: block;
    width: 250px;
    margin: auto;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #676e86;
    margin-bottom: 10px;
    background-image: url(${upOldMessage});
    background-size: 24px 24px;
    background-position: right 0 center;
    background-repeat: no-repeat;
  }
`