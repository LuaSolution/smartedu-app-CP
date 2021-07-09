import styled from 'styled-components'
import emptyStar from 'atoms/course-details/emptyStar.svg'

export default styled.span`
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: 18px;
  display: inline-block;
  background-image: url(${emptyStar});
`
