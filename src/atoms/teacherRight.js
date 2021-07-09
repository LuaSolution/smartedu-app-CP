import styled from 'styled-components'

export default styled.div`
float: left;
margin-left: 34px;
padding: 20px;
width: calc(100% - 270px);
.topic-wrapper {
  margin-top: 24px;
}
.topic-wrapper:first-child {
  margin-top: 0;
}
.topic-wrapper .topic-header {
  font-weight: bold;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #193769;
}
.topic-wrapper .topic-content p {
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #363e57;
  padding-left: 11px;
  margin-top: 10px;
  position: relative;
}
.topic-wrapper .topic-content p::before {
  content: '';
  background: #193769;
  width: 5px;
  height: 5px;
  position: absolute;
  top: 8px;
  left: 0;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
@media only screen and (max-width: 992px) {
  float: none;
  width: 100%;
  margin-left: 0;
  padding: 0;
  margin-top: 20px;
}
`
