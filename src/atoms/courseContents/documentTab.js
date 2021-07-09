import styled from 'styled-components'
import downloadHover from 'atoms/course-contents/download.svg'
import download from 'atoms/course-contents/downloadHover.svg'
import folder from 'atoms/course-contents/folder.svg'

export default styled.div`
background-color: #ffff;
box-shadow: 2px 6px 30px rgb(78 82 92 / 10%);
border: none;
display: none;
padding: 50px 190px;
background-color: #f7f7f7;
border: 1px solid #b8bec8;
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
&.active {
  display: block;
}
.doc {
  height: 71px;
  padding: 0 0 16px 62px;
  background-image: url(${folder});
  background-size: 44px;
  background-position: left 0 top 0;
  background-repeat: no-repeat;
  line-height: 44px;
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 0.01em;
  color: #091230;
  margin-top: 16px;
  position: relative;
}
.doc a {
  background-image: url(${download});
  background-repeat: round;
  background-size: 44x;
  width: 44px;
  height: 44px;
  position: absolute;
  right: 0;
  top: 0;
}
.doc a:hover {
  background-image: url(${downloadHover});
}
.doc:first-child {
  margin-top: 0;
}
`