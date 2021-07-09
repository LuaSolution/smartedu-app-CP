import React from 'react'
import styled from 'styled-components'
import {
    CourseContentFullWrapper as FullWrapper,
    CourseContentWrapper as Wrapper,
    CourseContentListTab as ListTab
} from 'atoms'
import DownloadDocument from './downloadDocumentSection'
import Discuss from './discussSection'
import AskMentor from './askMentorSection'
import LectureContent from './lectureContent'
import { CloudDownloadOutlined, QuestionCircleOutlined, MessageOutlined } from '@ant-design/icons'
import 'assets/user/ifa-course-main-content.css'
import 'assets/user/course_content.scss'

const CourseMainContent = () => {

    const handle = event => {
        if (event.keyCode === 27) {
            event.preventDefault()
            document.querySelector('.ifa-block-content').classList.remove('full-screen')
        }
    }

    // const toggleLeftMenu = (e, type) => {
    //     e.preventDefault()
    //     if (type == 'show')
    //         document.getElementById('full-wrapper').classList.add('show-left-menu')
    //     else
    //         document
    //             .getElementById('full-wrapper')
    //             .classList.remove('show-left-menu')
    // }

    const showTab = (e, id) => {
        let listNode = document.getElementsByClassName('tab-item-content')
        for (let i = 0; i < listNode.length; i++) {
            listNode[i].classList.remove('active')
        }
        listNode = document.getElementsByClassName('item-tab')
        // listNode = document.getElementsByClassName('tab')
        for (let i = 0; i < listNode.length; i++) {
            listNode[i].classList.remove('active')
        }
        listNode = document.getElementsByClassName(id)
        for (let i = 0; i < listNode.length; i++) {
            listNode[i].classList.add('active')
        }
        e.target.classList.add('active')
    }

    return (
        <>
            <FullWrapper id="full-wrapper">
                <Wrapper className="course-content" onKeyUp={handle}>
                    <LectureContent />
                    <div className="bottom">
                        <ListTab className="ifa-block-content list-tab-menu">
                            <div className="item-tab active"
                                onClick={e => showTab(e, 'document-id')}>
                                <span className="box-label-tab-pc">Tài liệu</span>
                                <span className="box-icon-tab-mobile"><CloudDownloadOutlined /></span>
                            </div>
                            <div className="item-tab" onClick={e => showTab(e, 'comment-id')}>
                                <span className="box-label-tab-pc">Thảo luận</span>
                                <span className="box-icon-tab-mobile"><MessageOutlined /></span>
                            </div>
                            <div className="item-tab" onClick={e => showTab(e, 'qa-id')}>
                                <span className="box-label-tab-pc">Đặt câu hỏi</span>
                                <span className="box-icon-tab-mobile"><QuestionCircleOutlined /></span>
                            </div>
                        </ListTab>
                        <div className="wrapper-list-tab-content">
                            <ListTabContent>
                                <DownloadDocument />
                                <Discuss />
                                <AskMentor />
                            </ListTabContent>
                        </div>
                    </div>
                </Wrapper>
            </FullWrapper>
        </>
    )
}

export default React.memo(CourseMainContent)

const ListTabContent = styled.div`
  max-width: 1170px;
  margin: 30px auto 0 auto;
`