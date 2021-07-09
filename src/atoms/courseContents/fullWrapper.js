import styled from 'styled-components'

export default styled.div`
margin: 0 auto;
max-width: 1920px;
overflow: hidden;
&::after {
  content: '';
  clear: both;
}
&.show-left-menu .menu-left {
  display: block;
  transition: .3s ease-in;
}
`