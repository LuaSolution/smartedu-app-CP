import React from 'react'
import {
    Badge
} from 'reactstrap'

export default type => {
    switch (type) {
        case 2:
            return <Badge color="primary" pill>Loại 2</Badge>
        case 3:
            return <Badge color="secondary" pill>Loại 3</Badge>
        case 4:
            return <Badge color="warning" pill>Loại 4</Badge>
        case 5:
            return <Badge color="danger" pill>Loại 5</Badge>
        case 6:
            return <Badge color="info" pill>Loại 6</Badge>
        case 7:
            return <Badge color="light" pill>Loại 7</Badge>
        case 8:
            return <Badge color="dark" pill>Loại 8</Badge>
        case 9:
            return <Badge color="success" pill>Loại 9</Badge>
        case 10:
            return <Badge color="primary" pill>Loại 10</Badge>
        default:
            return <Badge color="dark" pill>Chưa phân loại</Badge>
    }
}