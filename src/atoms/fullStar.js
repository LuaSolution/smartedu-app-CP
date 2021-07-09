import styled from 'styled-components'
import fullStar from 'atoms/course-details/fullStar.svg'

export default styled.span`
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: 18px;
  display: inline-block;
  background-image: url(${fullStar});
`