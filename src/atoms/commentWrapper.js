import styled from 'styled-components'

export default styled.div`
padding-left: 60px;
margin-top: 20px;
position: relative;
&:first-child {
  margin-top: 0;
}
&::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props && props.avatar});
  background-position: left;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
`