import styled from 'styled-components'
import downReadMoreContent from 'atoms/course-details/downReadMoreContent.svg'

export default styled.div`
cursor:pointer;
margin-top: 30px;
height: 50px;
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
background-color: #BAD4FF;
span {
    margin: auto;
    display: block;
    width: 201px;
    height: 100%;
    font-weight: 600;
    font-size: 18px;
    line-height: 50px;
    letter-spacing: 0.01em;
    color: #091230;
    background-image: url(${downReadMoreContent});
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: right 0 center;
}
`