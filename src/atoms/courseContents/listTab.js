import styled from 'styled-components'

export default styled.div`
margin-top: 15px;
.tab {
  width: calc(33.33% - 20px);
  height: 70px;
  margin: 0 15px;
  font-weight: bold;
  font-size: 20px;
  line-height: 70px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #363e57;
  background-color: #fff;
  text-align: center;
  display: inline-block;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
}
.tab::after {
  content: '';
  width: 2px;
  height: 40px;
  background: #94b2e3;
  right: -15px;
  top: calc(50% - 20px);
  position: absolute;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.tab:last-child::after {
  display: none;
}
.tab.active,
.tab:hover {
  color: #193769;
  background-color: #dbe3ff;
}
.tab:first-child {
  margin-left: 0;
}
.tab:last-child {
  margin-right: 0;
}
`