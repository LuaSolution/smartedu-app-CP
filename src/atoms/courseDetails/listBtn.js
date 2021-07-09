import styled from "styled-components"

export default styled.div`
margin-top: 24px;
button {
  display: block;
  width: 100%;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.01em;
  padding: 11.5px 0 11.5px 0;
}
button.add-cart {
  background-color: #078723;
  color: #fff;
  border: 1px solid transparent;
}
button.buy-now {
  background-color: #fff;
  color: #193769;
  margin-top: 19px;
  border: 1px solid #193769;
}
@media only screen and (min-width: 992px) and (max-width: 1170px) {
  button {
    font-size: 16px;
  }
}
`