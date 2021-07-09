import styled from 'styled-components'

export default styled.div`
//display: inline-block;
flex-basis:calc(65% - 0px)!important;
// width: 770px;
padding-bottom: 60px;
float: left;
@media only screen 
    and (min-width: 992px) 
    and (max-width: 1170px) {
    width: 60%;
}
@media only screen and (max-width: 992px) {
    width: 100%;
    float: unset;
    padding-bottom: 20px;
}
`