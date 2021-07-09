import styled from 'styled-components'

export default styled.div`
background-image: url(${props => props && props.src});
height: ${props => props && props.height}px;
width: ${props => props.width || props.height}px;
border-radius: ${props => props && props.borderRadius}px;
background-position: left;
background-size: cover;
background-repeat: no-repeat;
}`
