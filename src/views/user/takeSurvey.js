import React, { useState } from 'react'
import { Steps, message, Form, Spin, Result } from 'antd'
import { Button } from 'reactstrap'
import Survey from 'containers/surveys'
import { Navbar } from 'react-bootstrap'
import UserFooterLayout from 'components/users/UserFooterLayout'
import 'assets/user/ifa-header.css'
import axios from 'helpers/axios'
import detectMobile from 'helpers/detectMobile'
import { LazyImage } from 'atoms/lazyImg'

const { Step } = Steps
const tempId = 'user_' + Math.random().toString(36).substr(2, 9)

const TakeSurvey = () => {
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(false)
  const [data, setData] = useState([
    {
      type: 1,
      title: 'PHIẾU KHẢO SÁT TRƯỚC ĐÀO TẠO',
      content: (
        <>
          <b>Thưa Quý Anh/Chị</b>
          <br />
          <p>
            Với mục tiêu tìm kiếm sự hoàn hảo trong việc cung cấp chất lượng
            dịch vụ đào tạo của Viện Quản trị và Tài chính, chúng tôi kính mong
            Quý Anh/Chị học viên dành chút ít thời gian để cung cấp cho chúng
            tôi thêm những thông tin cần thiết nhất nhằm giúp cho Hội đồng Khoa
            học IFA có thể đưa ra những nội dung đào tạo và công tác giảng dạy
            phù hợp và sát với thực tế, cũng như đáp ứng đúng yêu cầu và mong
            muốn của Quý Anh/Chị và Ban lãnh đạo Công ty.
          </p>
          <br />
          <p>
            Trân trọng cảm ơn Quý Anh/Chị đã tin tưởng và hỗ trợ cho Viện IFA,
            chúng tôi cam kết sẽ nổ lực hết sức để hoàn thiện mình và phấn đấu
            trở thành một đơn vị đào tạo uy tín và chất lượng để không phụ lòng
            tin của Quý Anh/Chị cũng như Ban lãnh đạo Công ty. Những thông tin
            của Quý Anh/Chị sẽ được Viện IFA bảo mật và không công khai cho bất
            kỳ người nào hay đơn vị nào khác.
          </p>
          <p style={{ textAlign: 'center' }}>
            ----------------------------------------
          </p>
        </>
      ),
    },
    {
      id: 1,
      type: 2,
      title:
        'Lĩnh vực hoạt động chính của Quý Công ty/Thành viên (chỉ cần ghi tối đa 3 lĩnh vực) mà Anh/Chị đang phụ trách.',
      row_number: 3,
    },
    {
      id: 2,
      type: 3,
      title:
        'Hiện tại, Anh/Chị tự đánh giá rằng, mức độ mà mình đang đáp ứng công việc so với khả năng của chính mình',
    },
    {
      id: 3,
      type: 2,
      title:
        'Anh/Chị có thể mô tả sơ về mục tiêu phát triển nghề nghiệp của mình tại CJ Việt Nam trong ngắn hạn và dài hạn',
      row_number: 2,
    },
    {
      id: 4,
      type: 4,
      title: 'Chức vụ hoặc vị trí mà các Anh/Chị đang đảm nhiệm',
      options: [
        'Nhân viên',
        'Trưởng/Phó phòng',
        'Trưởng/Phó bộ phận',
        'Quản lý chung (mô tả thêm)',
        'Quản lý cấp cao (mô tả thêm)',
      ],
    },
    {
      id: 5,
      type: 2,
      title:
        'Những khó khăn chung về công việc hàng ngày mà Anh/Chị đang gặp phải và mong muốn cải thiện',
      row_number: 5,
    },
    {
      id: 6,
      type: 5,
      title:
        'Những công việc trong Công ty/Phòng/Ban/Bộ phận và tần xuất thực hiện những công việc đó.',
      row_number: 6,
    },
    {
      id: 7,
      type: 4,
      title: 'Kinh nghiệm làm việc của Anh/Chị',
      options: ['Dưới 1 năm', 'Từ 1-2 năm', 'Từ 2-5 năm', 'Trên 5 năm'],
    },
    {
      id: 8,
      type: 6,
      title: 'Đánh giá năng lực chung trước chương trình đào tạo',
      data: [
        {
          group_name: 'Sự tự tin',
          options: [
            {
              id: 0,
              option:
                'Luôn nhận thức được cụ thể những mục tiêu hoàn thiện trong năng lực lãnh đạo và quản lý của bản thân và lập kế hoạch hoàn thiện',
            },
            {
              id: 1,
              option:
                'Hiểu rõ giá trị của bản thân và kiên định với những giá trị này trong quản lý, lãnh đạo',
            },
            { id: 2, option: 'Xây dựng uy tín và vị thế cho người lãnh đạo' },
            {
              id: 3,
              option:
                'Có niềm tin tuyệt đối vào chính bản thân và khả năng trong vai trò lãnh đạo',
            },
            {
              id: 4,
              option:
                'Quyết đoán hơn trong các tình huống trong công việc và cuộc sống',
            },
            {
              id: 5,
              option:
                'Linh động làm việc với người khác trong mọi tình huống khác nhau',
            },
          ],
        },
        {
          group_name: 'Ứng xử',
          options: [
            {
              id: 6,
              option:
                'Dễ tiếp xúc, nhiệt tình, thân thiện, cởi mở đối với nhân viên, đối tác và mọi người',
            },
            {
              id: 7,
              option:
                'Biết thông cảm và thành thật quan tâm đến những người khác',
            },
            {
              id: 8,
              option: 'Gắn kết với mọi người bằng những đặc điểm riêng của họ',
            },
          ],
        },
        {
          group_name: 'Giao tiếp',
          options: [
            {
              id: 9,
              option:
                'Chủ động giao tiếp, tìm hiểu người khác để phát triển mối quan hệ.',
            },
            {
              id: 10,
              option:
                'Nhìn nhận và giao tiếp vấn đề trên quan điểm của người khác',
            },
            { id: 11, option: 'Đưa chính kiến một cách thuyết phục, rõ ràng' },
            {
              id: 12,
              option:
                'Chia sẻ chính kiến, phản đối không làm mất lòng người khác',
            },
            {
              id: 13,
              option:
                'Lắng nghe và khuyến khích động viên người khác tốt hơn trong vai trò lãnh đạo, quản lý',
            },
            {
              id: 14,
              option: 'Giao tiếp một cách chủ động, tràn đầy sinh lực',
            },
          ],
        },
        {
          group_name: 'Lãnh đạo',
          options: [
            {
              id: 15,
              option:
                'Có tầm nhìn và mục tiêu phát triển rõ ràng cho bản thân ở vai trò quản lý, lãnh đạo đội ngũ/công ty',
            },
            {
              id: 16,
              option:
                'Hiểu và đồng cảm với giá trị riêng của người khác để phát triển họ',
            },
            {
              id: 17,
              option:
                'Nhìn nhận thành tựu của bản thân để làm bài học hoàn thiện trong tương lai',
            },
            {
              id: 18,
              option:
                'Thuyết phục người khác hành động, thay đổi dựa trên sự động viên hướng đến lợi ích của họ',
            },
            {
              id: 19,
              option: 'Truyền lửa nhiệt tình, cảm hứng cho đội ngũ và công ty',
            },
            {
              id: 20,
              option:
                'Động viên, khuyến khích, phát triển người khác dựa trên điểm mạnh của họ',
            },
            {
              id: 21,
              option:
                'Linh hoạt và thích nghi tốt trong quá trình lãnh đạo, quản lý',
            },
          ],
        },
        {
          group_name: 'Kiểm soát căng thẳng và thái độ tích cực',
          options: [
            { id: 22, option: 'Thể hiện thái độ tích cực thay vì tiêu cực' },
            {
              id: 23,
              option:
                'Duy trì năng lượng và tinh thần mạnh mẽ trong công việc và cuộc sống',
            },
            {
              id: 24,
              option:
                'Duy trì sự tập trung trong mọi tình huống và trong khủng hoảng',
            },
            {
              id: 25,
              option:
                'Bình tĩnh trong các tình huống khó khăn và trước các biến cố',
            },
            {
              id: 26,
              option:
                'Thu thập và cân nhắc các dữ kiện trước khi đưa ra quyết định',
            },
            {
              id: 27,
              option:
                'Hành động để giải quyết với tình huống căng thẳng và khủng hoảng',
            },
            {
              id: 28,
              option:
                'Thích nghi nhanh với các thay đổi và sẵn sàng cải thiện những tình huống xấu nhất',
            },
          ],
        },
      ],
    },
    {
      id: 9,
      type: 2,
      title:
        'Hãy đề xuất những NỘI DUNG ĐÀO TẠO nào màtheo Anh/Chị là phù hợp với hiện tại giúp cho Anh/Chị phát triển được năng lực làm việc trong bối cảnh hiện tại (Nếu có)',
      row_number: 10,
    },
  ])

  const next = () => {
    console.log(answer)
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const submitSurvey = () => {
    setLoading(true)
    const filtered = answer.filter((el) => {
      return el !== undefined
    })
    filtered.map((item, i) => {
      const index = data.findIndex((e) => e.id === item.id)
      if (data[index].type === 2) {
        filtered[i] = {
          ...filtered[i],
          data: filtered[i].data ? filtered[i].data.join('//') : null,
        }
      }
      if (data[index].type === 4) {
        filtered[i] = {
          ...filtered[i],
          data: filtered[i].data
            ? filtered[i].data.note
              ? filtered[i].data.selected + '//' + filtered[i].data.note
              : filtered[i].data.selected
            : null,
        }
      }
    })

    axios
      .post('survey/upload-result', {
        survey_list_id: 1,
        temp_user: tempId,
        result: filtered,
      })
      .then((res) => {
        if (!res || !res.data || res.data.failed) {
          message.error('Cập nhật bài khảo sát thất bại')
        } else {
          message.success('Chúc mừng bạn đã hoàn thành bài khảo sát')
        }
      })
      .finally(() => {
        setLoading(false)
        setStatus(true)
      })
  }

  return (
    <>
      <UserHeaderLayout />
      <Spin spinning={loading}>
        {status ? (
          <Result title="Chúc mừng bạn đã hoàn thành bài khảo sát" />
        ) : (
          <div style={{ width: '90%', marginTop: 30 }}>
            {!detectMobile() && (
              <Steps
                current={current}
                size="small"
                onChange={(c) => setCurrent(c)}
                type="navigation"
              >
                {data.map((item, index) => (
                  <Step
                    key={index}
                    title={index > 0 ? 'Câu ' + index : 'Giới thiệu'}
                  />
                ))}
              </Steps>
            )}
            <div style={{ marginTop: 30 }}>
              <Survey
                data={data[current]}
                index={current}
                answer={answer}
                setAnswer={setAnswer}
              />
            </div>
            <Form.Item>
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} outline onClick={prev}>
                  Quay lại
                </Button>
              )}
              {current === data.length - 1 && (
                <Button color="danger" outline onClick={submitSurvey}>
                  Gửi khảo sát
                </Button>
              )}
              {current < data.length - 1 && (
                <Button color="primary" onClick={next}>
                  Tiếp theo
                </Button>
              )}
            </Form.Item>
          </div>
        )}
      </Spin>
      <UserFooterLayout />
    </>
  )
}

export default TakeSurvey

const UserHeaderLayout = () => {
  return (
    <header className="ifa-header">
      <Navbar bg="" expand="lg">
        <Navbar.Brand href="/">
          <LazyImage
            src={process.env.PUBLIC_URL + '/assets/img/web/static/logo.png'}
            alt="logo"
          />
        </Navbar.Brand>
      </Navbar>
    </header>
  )
}
