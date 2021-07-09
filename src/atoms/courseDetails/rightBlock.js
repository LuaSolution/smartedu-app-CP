import styled from 'styled-components'

export default styled.div`
//flex-basis:calc(30% - 10px) !important;
// width: 270px;
margin-left: 30px;
//float: left;
@media only screen 
    and (min-width: 992px) 
    and (max-width: 1170px) {
    width: calc(40% - 30px);
}
@media only screen and (max-width: 992px) {
    width: 100%;
    margin-left: 0;
    float: unset;
    margin-bottom: 20px;
}
`