import styled from 'styled-components'

export default styled.div`
.course-content {
    background-color: #eee;
}
.course-content .ifa-block-content {
    padding-top: 20px;
    overflow: hidden;
}
.course-content .ifa-block-content:after {
    content: '';
    clear: both;
}
`