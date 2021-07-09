import styled from 'styled-components'
import position from 'atoms/course-details/position.svg'
import company from 'atoms/course-details/company.svg'
import totalCourse from 'atoms/course-details/totalCourse.svg'
import totalFollower from 'atoms/course-details/totalFollower.svg'

export default styled.div`
width: 235px;
float: left;
.img-block {
  width: 140px;
  height: 140px;
  margin: auto;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.img-block img {
  max-width: 100%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.name {
  margin-top: 10px;
  font-weight: bold;
  font-size: 24px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.01em;
  color: #0b46a9;
}
.personal-info {
  padding-left: 46px;
  font-weight: normal;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0.01em;
  color: #363e57;
  margin-top: 10px;
  background-repeat: no-repeat;
  background-size: 36px 36px;
  background-position: left 0 center;
  height: 36px;
}
.position {
  background-image: url(${position});
}
.company {
  background-image: url(${company});
}
.total-course {
  background-image: url(${totalCourse});
}
.total-follower {
  background-image: url(${totalFollower});
}
@media only screen and (max-width: 992px) {
  float: none;
  width: 100%;
}
`
