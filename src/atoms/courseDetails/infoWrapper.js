import styled from 'styled-components'

export default styled.div`
padding: 20px 20px 52px 20px;
background-color: #fff;
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
.time {
  margin-top: 10px;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #091230;
}
@media only screen and (min-width: 992px) and (max-width: 1170px) {
  .time {
    font-size: 15px;
  }
}
@media only screen and (max-width: 992px) {
  -webkit-border-radius: unset;
  -moz-border-radius: unset;
  border-radius: unset;
}
`