import React, { useEffect, useState } from 'react'
import UserTopLayout from 'components/users/UserTopLayout'
import { Progress, Spin } from 'antd'
import axios from 'helpers/axios'
import { NoData } from 'atoms'
import { COURSES_PATH } from 'defines'
import 'assets/user/user-dashboard.scss'

const MyLearningProcess = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true)
    axios.get('courses/get-my-learning-process')
      .then(res => {
        if (res.data.status === 200) {
          setData(res.data.data)
        }
      })
      .finally(() => setLoading(false))
  }, []);

  const middelTextProccess = text => {
    return <div className="box-middle-process">{text}</div>
  }

  const renderData = (item, index) => {
    const content = <div className="item-process-td">
      <div className="image-item" onClick={() => {
        window.open('/course-details/' + item.slug, '_blank')
      }}>
        <img src={COURSES_PATH + item.id + '.webp'} className="style-image-detail" />
      </div>
      <div className="title-item" onClick={() => {
        window.open('/course-details/' + item.slug, '_blank')
      }}>{item.title}</div>
      {item.cetificate_name && <>
        <div className="content-footer-1">
          <img src={COURSES_PATH + item.id + '.webp'} className="style-image-content-1" />
        Đã đạt được chứng chỉ
      </div>
        <div className="content-footer-2">{item.cetificate_name}</div>
      </>}
    </div>

    const process = <td className="item-line-middle">
      <div className="box-line-process">
        <Progress className="process-learning-middle" type="circle"
          strokeColor={item.process < 100 ? '#0B46A9' : '#0E7619'}
          strokeWidth={15}
          percent={item.process}
          format={() => middelTextProccess(index + 1)} />
      </div>
    </td>

    return <>
      <tr className="item-row-line-learing-process" key={index}>{index % 2 ?
        <>
          <td>
          </td>
          {process}
          <td className="item-line-center-right">
            {content}
          </td>
        </> : <>
          <td className="item-line-center-left">
            {content}
          </td>
          {process}
          <td></td>
        </>}
      </tr>
    </>
  }

  return <div className="box-content-process-learning">
    <Spin spinning={loading}>
      <table className="table-make-process-learning">
        {data && data.length > 0 ? data.map((item, index) => renderData(item, index)) : <NoData />}
      </table>
    </Spin>
  </div>
}

export default React.memo(MyLearningProcess)
