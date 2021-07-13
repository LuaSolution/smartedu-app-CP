import React, { useState } from "react"
import { Steps, message, Form, Spin, Result } from 'antd'
import { Button } from 'reactstrap'
import Survey from 'containers/surveys'
import { Navbar } from 'react-bootstrap'
import UserFooterLayout from 'components/users/UserFooterLayout'
import 'assets/user/ifa-header.css'
import axios from "helpers/axios"
import detectMobile from 'helpers/detectMobile'
import { LazyImage } from "atoms/lazyImg"

const { Step } = Steps
const tempId = 'user_' + Math.random().toString(36).substr(2, 9)

const TakeSurvey = () => {
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(false)
  const [data, setData] = useState([{
    type: 1,
    title: 'BẢNG CÂU HỎI KHẢO SÁT TRƯỚC ĐÀO TẠO DÀNH CHO CẤP QUẢN LÝ',
    content: "<><b>Thưa Quý Anh/Chị</b><br /><p>Với mục tiêu tìm kiếm sự hoàn hảo trong việc cung cấp chất lượng dịch vụ đào tạo của Viện Quản trị và Tài chính (Viện IFA), chúng tôi kính mong Quý Anh/Chị học viên dành chút ít thời gian để cung cấp cho chúng tôi thêm những thông tin cần thiết nhất nhằm giúp cho Hội đồng Khoa học IFA có thể đưa ra những nội dung đào tạo và công tác giảng dạy phù hợp và sát với thực tế, cũng như đáp ứng đúng yêu cầu và mong muốn của Quý Anh/Chị và Ban lãnh đạo Công ty.<br />Trân trọng cảm ơn Quý Anh/Chị đã tin tưởng và hỗ trợ cho Viện IFA, chúng tôi cam kết sẽ nổ lực hết sức để hoàn thiện mình và phấn đấu trở thành một đơn vị đào tạo uy tín và chất lượng để không phụ lòng tin của Quý Anh/Chị cũng như Ban lãnh đạo Công ty. Những thông tin của Quý Anh/Chị sẽ được Viện IFA bảo mật và không công khai cho bất kỳ người nào hay đơn vị nào khác.</p><p style={{ textAlign: 'center' }}>----------------------------------------</p></>"
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
    ]
  },
  {
    id: 6,
    type: 5,
    title: 'Những công việc trong Công ty/Phòng/Ban/Bộ phận và tần xuất thực hiện những công việc đó.',
    row_number: 6
  },
  {
    id: 7,
    type: 4,
    title: 'Kinh nghiệm làm việc của Anh/Chị',
    options: [
      'Dưới 1 năm',
      'Từ 1-2 năm',
      'Từ 2-5 năm',
      'Trên 5 năm',
    ]
  },
  {
    id: 5,
    type: 2,
    title: 'Những khó khăn chung về công việc hàng ngày mà Anh/Chị đang gặp phải và mong muốn cải thiện',
    row_number: 5
  },
  {
    id: 8,
    type: 6,
    title: 'Đánh giá năng lực chung trước chương trình đào tạo',
    data: [{
      group_name: 'Sự tự tin',
      options: [
        { id: 0, option: 'Luôn nhận thức được cụ thể những mục tiêu hoàn thiện trong năng lực lãnh đạo và quản lý của bản thân và lập kế hoạch hoàn thiện' },
        { id: 1, option: 'Hiểu rõ giá trị của bản thân và kiên định với những giá trị này trong quản lý, lãnh đạo' },
        { id: 2, option: 'Xây dựng uy tín và vị thế cho người lãnh đạo' },
        { id: 3, option: 'Có niềm tin tuyệt đối vào chính bản thân và khả năng trong vai trò lãnh đạo' },
        { id: 4, option: 'Quyết đoán hơn trong các tình huống trong công việc và cuộc sống' },
        { id: 5, option: 'Linh động làm việc với người khác trong mọi tình huống khác nhau' }
      ]
    },
    {
      group_name: 'Ứng xử',
      options: [
        { id: 6, option: 'Dễ tiếp xúc, nhiệt tình, thân thiện, cởi mở đối với nhân viên, đối tác và mọi người' },
        { id: 7, option: 'Biết thông cảm và thành thật quan tâm đến những người khác' },
        { id: 8, option: 'Gắn kết với mọi người bằng những đặc điểm riêng của họ' }
      ]
    },
    {
      group_name: 'Giao tiếp',
      options: [
        { id: 9, option: 'Chủ động giao tiếp, tìm hiểu người khác để phát triển mối quan hệ.' },
        { id: 10, option: 'Nhìn nhận và giao tiếp vấn đề trên quan điểm của người khác' },
        { id: 11, option: 'Đưa chính kiến một cách thuyết phục, rõ ràng' },
        { id: 12, option: 'Chia sẻ chính kiến, phản đối không làm mất lòng người khác' },
        { id: 13, option: 'Lắng nghe và khuyến khích động viên người khác tốt hơn trong vai trò lãnh đạo, quản lý' },
        { id: 14, option: 'Giao tiếp một cách chủ động, tràn đầy sinh lực' }
      ]
    },
    {
      group_name: 'Lãnh đạo',
      options: [
        { id: 15, option: 'Có tầm nhìn và mục tiêu phát triển rõ ràng cho bản thân ở vai trò quản lý, lãnh đạo đội ngũ/công ty' },
        { id: 16, option: 'Hiểu và đồng cảm với giá trị riêng của người khác để phát triển họ' },
        { id: 17, option: 'Nhìn nhận thành tựu của bản thân để làm bài học hoàn thiện trong tương lai' },
        { id: 18, option: 'Thuyết phục người khác hành động, thay đổi dựa trên sự động viên hướng đến lợi ích của họ' },
        { id: 19, option: 'Truyền lửa nhiệt tình, cảm hứng cho đội ngũ và công ty' },
        { id: 20, option: 'Động viên, khuyến khích, phát triển người khác dựa trên điểm mạnh của họ' },
        { id: 21, option: 'Linh hoạt và thích nghi tốt trong quá trình lãnh đạo, quản lý' }
      ]
    },
    {
      group_name: 'Kiểm soát căng thẳng và thái độ tích cực',
      options: [
        { id: 22, option: 'Thể hiện thái độ tích cực thay vì tiêu cực' },
        { id: 23, option: 'Duy trì năng lượng và tinh thần mạnh mẽ trong công việc và cuộc sống' },
        { id: 24, option: 'Duy trì sự tập trung trong mọi tình huống và trong khủng hoảng' },
        { id: 25, option: 'Bình tĩnh trong các tình huống khó khăn và trước các biến cố' },
        { id: 26, option: 'Thu thập và cân nhắc các dữ kiện trước khi đưa ra quyết định' },
        { id: 27, option: 'Hành động để giải quyết với tình huống căng thẳng và khủng hoảng' },
        { id: 28, option: 'Thích nghi nhanh với các thay đổi và sẵn sàng cải thiện những tình huống xấu nhất' },
      ]
    }]
  },
  {
    id: 13,
    type: 7,
    title: 'Nếu chia theo tỷ lệ 100% của 3 nội dung: Kỹ năng, Kiến thức Chuyên môn và Thái độ (ASK), Anh/Chị, sẽ phân bổ như thế nào?',
    options: [
      'Kỹ năng làm việc',
      'Kiến thức chuyên môn',
      'Thái độ làm việc'
    ]
  },
  {
    id: 14,
    type: 7,
    title: 'Nếu sắp xếp theo thứ tự ưu tiên từ 1 – 3 (1: ưu tiên nhất, 2: ưu tiên nhì, 3: ưu tiên ba) trong việc triển khai hoạt động đào tạo, thì Anh/Chị sẽ sắp xếp ưu tiên như thế nào trong 03 nội dung?',
    options: [
      'Đào tạo về năng lực quản lý, chiến lược',
      'Đào tạo về các kỹ năng làm việc',
      'Đào tạo về văn hoá ứng xử'
    ]
  },
  {
    id: 16,
    type: 8,
    title: 'Anh/Chị vui lòng hãy đánh dấu (√) vào những kỹ năng mà Anh/Chị cho là phù hợp và cần thiết để ĐÀO TẠO giúp bản thân làm việc tốt hơn. (PHÁT TRIỂN NĂNG LỰC LÃNH ĐẠO)',
    options: [
      { id: 23, text: 'Phát triển năng lực lãnh đạo thời kỳ VUCA' },
      { id: 24, text: 'Xây dựng chiến lược công ty theo xu hướng chuyển đổi số 4.0' },
      { id: 25, text: 'Lãnh đạo chủ động' },
      { id: 26, text: 'Lãnh đạo tỉnh thức' },
      { id: 27, text: 'Lãnh đạo đột phá' },
      { id: 28, text: 'Phát triển đội ngũ lãnh đạo kế thừa (Nextgen Leaders)' },
    ]
  },
  {
    id: 17,
    type: 8,
    title: 'QUẢN LÝ CẤP TRUNG',
    options: [
      { id: 29, text: 'Phát triển năng lực quản lý cấp trung' },
      { id: 30, text: 'Kỹ năng quản lý đội ngũ và phát triển nhóm người dùng' },
      { id: 31, text: 'Phát triển và quản lý nhân tài (Talent Management)' },
      { id: 32, text: 'Năng lực quản lý và huấn luyện nhân viên' },
      { id: 33, text: 'Bộ 10 kỹ năng thiết yếu dành cho đội ngũ Quản lý cấp trung' },
      { id: 34, text: 'Lập kế hoạch, thực thi và quản lý' },
    ]
  },
  {
    id: 18,
    type: 8,
    title: 'BÁN HÀNG & DỊCH VỤ KHÁCH HÀNG',
    options: [
      { id: 35, text: 'Kỹ năng bán hàng và đàm phán bán hàng' },
      { id: 36, text: 'Trở thành người bán hàng truyền cảm hứng' },
      { id: 37, text: 'Quản trải nghiệm khách hàng CEM' },
      { id: 38, text: 'Kỹ năng thiết lập và kết nối khách hàng (Netwoking Skills)' },
      { id: 39, text: 'Kỹ năng bán hàng B2B và quản lý Key Account' },
      { id: 40, text: 'Kỹ năng phát triển tâm lý giao tiếp ứng xử trong bán hàng.' },
    ]
  },
  {
    id: 19,
    type: 8,
    title: 'QUẢN TRỊ NHÂN SỰ - L&D',
    options: [
      { id: 41, text: 'Quản trị nhân sự thời kỳ chuyển đổi số 4.0' },
      { id: 42, text: 'Chiến lược xây dựng và phát triển năng lực L&D' },
      { id: 43, text: 'Xây dựng từ điển năng lực quản lý chuẩn Quốc tế' },
      { id: 44, text: 'Đào tạo và phát triển giảng viên nội bộ (Train the Trainer)' },
      { id: 45, text: 'Xây dựng hệ thống đào tạo doanh nghiệp hiệu quả' },
      { id: 46, text: 'Kỹ năng kết nối và tư vấn nhân sự cho doanh nghiệp' },
    ]
  },
  {
    id: 20,
    type: 8,
    title: 'KỸ NĂNG MỀM PHÁT TRIỂN NHÂN VIÊN',
    options: [
      { id: 47, text: 'Kỹ năng tạo động lực làm việc' },
      { id: 48, text: 'Kỹ năng thuyết trình và báo cáo' },
      { id: 49, text: 'Kỹ năng xây dựng lộ trình kế hoạch phát triển cá nhân (IDP)' },
      { id: 50, text: 'Xây dựng hình ảnh cá nhân chuyên nghiệp' },
      { id: 51, text: 'Kỹ năng quản lý và kiểm soát xung đột' },
      { id: 52, text: 'Kỹ năng tạo ảnh hưởng với đồng nghiệp' },
    ]
  },
  {
    id: 21,
    type: 8,
    title: 'KỸ NĂNG LÀM VIỆC CHUYÊN NGHIỆP',
    options: [
      { id: 53, text: 'Kỹ năng lập kế hoạch công việc' },
      { id: 54, text: 'Kỹ năng tự thay đổi và thích nghi' },
      { id: 55, text: 'Kỹ năng tư duy và giải quyết vấn đề' },
      { id: 56, text: 'Kỹ năng quản lý thời gian hiệu quả' },
      { id: 57, text: 'Kỹ năng làm việc đội nhóm' },
      { id: 58, text: 'Kỹ năng giao tiếp ứng xử nơi công sở' },
    ]
  },
  {
    id: 22,
    type: 8,
    title: 'QUẢN TRỊ SẢN SUẤT HIỆN ĐẠI',
    options: [
      { id: 59, text: 'Đào tạo, tư vấn dự án Lean Sixsigma Black Belt' },
      { id: 60, text: 'Quản lý sản xuất thời kỳ chuyển đổi số 4.0' },
      { id: 61, text: '07 công cụ kiểm soát chất lượng QCC' },
      { id: 62, text: '06 trụ cột dành cho nhà Quản lý sản xuất' },
      { id: 63, text: 'Xây dựng tinh thần owership trong nhà máy' },
      { id: 64, text: 'Kỹ năng quản lý dành cho Quản lý nhà máy' },
    ]
  },
  {
    id: 23,
    type: 8,
    title: 'KỸ NĂNG QUẢN LÝ ĐỘI NGŨ',
    options: [
      { id: 65, text: 'Kỹ năng tư vấn, hướng dẫn nhân viên (Coaching on Job)' },
      { id: 66, text: 'Kỹ năng quản lý đội nhóm làm việc hiệu quả' },
      { id: 67, text: 'Kỹ năng dẫn dắt đội ngũ và tạo động lực' },
      { id: 68, text: 'Kỹ năng giao việc và phân công phân nhiệm' },
      { id: 69, text: 'Kỹ năng tạo networking trong tổ chức' },
      { id: 70, text: 'Kỹ năng quản trị sự thay đổi và kiểm soát xung đột.' },
    ]
  },
  {
    id: 11,
    type: 2,
    title: 'Hãy đề xuất thêm những kỹ năng chưa được kiệt kê ở trên mà bạn cho rằng cần thiết để ĐÀO TẠO giúp bản thân làm việc tốt hơn',
    row_number: 10
  },
  {
    id: 12,
    type: 2,
    title: 'Đề xuất thêm ý kiến khác nếu Anh/Chị nhận thấy tình trạng khó khăn đang tồn tại tại Công ty/Phòng/Ban/Bộ phận mà Anh/Chị đang phụ trách',
    row_number: 10
  }
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
    const filtered = answer.filter(el => {
      return el !== undefined
    })
    filtered.map((item, i) => {
      const index = data.findIndex(e => e.id === item.id)
      if (data[index].type === 2 || data[index].type === 7) {
        filtered[i] = { ...filtered[i], data: filtered[i].data ? filtered[i].data.join('//') : null }
      } else if (data[index].type === 4) {
        filtered[i] = { ...filtered[i], data: filtered[i].data ? filtered[i].data.note ? filtered[i].data.note : filtered[i].data.selected : null }
      }
    })

    console.log({
      survey_list_id: 3,
      temp_user: tempId,
      result: filtered
    })
    axios
      .post('survey/upload-result', {
        survey_list_id: 3,
        temp_user: tempId,
        result: filtered
      })
      .then(res => {
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
        {status ?
          <Result
            title="Chúc mừng bạn đã hoàn thành bài khảo sát"
          />
          :
          <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 30 }}>
            {!detectMobile() && <Steps current={current} size="small" onChange={c => setCurrent(c)} type="navigation">
              {data.map((item, index) => (
                <Step key={index} title={index > 0 ? 'Câu ' + parseInt(index + 1) : 'Giới thiệu'} />
              ))}
            </Steps>}
            <div style={{ marginTop: 30 }}>
              <Survey data={data[current]} index={current + 1}
                answer={answer}
                setAnswer={setAnswer}
              />
            </div>
            <div style={{ margin: '15px auto', width: !detectMobile() && '25%' }}>
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
          </div>
        }
      </Spin>
      <UserFooterLayout />
    </>
  )
}

export default TakeSurvey

const UserHeaderLayout = () => {
  return <header className="ifa-header" style={{ height: 150, backgroundColor: 'white' }}>
    <Navbar bg="" expand="lg">
      <Navbar.Brand href="/">
        <LazyImage src={process.env.PUBLIC_URL + '/assets/img/web/static/LogoCp.png'} alt="logo" />
      </Navbar.Brand>
    </Navbar>
  </header>
}