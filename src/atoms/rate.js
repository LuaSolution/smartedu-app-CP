import React from 'react'
import FullStar from './fullStar'
import EmptyStar from './emptyStar'

export default (rate) => {
    return [...Array(5)].map((x, i) => {
        return i < rate ? <FullStar key={i} /> : <EmptyStar key={i} />
    })
}