import styled from 'styled-components'

export default styled.div`
margin-top: 24px;
overflow: hidden;
&::after {
  content: '';
  clear: both;
}
`