import styled from 'styled-components'

export default styled.div`
width: calc(100% - 612px);
position: relative;
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
video {
  max-width: 488px;
  position: absolute;
  right: 0;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  max-width: 100%;
}
@media only screen and (max-width: 1270px) {
  width: 45%;
}
@media only screen and (max-width: 1180px) {
  width: 40%;
}
@media only screen and (max-width: 992px) {
  width: 100%;
  margin-top: 20px;
  video {
    position: unset;
  }
}
`