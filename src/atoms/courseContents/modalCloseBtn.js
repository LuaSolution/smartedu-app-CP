import styled from 'styled-components'
import wrong from 'atoms/course-contents/wrong.svg'

export default styled.button`
  background-image: url(${wrong});
  background-repeat: no-repeat;
  background-size: 24px;
  background-color: #fff;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 30px;
  top: 30px;
  border: none;
  outline: none;
`