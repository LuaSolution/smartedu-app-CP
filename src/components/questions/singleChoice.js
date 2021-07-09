import React, { useEffect } from 'react'
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

const SingleChoice = ({ title, choices, setChoices, selected = null }) => {
    useEffect(() => {
        if (choices === null) {
            setChoices([
                { content: 'đáp án A', is_true: true },
                { content: 'đáp án B', is_true: false },
                { content: 'đáp án C', is_true: false },
                { content: 'đáp án D', is_true: false },
            ])
        }
    }, [choices])

    const changeValueChoice = (value, index) => {
        let _choices = [...choices]
        if (value !== '') {
            _choices[index] = {
                ..._choices[index],
                content: value,
            }
        }

        setChoices(_choices)
    }

    const gennerateChoice = (item, index) => {
        return <Row key={index}>
            <Col flex='auto'>
                <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            {ABC[item.char]}
                            <Input
                                addon
                                type="radio"
                                style={{ marginLeft: 5 }}
                                checked={item.is_true}
                                onChange={e => {
                                    const _choices = choices.map((i, jIndex) => {
                                        return {
                                            ...i,
                                            is_true: jIndex == index
                                        }
                                    })

                                    setChoices(_choices)
                                }}
                            />
                        </InputGroupText>
                    </InputGroupAddon>
                    {selected ?
                        selected === item.id && item.is_true ? <Input value={item.content} style={{ backgroundColor: '#52c41a' }} />
                            :
                            selected === item.id && !item.is_true ? <Input value={item.content} style={{ backgroundColor: '#ff4d4f', color: 'white' }} />
                                :
                                <Input value={item.content}
                                    onChange={e => changeValueChoice(e.target.value, index)} />
                        :
                        <Input value={item.content}
                            onChange={e => changeValueChoice(e.target.value, index)} />}
                </InputGroup>
            </Col>
            <Col flex='10%'>
                {/* <DeleteFilled style={{ fontSize: 14, marginLeft: 10 }} /> */}
            </Col>
        </Row>
    }

    return <>
        <div dangerouslySetInnerHTML={{ __html: title }} style={{ margin: 0 }} />
        {choices && choices.map((value, index) => gennerateChoice(value, index))}
    </>
}

export default SingleChoice