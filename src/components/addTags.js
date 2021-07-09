import React, { useEffect, useState, useRef } from 'react'
import { Tag, Input } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import { PlusOutlined } from '@ant-design/icons'

const COLOR = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]

const AddTag = ({ tags, updateTags }) => {
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef()

    useEffect(() => {
        inputVisible && inputRef.current.focus({
            cursor: 'start',
        })
    }, [inputVisible])

    const handleClose = removedTag => {
        const _tags = tags.filter(tag => tag !== removedTag)
        updateTags(_tags.toString())
    }

    const handleInputChange = e => setInputValue(e.target.value.replaceAll(",", ""))

    const handleInputConfirm = () => {
        let _tags = tags ? [...tags] : []
        if (inputValue && inputValue.length > 2 && _tags.indexOf(inputValue) === -1) {
            _tags = [..._tags, inputValue]
        }
        updateTags(_tags.toString())
        setInputValue('')
        setInputVisible(false)
    }

    return <>
        <div style={{ marginBottom: 16 }}>
            <TweenOneGroup enter={{
                scale: 0.8,
                opacity: 0,
                type: 'from',
                duration: 100,
                onComplete: e => e.target.style = ''
            }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
            >
                {tags && tags.map((tag, index) => {
                    return <span key={index} style={{ display: 'inline-block' }}>
                        <Tag closable
                            color={COLOR[index]}
                            onClose={e => {
                                e.preventDefault()
                                handleClose(tag)
                            }}>
                            {tag}
                        </Tag>
                    </span>
                })}
            </TweenOneGroup>
        </div>
        <Input
            ref={inputRef}
            type={inputVisible ? "text" : "hidden"}
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
        />
        {!inputVisible && <Tag onClick={() => setInputVisible(true)}
            color="#2db7f5">
            <PlusOutlined />Thêm tag
            </Tag>
        }
    </>
}

export default AddTag