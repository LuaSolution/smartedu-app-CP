import styled from 'styled-components'

export default styled.div`
float: left;
margin-left: 28px;
.item {
  overflow: hidden;
  margin-top: 10px;
}
.item:first-child {
  margin-top: 0;
}
.item::after {
  content: '';
  clear: both;
}
.item .process-wrapper {
  width: 350px;
  height: 8px;
  background-color: #e1e5f1;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  float: left;
  margin-top: 6px;
}
.item .list-star,
.item .process-number {
  float: left;
  width: fit-content;
  margin-left: 20px;
}
.item .process-number {
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  text-align: right;
  letter-spacing: 0.01em;
  color: #363e57;
  width: 38px;
}
@media only screen and (max-width: 1170px) {
  float: unset;
  margin: auto;
  margin-top: 20px;
  .item .process-wrapper {
    width: calc(100% - 180px);
  }
}
`