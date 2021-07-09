import React from 'react'
import { CardText } from 'reactstrap'
import 'assets/user/news.css'
export default ({ content }) => (
  <CardText>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </CardText>
)