/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import { Wizard, Steps, Step } from 'react-albus'
import { Result } from 'antd'
import TopNavigation from 'components/wizard/TopNavigation'
import SurveyListinfo from './surveyListInfo'

const SurveySteps = ({ addNewFlag, editId, slug, title, description, questions, setQuestions, setStep }) => {
    const refStep = useRef()

    useEffect(() => {
        refStep.current.context.wizard.push('1')
    }, [editId, addNewFlag])

    return <Card>
        <CardBody className="wizard wizard-default">
            <Wizard>
                <TopNavigation
                    className="justify-content-center"
                    disableNav={false}
                    topNavClick={(stepItem, push) => {
                        push(stepItem.id + '?p=1')
                        setStep(stepItem.id)
                    }}
                />
                <Steps ref={refStep}>
                    <Step id="1" name="Thông tin bảng khảo sát" >
                        <div className="wizard-basic-step">
                            <SurveyListinfo
                                addNewFlag={addNewFlag}
                                editId={editId}
                                title={title}
                                slug={slug}
                                description={description}
                                questions={questions}
                                setQuestions={setQuestions}
                            />
                        </div>
                    </Step>
                    <Step id="2" name="Thống kê">
                        <div className="wizard-basic-step text-center">
                            <Result
                                status="success"
                                title="Coming soon..."
                            />
                        </div>
                    </Step>
                </Steps>
            </Wizard>
        </CardBody>
    </Card >
}

export default SurveySteps
