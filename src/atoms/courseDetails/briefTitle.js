import styled from 'styled-components'

export default styled.div`
font-weight: bold;
font-size: 24px;
line-height: 130%;
letter-spacing: 0.01em;
color: #fff;
margin-top: 10px;
margin-bottom: 24px;
word-break: break-all;

@media only screen and (max-width: 1270px) {
  font-size: 15px;
}
@media only screen and (max-width: 1180px) {
  font-size: 13px;
  width: 90%;
}
@media only screen and (max-width: 992px) {
  font-size: 12px;
}
`