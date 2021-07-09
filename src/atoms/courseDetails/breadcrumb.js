import styled from 'styled-components'

export default styled.div`
a {
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: #e1e5f1;
}
a::after {
  content: '/';
  display: inline-block;
  margin: 0 5px;
}
a:first-child {
  color: #b8bec8;
  pointer-events: none;
}
a:last-child:after {
  display: none;
}
@media only screen and (max-width: 1270px) {
  a {
    font-size: 15px;
  }
}
@media only screen and (max-width: 1180px) {
  a {
    font-size: 13px;
  }
}
`