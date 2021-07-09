import styled from 'styled-components'

export default styled.div`
width: fit-content;
float: left;
.list-star {
  text-align: center;
}
.avg-number {
  font-weight: bold;
  font-size: 70px;
  line-height: 110px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #000000;
  width: 100%;
  text-align: center;
}
.total-rate {
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.01em;
  color: #363e57;
}
@media only screen and (max-width: 1170px) {
  float: unset;
  margin: auto;
}
`