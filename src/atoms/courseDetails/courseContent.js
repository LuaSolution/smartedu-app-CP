import styled from 'styled-components'

export default styled.div`
font-weight: 600;
font-size: 18px;
line-height: 150%;
letter-spacing: 0.01em;
color: #94b2e3;
margin-top: 10px;
margin-bottom: 24px;
word-break: break-all;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
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