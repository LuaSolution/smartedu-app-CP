import styled from 'styled-components'
import down from 'atoms/course-details/down.svg'

export default styled.div`
div {
    margin-top: 24px;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #363E57;
    overflow: hidden;
}
.details-block-content {
    height: 73px;
}
&.show-all div {
    overflow: auto;
    height: auto;
}
blockquote {
    margin: revert;
}
a {
    color: #007bff;
}
span {
    cursor: pointer;
    position: relative;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    letter-spacing: 0.01em;
    color: #0B46A9;
    width: 115px;
    height: 25px;
    display: block;
    margin: auto;
    margin-top: 20px;
}
span::after {
    content: '';
    width: 24px;
    height: 24px;
    background-image: url(${down});
    background-repeat: no-repeat;
    background-size: 24px 24px;
    position: absolute;
    right: 0;
    top: calc(50% - 12px);
    transform: rotate(0);
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0);
    -webkit-transform: rotate(0);
    transition: transform 550ms ease;
    -moz-transition: -moz-transform 550ms ease;
    -ms-transition: -ms-transform 550ms ease;
    -o-transition: -o-transform 550ms ease;
    -webkit-transition: -webkit-transform 550ms ease;
}
&.show-all span::after {
    transform: rotate(180deg);
    transform: rotate(-180deg);
    -moz-transform: rotate( -180deg );
    -ms-transform: rotate( -180deg );
    -o-transform: rotate( -180deg );
    -webkit-transform: rotate(-180deg);
    transition: transform 550ms ease;
    -moz-transition: -moz-transform 550ms ease;
    -ms-transition: -ms-transform 550ms ease;
    -o-transition: -o-transform 550ms ease;
    -webkit-transition: -webkit-transform 550ms ease;
}
@media only screen 
    and (min-width: 992px) 
    and (max-width: 1170px) {
        div {
            font-size: 14px;
        }
        a {
            font-size: 16px;
        }
}
`
