import styled from "styled-components"

export default styled.div`
.discount-price {
  font-weight: bold;
  font-size: 30px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #363e57;
  display: inline-block;
}
.discount-price span {
  font-weight: bold;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #676e86;
}
.origin-price {
  font-weight: normal;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0.01em;
  text-decoration-line: line-through;
  color: #676e86;
  display: inline-block;
  margin-left: 30px;
}
.percent {
  background-color: #f88417;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.01em;
  display: inline-block;
  margin-left: 11px;
  padding: 3px;
}
@media only screen and (min-width: 992px) and (max-width: 1170px) {
  .discount-price {
    font-size: 25px;
  }
  .discount-price span {
    font-size: 17px;
  }
  .origin-price {
    font-size: 17px;
  }
  .percent {
    font-size: 10px;
  }
}
`