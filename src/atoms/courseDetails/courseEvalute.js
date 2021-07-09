import styled from 'styled-components'
import star from 'atoms/course-details/star.svg'

export default styled.div`
display: table-row;
.rate {
  background-color: #f88417;
  width: 53px;
  height: 31px;
  font-weight: 600;
  font-size: 14px;
  line-height: 31px;
  letter-spacing: 0.01em;
  color: #ffffff;
  padding: 0 10px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  position: relative;
  display: table-cell;
}
.rate::after {
  content: '';
  position: absolute;
  background-image: url(${star});
  right: 10px;
  top: 3px;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
}
`