import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'
import {
  Input,
  Select,
  DatePicker,
  Upload,
  Typography,
  Tabs,
  Row,
  Col,
  Spin,
} from 'antd'
import momentTime from 'helpers/moment'
import useFormInput from 'helpers/useFormInput'
import useFormNumber from 'helpers/useFormNumber'
import useFormSelect from 'helpers/useFormSelect'
import useFormDatePicker from 'helpers/useFormDatePicker'
import { errorMessage, successMessage } from 'helpers/globalMessage'
import { PlusOutlined } from '@ant-design/icons'
import { getBase64 } from 'helpers/Utils'
import { AVATAR_PATH } from 'defines'
import MentorInfo from './mentorInfo'
import detectMobile from 'helpers/detectMobile'

const randomUsername = (f_name, l_name) => {
  const name = f_name + ' ' + l_name
  const nameArr = name.split(' ')
  let username = nameArr[nameArr.length - 1].toLowerCase()
  nameArr.splice(-1)
  nameArr.map((item) => {
    username += item.substring(0, 1).toLowerCase()
  })
  username += Math.floor(Math.random() * 100) + 1
  return username
}

const AddNewModal = ({
  modalOpen,
  toggleModal,
  editId,
  addNewFlag,
  addNew,
  editUser,
}) => {
  const f_name = useFormInput()
  const l_name = useFormInput()
  const email = useFormInput()
  const address = useFormInput()
  const username = useFormInput()
  const birthday = useFormDatePicker()
  const created_at = useFormInput()
  const gender = useFormInput()
  const level = useFormSelect(3)
  const phone = useFormNumber()
  const [image, setImage] = useState(null)
  const [fileList, setFileList] = useState([])
  const partner = useFormSelect()
  const area = useFormSelect()
  const department = useFormSelect()
  const position = useFormSelect()

  const company_profile = useFormInput()
  const department_profile = useFormInput()
  const position_profile = useFormInput()
  const job_profile = useFormInput()

  const [loading, setLoading] = useState(false)

  const [qualification, setQualification] = useState([])
  const [workExperience, setWorkExperiencet] = useState([])
  const [teachingExperience, setTeachingExperience] = useState([])
  const [fieldConsulting, setFieldConsulting] = useState([])

  const [partners, setPartners] = useState([])
  const [areas, setAreas] = useState([])
  const [departments, setDepartments] = useState([])
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const fetchPartners = async () => {
      axios
        .get('admin/partners/all')
        .then((res) => {
          return res.data
        })
        .then((data) => {
          setPartners(data.data)
        })

      axios.get('admin/areas/all').then((res) => {
        if (res.data.status === 200) {
          setAreas(res.data.data)
        }
      })

      axios
        .get('admin/departments/all')
        .then((res) => {
          return res.data
        })
        .then((data) => {
          setDepartments(data)
        })

      axios
        .get('admin/positions/all')
        .then((res) => {
          return res.data
        })
        .then((data) => {
          setPositions(data)
        })
    }

    fetchPartners()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!addNewFlag && editId) {
      setLoading(true)
      axios
        .get('admin/user/get-info/' + editId)
        .then((res) => {
          return res.data
        })
        .then((data) => {
          f_name.setValue(data.first_name)
          l_name.setValue(data.last_name)
          email.setValue(data.email)
          phone.setValue(data.phone)
          address.setValue(data.address)
          username.setValue(data.username)
          gender.setValue(data.gender)
          birthday.setValue(data.birthday)
          level.setValue(data.level)
          partner.setValue(data.partner_id)
          area.setValue(data.area_id)
          department.setValue(data.department_id)
          position.setValue(data.position_id)
          created_at.setValue(data.created_at)
          company_profile.setValue(data.partner)
          department_profile.setValue(data.department)
          position_profile.setValue(data.position)
          job_profile.setValue(data.job)
          setFileList([
            { url: AVATAR_PATH + data.id + '.webp?' + Math.random() },
          ])

          if (data.level === 2) {
            setQualification(data.qualifications)
            setWorkExperiencet(data.workExperience)
            setTeachingExperience(data.teachingExperience)
            setFieldConsulting(data.fieldConsulting)
          }
        })
        .finally(() => setLoading(false))
    } else {
      f_name.setValue(null)
      l_name.setValue(null)
      email.setValue(null)
      phone.setValue(null)
      address.setValue(null)
      username.setValue(null)
      gender.setValue(null)
      birthday.setValue(Date.now())
      level.setValue(3)
      partner.setValue(null)
      area.setValue(null)
      department.setValue(null)
      position.setValue(null)
      company_profile.setValue(null)
      department_profile.setValue(null)
      position_profile.setValue(null)
      job_profile.setValue(null)
      setFileList([])
      setQualification([])
      setWorkExperiencet([])
      setTeachingExperience([])
      setFieldConsulting([])
    }
  }, [editId, addNewFlag]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {
    setLoading(true)
    let _username = username.value
    if (username.value === '') {
      _username = randomUsername(f_name.value, l_name.value)
      username.setValue(_username)
    }

    let params = {
      first_name: f_name.value,
      last_name: l_name.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      gender: parseInt(gender.value),
      birthday: birthday.getValue(),
      level: parseInt(level.value),
      partner_id: parseInt(partner.value),
      area_id: parseInt(area.value),
      department_id: parseInt(department.value),
      position_id: parseInt(position.value),
      job: job_profile.value,
      partner: company_profile.value,
      department: department_profile.value,
      position: position_profile.value,
      image: image || null,
    }

    if (level.value === 2) {
      params = {
        ...params,
        qualification: qualification,
        workExperience: workExperience,
        teachingExperience: teachingExperience,
        fieldConsulting: fieldConsulting,
      }
    }

    if (!addNewFlag && editId) {
      axios
        .post('admin/user/updateUser', { id: editId, ...params })
        .then((res) => {
          if (res.data.status === 200) {
            successMessage('Cập nhật người dùng thành công')
            editUser({ id: editId, created_at: null, ...params })
          } else {
            errorMessage('Cập nhật người dùng thất bại')
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    } else {
      axios
        .post('admin/user/create', {
          username: _username,
          ...params,
          password: '123456',
        })
        .then((res) => {
          if (res.data.failed) {
            errorMessage('Tạo người dùng thất bại')
          } else {
            successMessage('Tạo người dùng thành công')
            addNew({
              id: res.data,
              username: _username,
              created_at: null,
              ...params,
            })
          }
        })
        .finally(() => {
          setLoading(false)
          toggleModal()
        })
    }
  }

  const handleChangeAvatar = async ({ fileList }) => {
    fileList.length > 1 ? setFileList([fileList[1]]) : setFileList(fileList)
    if (fileList[0] && 'originFileObj' in fileList[0]) {
      setImage(await getBase64(fileList[0].originFileObj))
    }
  }

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      style={{ maxWidth: detectMobile() ? '100%' : '50%' }}
    >
      <ModalHeader toggle={toggleModal}>
        {!addNewFlag && editId
          ? 'Thay đổi thông tin người dùng'
          : 'Thêm mới người dùng'}
      </ModalHeader>
      <Spin spinning={loading}>
        <ModalBody style={{ overflow: 'auto' }} className="scrollbar">
          <Tabs centered>
            <Tabs.TabPane tab="Thay đổi thông tin" key="1">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Input {...f_name} prefix="Họ: " allowClear />
                </Col>
                <Col span={12}>
                  <Input {...l_name} prefix="Tên: " allowClear />
                </Col>
                <Col span={12}>
                  <Input {...email} prefix="Email: " allowClear />
                </Col>
                <Col span={12}>
                  <Input {...phone} prefix="Số điện thoại: " allowClear />
                </Col>
                <Col span={12}>
                  <Input
                    {...company_profile}
                    prefix="Công ty (profile): "
                    allowClear
                  />
                </Col>
                <Col span={12}>
                  <Input
                    {...department_profile}
                    prefix="Phòng ban (profile): "
                    allowClear
                  />
                </Col>
                <Col span={12}>
                  <Input
                    {...position_profile}
                    prefix="Chức vụ (profile): "
                    allowClear
                  />
                </Col>
                <Col span={12}>
                  <Input
                    {...job_profile}
                    prefix="Nghề nghiệp (profile): "
                    allowClear
                  />
                </Col>
                <Col span={24}>
                  <Input {...address} prefix="Địa chỉ: " allowClear />
                </Col>

                <Col span={12}>
                  <Select
                    {...level}
                    placeholder="Quyền hạn người dùng"
                    style={{ width: '100%' }}
                  >
                    <Select.Option value={0}>ROOT</Select.Option>
                    <Select.Option value={1}>Quản trị viên</Select.Option>
                    <Select.Option value={2}>Giảng viên</Select.Option>
                    <Select.Option value={3}>Học viên</Select.Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <DatePicker
                    placeholder="Chọn ngày sinh"
                    {...birthday}
                    style={{ width: '100%' }}
                  />
                </Col>

                <Col span={12}>
                  {!addNewFlag && editId ? (
                    <Input
                      readOnly
                      value={username.value}
                      prefix="Tài khoản: "
                    />
                  ) : (
                    <Input {...username} prefix="Tài khoản: " />
                  )}
                </Col>
                <Col span={12}>
                  <input
                    type="radio"
                    checked={gender.value === 1}
                    onChange={(e) => {
                      gender.setValue(1)
                    }}
                  />{' '}
                  <span>Nam</span>
                  <input
                    type="radio"
                    checked={gender.value === 2}
                    onChange={(e) => {
                      gender.setValue(2)
                    }}
                    style={{ marginLeft: 10 }}
                  />{' '}
                  <span>Nữ</span>
                </Col>
                <Col span={12}>
                  <Select
                    showSearch
                    {...partner}
                    style={{ width: '100%' }}
                    placeholder="Chọn công ty"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {partners.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                {departments && positions && (
                  <>
                    <Col span={12}>
                      <Select
                        showSearch
                        {...area}
                        style={{ width: '100%' }}
                        placeholder="Chọn khu vực"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {areas.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={12}>
                      <Select
                        showSearch
                        {...department}
                        style={{ width: '100%' }}
                        placeholder="Chọn phòng ban"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {departments.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={12}>
                      <Select
                        showSearch
                        {...position}
                        style={{ width: '100%' }}
                        placeholder="Chọn chức vụ"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {positions.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                  </>
                )}

                <Col span={12} style={{ height: 150 }}>
                  <Upload
                    action={''}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChangeAvatar}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>
                        {<IntlMessages id="user.upload-avatar" />}
                      </div>
                    </div>
                  </Upload>
                </Col>
              </Row>
            </Tabs.TabPane>
            {level.value === 2 && (
              <Tabs.TabPane tab="Hồ sơ chuyên gia" key="2">
                <MentorInfo
                  title="Trình độ chuyên môn"
                  dataSource={qualification}
                  setDataSource={setQualification}
                />
                <MentorInfo
                  title="Kinh nghiệm làm việc"
                  dataSource={workExperience}
                  setDataSource={setWorkExperiencet}
                />
                <MentorInfo
                  title="Kinh nghiệm giảng dạy"
                  dataSource={teachingExperience}
                  setDataSource={setTeachingExperience}
                />
                <MentorInfo
                  title="Lĩnh vực tư vấn"
                  dataSource={fieldConsulting}
                  setDataSource={setFieldConsulting}
                />
              </Tabs.TabPane>
            )}
          </Tabs>
        </ModalBody>
        <ModalFooter>
          {!addNewFlag && editId && (
            <Typography.Text code>
              Ngày tạo: {momentTime(created_at.value)}
            </Typography.Text>
          )}{' '}
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="user.cancel" />
          </Button>
          <Button color="primary" onClick={onSubmit}>
            <IntlMessages id="user.submit" />
          </Button>
        </ModalFooter>
      </Spin>
    </Modal>
  )
}

export default AddNewModal
