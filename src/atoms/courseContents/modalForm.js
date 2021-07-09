import styled from 'styled-components'

export default styled.div`
padding: 50px;
.form-wrapper .title {
  font-weight: bold;
  font-size: 32px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #091230;
}
form .ifa-form-control:first-child {
  margin-top: 30px;
}
form .ifa-form-control {
  margin-top: 20px;
}
form .ifa-form-control .label {
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #696f79;
}
form .ifa-form-control .input-group {
  margin-top: 14px;
}
form .ifa-form-control .input-group input,
form .ifa-form-control .input-group textarea,
form .ifa-form-control button {
  border: 1px solid #c2c7d8;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  padding: 14px 18px;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  letter-spacing: 0.01em;
  width: 100%;
}
form .ifa-form-control .input-group textarea {
  height: 105px;
}
form .ifa-form-control button {
  font-size: 18px;
  color: #fff;
  background-color: #0b46a9;
}
`