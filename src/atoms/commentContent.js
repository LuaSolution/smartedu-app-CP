import styled from 'styled-components'
import downComment from 'atoms/course-details/downComment.svg'

export default styled.div`
padding: 13px 15px; 
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
background-color: #F7F7F7;
.name {
    font-weight: bold;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #091230;
}
.list-star {
    margin-top: 5px;
}
.comment-time {
    font-weight: bold;
    font-size: 13px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #676E86;
    margin-top: 10px;
}
.content {
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #363E57;
    margin-top: 10px;
}
.content.hard-height {
    height: 55px;
    overflow: hidden;
}
.content.show-all {
    height: auto;
    overflow: auto;
}
.show-more {
    display: none;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.01em;
    color: #0B46A9;
    margin-top: 10px;   
    position: relative;
}
.show-more::after {
    content: '';
    width: 24px;
    height: 24px;
    background-image: url(${downComment});
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
.show-more.show {
    display: block;
    width: 95px;
    height: 24px;
}
.show-more:hover {
    background-color: unset;
}
.rotate.show-more::after {
    transform: rotate(180deg);
    transform: rotate( 
        -180deg
            );
            -moz-transform: rotate( -180deg );
            -ms-transform: rotate( -180deg );
            -o-transform: rotate( -180deg );
            -webkit-transform: rotate( 
        -180deg
            );
        transition: transform 550ms ease;
        -moz-transition: -moz-transform 550ms ease;
        -ms-transition: -ms-transform 550ms ease;
        -o-transition: -o-transform 550ms ease;
        -webkit-transition: -webkit-transform 550ms ease;
    )
}
`