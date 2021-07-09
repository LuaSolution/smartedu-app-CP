import styled from 'styled-components'

export default styled.div`
margin-top: 24px;
a {
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #193769;
  padding: 16px 20px;
  background-repeat: no-repeat;
  background-size: 25px 25px;
  background-position: right 16.5px center;
  background-color: #f7f7f7;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  display: inline-block;
  margin-left: 15px;
  width: 160px;
}
a:hover {
  background-color: #e1e5f1;
}
a.active {
  background-color: #4063e0;
  color: #fff;
}
a.deactive {
  color: #757575;
  pointer-events: none;
  background-color: #cecece;
}
a.wishlist {
  margin-left: 0;
}
@media only screen and (max-width: 992px) {
  a {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    margin-left: 0;
  }
  a:first-child {
    margin-top: 0;
  }
}
`
