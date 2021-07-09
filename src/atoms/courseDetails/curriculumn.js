import styled from 'styled-components'
import book from 'atoms/course-details/book.svg'
import down from 'atoms/course-details/down.svg'

export default styled.div`
.details-block-title a {
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #0B46A9;
    position: relative;
    width: 100px;
    display: inline-block;
}
& .details-block-title p {
    display: inline-block;
    width: calc(100% - 100px);
}
.details-block-title a::after {
    content: '';
    width: 24px;
    height: 24px;
    background-image: url(${down});
    background-repeat: no-repeat;
    background-size: 24px 24px;
    position: absolute;
    right: 0;
    top: calc(50% - 12px);
}
.details-block-title .total-lesson {
    margin-top: 10px;
    background-image: url(${book});
    background-repeat: no-repeat;
    background-size: 40px;
    background-position: left 0 center;
    padding-left: 50px;
    font-weight: 600;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    letter-spacing: 0.01em;
    color: #363E57;
}
@media only screen 
    and (min-width: 992px) 
    and (max-width: 1170px) {
        .details-block-title a {
            font-size: 16px;
        }
}
`