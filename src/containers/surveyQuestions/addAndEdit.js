import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import axios from 'helpers/axios'
import { Form, Input, Spin, Typography, message, Select, Alert } from 'antd'
import momentTime from 'helpers/moment'
import useFormInput from 'helpers/useFormInput'
import useFormSelect from 'helpers/useFormSelect'
import { IMG_ERROR } from 'defines'

import img2 from 'assets/admin/type2.webp'
import img3 from 'assets/admin/type3.webp'
import img4 from 'assets/admin/type4.webp'
import img5 from 'assets/admin/type5.webp'
import img6 from 'assets/admin/type6.webp'
import img7 from 'assets/admin/type7.webp'
import img8 from 'assets/admin/type8.webp'
import img9 from 'assets/admin/type9.webp'
import img10 from 'assets/admin/type10.webp'

import Type4 from './types/type4'
import Type6 from './types/type6'
import Type7 from './types/type7'
import Type8 from './types/type8'
import Type9 from './types/type9'
import Type10 from './types/type10'

const { TextArea } = Input

const layout = {
  labelCol: {
    sm: { span: 7 },
  },
}
const typeList = [
  { id: 2, name: 'Loại 2' },
  { id: 3, name: 'Loại 3' },
  { id: 4, name: 'Loại 4' },
  { id: 5, name: 'Loại 5' },
  { id: 6, name: 'Loại 6' },
  { id: 7, name: 'Loại 7' },
  { id: 8, name: 'Loại 8' },
  { id: 9, name: 'Loại 9' },
  { id: 10, name: 'Loại 10' },
]

const AddNewModal = ({
  modalOpen,
  toggleModal,
  editId,
  addNewFlag,
  addNew,
}) => {
  const title = useFormInput()
  const created_at = useFormInput()
  const type = useFormSelect(2)
  const [loading, setLoading] = useState(false)
  const [_err, setErr] = useState(false)
  const [type4Options, setType4] = useState([''])
  const [type6Options, setType6] = useState([
    {
      group_id: 1,
      option: '',
    },
  ])
  const [type7Options, setType7] = useState([''])
  const [type8Options, setType8] = useState([''])
  const [type9Options, setType9] = useState([''])
  const [type10Options, setType10] = useState([
    {
      option: '',
    },
  ])
  const [surveyGroups, setSurveyGroups] = useState(null)

  useEffect(() => {
    const fetch = () => {
      if (!addNewFlag && editId) {
        axios
          .get('admin/surveys/questions/get-info/' + editId)
          .then((res) => {
            return res.data
          })
          .then((data) => {
            title.setValue(data.title)
            type.setValue(data.type)
            created_at.setValue(data.created_at)
          })
      } else {
        title.setValue(null)
        type.setValue(2)

        setType4([''])
        setType6([
          {
            group_id: 1,
            option: '',
          },
        ])
        setType7([''])
        setType8([''])
        setType9([''])
        setType10([
          {
            option: '',
          },
        ])
        setSurveyGroups(null)
      }

      axios
        .get('admin/surveys/question-categories/get-all')
        .then((res) => {
          return res.data
        })
        .then((data) => {
          if (data.status === 200) {
            setSurveyGroups(data.data)
          }
        })
    }

    fetch()
  }, [editId, addNewFlag]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {
    if (title.value) {
      setErr(false)
      setLoading(true)

      let params = {
        title: title.value,
        type: type.value,
      }

      if (type.value === 4) {
        const options = type4Options.toString().replaceAll(',', '//')
        params = {
          ...params,
          options,
        }
      } else if (type.value === 6) {
        params = {
          ...params,
          options: type6Options,
        }
      } else if (type.value === 7) {
        const options = type7Options.toString().replaceAll(',', '//')
        params = {
          ...params,
          options,
        }
      } else if (type.value === 8) {
        params = {
          ...params,
          options: type8Options,
        }
      } else if (type.value === 9) {
        const options = type9Options.toString().replaceAll(',', '//')
        params = {
          ...params,
          options,
        }
      } else if (type.value === 10) {
        params = {
          ...params,
          options: type10Options,
        }
      }

      if (!addNewFlag && editId) {
        axios
          .post('admin/surveys/questions/update', { ...params, id: editId })
          .then((res) => {
            if (res.data.status === 200) {
              toggleModal()
              message.success('Cập nhật câu hỏi khảo sát thành công')
            } else {
              message.errorr('Cập nhật câu hỏi khảo sát thất bại')
            }
          })
          .finally(() => setLoading(false))
      } else {
        axios
          .post('admin/surveys/questions/create', params)
          .then((res) => {
            if (res.data.status === 200) {
              message.success('Tạo câu hỏi khảo sát thành công')
              addNew({
                id: res.data.data,
                title: title.value,
                type: type.value,
                created_at: null,
              })
              toggleModal()
            } else {
              message.errorr('Tạo câu hỏi khảo sát thất bại')
            }
          })
          .finally(() => setLoading(false))
      }
    } else {
      setErr(true)
    }
  }

  const renderReviewImg = () => {
    switch (type.value) {
      case 2:
        return img2
      case 3:
        return img3
      case 4:
        return img4
      case 5:
        return img5
      case 6:
        return img6
      case 7:
        return img7
      case 8:
        return img8
      case 9:
        return img9
      case 10:
        return img10
      default:
        return ''
    }
  }

  const renderTypeOption = () => {
    switch (type.value) {
      case 4:
        return <Type4 type={type4Options} setType={setType4} />
      case 6:
        return (
          <Type6
            type={type6Options}
            setType={setType6}
            surveyGroups={surveyGroups}
          />
        )
      case 7:
        return <Type7 type={type7Options} setType={setType7} />
      case 8:
        return <Type8 type={type8Options} setType={setType8} />
      case 9:
        return <Type9 type={type9Options} setType={setType9} />
      case 10:
        return <Type10 type={type10Options} setType={setType10} />
      default:
        return null
    }
  }

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      style={{ maxWidth: '800px' }}
    >
      <ModalHeader toggle={toggleModal}>
        {!addNewFlag && editId
          ? 'Thông tin câu hỏi khảo sát'
          : 'Thêm mới câu hỏi khảo sát'}
      </ModalHeader>
      <ModalBody>
        <Spin spinning={loading}>
          {_err && (
            <Alert
              message="Vui lòng nhập đầy đủ thông tin"
              style={{ marginBottom: 10 }}
              type="error"
              showIcon
            />
          )}
          <Form {...layout} layout="vertical" size="medium">
            <Form.Item>
              <img
                src={renderReviewImg()}
                alt="logo"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = IMG_ERROR
                }}
                style={{ width: '100%', height: 200, border: '1px solid #eee' }}
              />
            </Form.Item>
            <Form.Item label="Tiêu đề câu hỏi">
              <TextArea rows={4} showCount {...title} />
            </Form.Item>
            {!addNewFlag && editId ? (
              <Form.Item label="Loại khảo sát">
                <Select
                  disabled={true}
                  placeholder="Chọn loại câu hỏi"
                  optionFilterProp="children"
                  {...type}
                >
                  {typeList.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <>
                <Form.Item label="Loại khảo sát">
                  <Select
                    showSearch
                    placeholder="Chọn loại câu hỏi"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    {...type}
                  >
                    {typeList.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Lựa chọn">{renderTypeOption()}</Form.Item>
              </>
            )}
          </Form>
        </Spin>
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
          Cập nhật
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AddNewModal
