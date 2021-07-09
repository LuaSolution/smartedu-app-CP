import { notification } from 'antd'

const openNotificationWithIcon = (content, type) => {
    notification[type]({
        message: content
    })
}

export const successMessage = (content = '') => {
    openNotificationWithIcon(content, 'success')
}

export const errorMessage = (content = '') => {
    openNotificationWithIcon(content, 'error')
}

