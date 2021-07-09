import styled from 'styled-components'
import lesson from 'atoms/course-details/lesson.svg'
import certificate from 'atoms/course-details/certificate.svg'
import method from 'atoms/course-details/method.svg'
import point from 'atoms/course-details/point.svg'
import type from 'atoms/course-details/type.svg'
import lifetime from 'atoms/course-details/lifetime.svg'

export default styled.div`
margin-top: 24px;
div {
  padding-left: 34px;
  font-weight: normal;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #363e57;
  background-repeat: no-repeat;
  background-position: left 0 center;
  background-size: 24px;
  margin-top: 12px;
}
div:first-child {
  margin-top: 0;
}
div span {
  font-weight: bold;
}
div.total-lesson {
  background-image: url(${lesson});
}
div.lifetime {
  background-image: url(${lifetime});
}
div.certificate {
  background-image: url(${certificate});
}
div.method {
  background-image: url(${method});
}
div.type {
  background-image: url(${type});
}
div.point {
  background-image: url(${point});
}
@media only screen and (min-width: 992px) and (max-width: 1170px) {
  div {
    font-size: 16px;
  }
}
`