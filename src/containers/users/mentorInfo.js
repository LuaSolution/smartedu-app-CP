import React, { useContext, useState, useEffect, useRef } from 'react'
import { Table, Input, Button, Popconfirm, Form, Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const EditableContext = React.createContext(null)

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm()
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    )
}

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const form = useContext(EditableContext)
    useEffect(() => {
        if (editing) {
            inputRef.current.focus()
        }
    }, [editing])

    const toggleEdit = () => {
        setEditing(!editing)
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        })
    }

    const save = async () => {
        try {
            const values = await form.validateFields()
            toggleEdit()
            handleSave({ ...record, ...values })
        } catch (errInfo) {
            console.log('Save failed:', errInfo)
        }
    }

    let childNode = children

    if (editable) {
        childNode = editing ? (
            <Form.Item
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        )
    }

    return <td {...restProps}>{childNode}</td>
}

const MentorInfo = ({ title, dataSource = [], setDataSource }) => {
    useEffect(() => {
        if (dataSource) {
            //add key
            const data = dataSource.map((item, index) => {
                return {
                    key: index,
                    ...item
                }
            })
            console.log(data)
            setDataSource(data)
        }
    }, []);

    const _columns = [
        {
            dataIndex: 'content',
            width: '90%',
            editable: true,
        },
        {
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.key)}>
                        <Button type="danger" icon={<DeleteOutlined />} size={'small'} />
                    </Popconfirm>
                ) : null,
        },
    ]

    const handleDelete = (key) => {
        setDataSource(dataSource.filter((item) => item.key !== key))
    }

    const handleAdd = () => {
        const newData = {
            key: dataSource.length,
            content: 'Dòng mới'
        }
        setDataSource([...dataSource, newData])
    }

    const handleSave = (row) => {
        const newData = [...dataSource]
        const index = newData.findIndex((item) => row.key === item.key)
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setDataSource(newData)
    }

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    }

    const columns = _columns.map((col) => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        }
    })

    return <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={title}
        extra={<Button
            onClick={handleAdd}
            size="small"
            type="primary"
            style={{ marginBottom: 16 }}>Thêm thông tin</Button>}
    >
        <Table showHeader={false}
            components={components}
            rowClassName='editable-row'
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
        />
    </Card>

}

export default MentorInfo