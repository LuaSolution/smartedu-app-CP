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

const SingleChoice = ({ title, choices, setChoices }) => {
    useEffect(() => {
        if (choices === null) {
            setChoices([
                { content: 'Đúng', is_true: true },
                { content: 'Sai', is_true: false }
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
        return <Row>
            <Col flex={'auto'}>
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
                    <Input value={item.content}
                        onChange={e => changeValueChoice(e.target.value, index)} />
                </InputGroup>
            </Col>
        </Row>
    }

    return <>
        <h2>
            <b>{title}</b>
        </h2>
        {choices && choices.map((value, index) => gennerateChoice(value, index))}
    </>
}

export default SingleChoice