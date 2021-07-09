import styled from 'styled-components'
import share from 'atoms/course-contents/share.svg'
import cup from 'atoms/course-contents/cup.svg'

export default styled.header`
height: 90px;
background: #193769;
display: table-cell;
vertical-align: middle;
width: 100vw;
nav {
  max-width: 1440px;
  margin: 0 auto;
  max-height: 100%;
  box-sizing: border-box;
  padding: 0 20px;

}
.navbar-brand {
  padding: 0;
  margin: 0;
}
.title {
  margin-left: 26px;
  padding: 14.81px 26px;
  border-left: 1px solid #fff;
}
.title p {
  font-weight: bold;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #fff;
  width:100%
}
.navbar-nav .nav-link,
.navbar-nav .nav-link:hover {
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #fff;
  padding: 9px 20px;
  line-height: 24px;
  position: relative;
  width: 155px;
}
.navbar-nav .ifa-rate-link {
  border-right: 1px solid #fff;
}
.navbar-nav .nav-link.active {
  color: #fff
}
.navbar-nav .nav-link::after {
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: 24px;
  position: absolute;
  content: '';
  right: 20px;
  top: calc(50% - 12px);
}
.navbar-nav .ifa-share-link::after {
  background-image: url(${share});
}
.navbar-nav .ifa-process-link .CircularProgressbar {
  background-image: url(${cup});
  background-repeat: no-repeat;
  background-size: 15px 16px;
  background-position: center;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 20px;
}
.navbar-nav
  .ifa-process-link
  .CircularProgressbar
  .CircularProgressbar-trail {
  stroke: #c3c4c9;
}
.navbar-nav .ifa-process-link .CircularProgressbar .CircularProgressbar-path {
  stroke: #00bf2a;
}
.navbar-nav .ifa-share-link,
.navbar-nav .ifa-share-link:hover {
  background-color: #f7f7f7;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  color: #193769;
  width: 140px;
}
`
