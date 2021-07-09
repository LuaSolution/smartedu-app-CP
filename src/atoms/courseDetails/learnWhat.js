import correct from 'atoms/course-details/correct.svg'
import styled from 'styled-components'

export default styled.div`
.list-learn-what div {
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #363E57;
    background-image: url(${correct});
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: 0 0;
    padding-left: 34px;
    display: inline-flex;
    width: calc(50% - 15px);
    margin-top: 24px;
}
.list-learn-what div:nth-child(even) {
    margin-left: 30px;
}
@media only screen 
    and (min-width: 992px) 
    and (max-width: 1170px) {
        .list-learn-what div {
            font-size: 14px;
        }
}
@media only screen and (max-width: 992px) {
    .list-learn-what div {
        width: 100%;
    }
    .list-learn-what div:nth-child(even) {
        margin-left: 0;
    }
}
`