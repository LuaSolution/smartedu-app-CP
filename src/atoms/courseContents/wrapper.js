import styled from 'styled-components'
import curriculum from 'atoms/course-contents/curriculum.svg'
import groupUser from 'atoms/course-contents/groupUser.svg'
import maximize from 'atoms/course-contents/maximize.svg'
import minimize from 'atoms/course-contents/minimize.svg'
import left from 'atoms/course-contents/left.svg'
import right from 'atoms/course-contents/right.svg'

export default styled.div`
width: 100%;
.top {
  position: relative;
  background-color: #f7f7f7;
}
.hide-before,
.ifa-block-content .tooltip-exit {
  display: none;
}
.curriculum-btn {
  position: absolute;
  background-color: #676e86;
  background-repeat: no-repeat;
  background-position: center;
  width: 52px;
  height: 52px;
  border: none;
  outline: none;
}
.curriculum-btn {
  opacity: 0.6;
  background-image: url(${curriculum});
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  text-indent: -9999px;
  padding: 0;
  transition: .3s ease-in;
  z-index: 2;
}
.curriculum-btn:hover {
  font-weight: 600;
  font-size: 18px;
  line-height: 52px;
  letter-spacing: 0.01em;
  color: #fff;
  width: 138px;
  text-indent: unset;
  text-align: left;
  padding-left: 12px;
  background-position: right 12px center;
  transition: .3s ease-in;
}
.group-user-btn {
  background-image: url(${groupUser});
  right: 0;
}
.ifa-block-content img {
  max-width: 100%;
}
.ifa-block-content.full-screen {
  max-width: 100%;
  position: relative;
} 
&:active .ifa-block-content.full-screen .tooltip-exit {
  display: block;
  position: absolute;
  width: 281px;
  height: 60px;
  font-weight: bold;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #f4f4f4;
  top: calc(50% - 30px);
  left: calc(50% - 140px);
  z-index: 2;
  background-color: rgba(57, 54, 54, 0.77);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
.ifa-block-content.full-screen:hover .tooltip-exit span {
  display: inline-block;
  width: fit-content;
  background-color: #0f0e0e;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  line-height: 35px;
}
.ifa-block-content.full-screen img {
  width: 100%;
}
&:hover .title {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 160%;
  letter-spacing: 0.01em;
  color: #fafafc;
  padding: 17px 14px;
  z-index: 2;
}
.top:hover::before,
// .top:hover::after {
//   position: absolute;
//   left: 0;
//   height: 64px;
//   width: 100%;
//   content: '';
//   z-index: 1;
// }
.top:hover .maximize,
.top:hover .minimize {
  display: block;
  position: absolute;
  width: 52px;
  height: 52px;
  right: 20px;
  top: calc(100% - 5px);
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  z-index: 2;
}
.top:hover .maximize {
  background-image: url(${maximize});
}
.top:hover .minimize {
  background-image: url(${minimize});
}
.top:hover .previous,
.top:hover .next {
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  z-index: 2;
  width: 54px;
  height: 54px;
  position: absolute;
  background-color: #676e86;
  opacity: 0.6;
  top: calc(50% - 27px);
}
.top:hover .previous {
  background-image: url(${left});
  -webkit-border-top-right-radius: 5px;
  -webkit-border-bottom-right-radius: 5px;
  -moz-border-radius-topright: 5px;
  -moz-border-radius-bottomright: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  left: 0;
}
.top:hover .next {
  background-image: url(${right});
  -webkit-border-top-left-radius: 5px;
  -webkit-border-bottom-left-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-bottomleft: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  right: 0;
}
`