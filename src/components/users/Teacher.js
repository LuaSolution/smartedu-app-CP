import React, { useState, useEffect } from 'react'
import axios from 'helpers/axios'
import { Wrapper, TeacherLeft, TeacherRight } from 'atoms'
import { Skeleton } from 'antd'
import { AVATAR_PATH } from 'defines'
import { Avatar } from 'atoms'

const Teacher = ({ mentorId, setMentorName }) => {
  const [loading, setLoading] = useState(false)
  const [qualifications, setQualifications] = useState([])
  const [expWork, setExpWork] = useState([])
  const [expEducation, setExpEducation] = useState([])
  const [data, setData] = useState(null)

  useEffect(() => {
    if (mentorId) {
      setLoading(true)
      axios
        .get('users/get-mentor-info/' + mentorId)
        .then((res) => {
          if (res.data.status === 200) {
            setMentorName(res.data.mentor.first_name + ' ' + res.data.mentor.last_name)
            setData(res.data.mentor)
            setQualifications(res.data.qualifications)
            setExpWork(res.data.workExperience)
            setExpEducation(res.data.teachingExperience)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [mentorId])

  return loading ?
    <Wrapper>
      <TeacherLeft>
        <div className="img-block">
          <Skeleton.Avatar active size={'large'} shape={'circle'} />
        </div>
        <Skeleton active title={false} paragraph={{ rows: 5 }} />
      </TeacherLeft>
      <TeacherRight>
        <Skeleton active title={false} paragraph={{ rows: 8 }} />
      </TeacherRight>
    </Wrapper>
    :
    <Wrapper>
      {data && qualifications && expWork && expEducation ? <><TeacherLeft>
        <div className="img-block" >
          <Avatar src={AVATAR_PATH + data.id + '.webp?' + Math.random()}
            height={140} borderRadius={140} style={{ border: '1px solid #eee' }} />
        </div>
        <div className="name">{data.first_name + ' ' + data.last_name}</div>
        <div className="personal-info position">{data.position}</div>
        <div className="personal-info company">{data.company}</div>
        <div className="personal-info total-course">
          {data.totalCourse} khóa học
            </div>
        {/* <div className="personal-info total-follower">
          {data.totalFollower} người theo dõi
            </div> */}
      </TeacherLeft>
        <TeacherRight>
          {Array({ title: 'Trình độ chuyên môn', data: qualifications },
            { title: 'Kinh nghiệm làm việc', data: expWork },
            { title: 'Kinh nghiệm giảng dạy', data: expEducation })
            .map((item, index) =>
              <div className="topic-wrapper" key={index}>
                <div className="topic-header">{item.title}</div>
                <div className="topic-content">
                  {item.data.map((i, _index) => (
                    <p key={_index}>{i.content}</p>
                  ))}
                </div>
              </div>)}
        </TeacherRight>
      </>
        : null}
    </Wrapper >
}

export default Teacher