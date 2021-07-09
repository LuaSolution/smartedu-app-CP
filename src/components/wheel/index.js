import React, { useState, useEffect } from 'react'
import { rainbowColors } from 'defines'
import Tour from 'reactour'
import './style.css'
import { ConfettiModal } from 'atoms'

const steps = [
    {
        selector: '.first-step',
        content: 'Nhấn vào vòng xoay may mắn để bắt đầu',
    },
]

const Wheel = ({ items }) => {
    const [isRolling, setIsRolling] = useState(false)
    const [isTourOpen, setIsTourOpen] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null)
    const [content, setDisplayContent] = useState(null)
    const [toggleModal, setToggleModal] = useState(false)

    const selectItem = () => {
        if (selectedItem) {
            setSelectedItem(null)
        } else {
            setIsRolling(true)
            const _selectedItem = Math.floor(Math.random() * items.length)
            setSelectedItem(_selectedItem)
            const loop = setInterval(() => {
                setDisplayContent(items[_selectedItem])
                setToggleModal(true)
                clearInterval(loop)
                setSelectedItem(null)
                setIsRolling(false)
            }, 4000)
        }
    }

    const wheelVars = {
        '--nb-item': items.length,
        '--selected-item': selectedItem || ''
    }

    const spinning = selectedItem !== null ? 'spinning' : ''

    return <>
        <div className="wheel-container first-step" >
            <div className={`wheel ${spinning}`} style={wheelVars} onClick={() => {
                if (!isRolling) {
                    setIsTourOpen(false)
                    selectItem()
                }
            }}>
                {items && items.map((item, index) => (
                    <div className="wheel-item" key={index}
                        style={{ '--item-nb': index, backgroundColor: rainbowColors[index] }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div >
        <Tour
            steps={steps}
            isOpen={isTourOpen}
            onRequestClose={() => setIsTourOpen(false)}
        />
        <ConfettiModal type={3} modal={toggleModal} closeModal={() => {
            setToggleModal(false)
        }} content={'Chúc mừng bạn đã trúng ' + content} />
    </>
}

export default Wheel