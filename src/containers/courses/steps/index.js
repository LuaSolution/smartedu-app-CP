/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import { Wizard, Steps, Step } from 'react-albus'
import { Spin } from 'antd'
import { connect } from 'react-redux'
// import BottomNavigation from 'components/wizard/BottomNavigation'
import TopNavigation from 'components/wizard/TopNavigation'
import CourseInfo from './courseInfo'
import CourseBenefits from './courseBenefits'
import CourseChapters from './courseChapters'
import AddLearner from './addLearner'
import AddDocuments from './addDocuments'

const CourseSteps = ({ addNewFlag,
    editId,
    refStep }) => {

    useEffect(() => {
        refStep.current.context.wizard.push('1')
    }, [editId, addNewFlag])

    return <>
        <Card>
            <CardBody className="wizard wizard-default">
                <Wizard>
                    <TopNavigation
                        className="justify-content-center"
                        disableNav={false}
                        topNavClick={(stepItem, push) => push(stepItem.id + '?p=1')}
                    />

                    <Steps ref={refStep}>
                        <Step
                            id="1"
                            name="Thông tin khóa học"
                            desc="thay đổi thông tin về khóa học"
                        >
                            <div className="wizard-basic-step">
                                <CourseInfo
                                    addNewFlag={addNewFlag}
                                    editId={editId}
                                />
                            </div>
                        </Step>
                        <Step
                            id="2"
                            name="Thông tin khóa học"
                            desc="lợi ích của khóa học mang đến"
                        >
                            <div className="wizard-basic-step">
                                <CourseBenefits
                                    addNewFlag={addNewFlag}
                                    editId={editId}
                                />
                            </div>
                        </Step>
                        <Step
                            id="3"
                            name="Nội dung bài học"
                            desc="quản lý nội dung bài học"
                        >
                            <div className="wizard-basic-step">
                                <CourseChapters
                                    addNewFlag={addNewFlag}
                                    editId={editId}
                                />
                            </div>
                        </Step>
                        <Step
                            id="4"
                            name="Học viên"
                            desc="quản lý học viên của khóa học"
                        >
                            <div className="wizard-basic-step">
                                <AddLearner
                                    addNewFlag={addNewFlag}
                                    editId={editId}
                                />
                            </div>
                        </Step>
                        <Step id="5" name="Tài liệu"
                            desc="tài liệu của khóa học">
                            <div className="wizard-basic-step">
                                <AddDocuments
                                    addNewFlag={addNewFlag}
                                    editId={editId}
                                />
                            </div>
                        </Step>
                    </Steps>

                    {/* <BottomNavigation
                            onClickNext={toNext}
                            onClickPrev={toPrev}
                            className="justify-content-center"
                            prevLabel={<span className="simple-icon-arrow-left" />}
                            nextLabel={<span className="simple-icon-arrow-right" />}
                        /> */}
                </Wizard>
            </CardBody>
        </Card>
    </>
}

export default React.memo(CourseSteps)
