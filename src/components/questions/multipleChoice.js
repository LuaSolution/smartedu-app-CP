import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
    Row,
    Col,
} from 'antd'
import {
    InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
} from 'reactstrap'
import { ABC } from 'defines'

/*
A = 0
B = 1
C = 2
D = 3
*/

const MultipleChoice = forwardRef((props, ref) => {
    const [choices, setChoices] = useState([
        { value: 'đáp án A' },
        { value: 'đáp án B' },
        { value: 'đáp án C' },
        { value: 'đáp án D' },
    ])

    useImperativeHandle(ref, () => (
        { getState: () => { return { choices } } }
    ), [choices])

    const changeValueChoice = (value, index) => {
        let _choices = [...choices]
        if (value !== '') {
            _choices[index] = {
                ..._choices[index],
                value: value,
            }
        }

        setChoices(_choices)
    }

    const onCheck = index => {
        let _choices = [...choices]
        _choices[index] = {
            ..._choices[index],
            checked: !_choices[index].checked,
        }

        setChoices(_choices)
    }

    const gennerateChoice = (item, index) => {
        return <>
            <Row>
                <Col flex={'auto'}>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                {ABC[index]}
                                <Input
                                    addon
                                    type="checkbox"
                                    style={{ marginLeft: 5 }}
                                    checked={item.checked}
                                    onChange={e => onCheck(index)}
                                />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input value={item.value} onChange={e => changeValueChoice(e.target.value, index)} />
                    </InputGroup>
                </Col>
                <Col flex={'10%'}>
                    {/* <DeleteFilled style={{ fontSize: 14, marginLeft: 10 }} /> */}
                </Col>
            </Row>
        </>
    }

    return <>
        <h2>
            <b>{props.title}</b>
        </h2>
        {/* <Row>
                    <Col flex="auto">Nội dung đáp án</Col>
                    <Col flex={'10%'}></Col>
                </Row> */}
        {choices.map((value, index) => gennerateChoice(value, index))}
    </>
})

export default MultipleChoice