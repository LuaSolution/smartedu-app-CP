import React from 'react'
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  CustomInput,
  Badge,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { ContextMenuTrigger } from 'react-contextmenu'
import { Colxx } from 'components/common/CustomBootstrap'
import { badgeColor, userLevel, GENDER, genderColor, IMG_ERROR, AVATAR_PATH } from 'defines'
import momentTime from 'helpers/moment'

const ImageListView = ({ user, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={user.id}>
      <ContextMenuTrigger id="menu_id" data={user.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, user.id)}
          className={classnames({
            active: isSelect,
          })}
        >
          <div className="position-relative">
            <NavLink to={`?p=${user.id}`} className="w-40 w-sm-100">
              <CardImg top alt={user.name} src={AVATAR_PATH + user.id + '.webp?' + Math.random()} onError={(e) => {
                e.target.onerror = null
                e.target.src = IMG_ERROR
              }} />
            </NavLink>
            <Badge
              color={badgeColor[user.level]}
              pill
              className="position-absolute badge-top-left"
            >
              {userLevel[user.level]}
            </Badge>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${user.id}`}
                  checked={isSelect}
                />
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle>{user.name} {''}
                  {user.gender === null ? null : <Badge color={genderColor[user.gender]} pill>
                    {GENDER[user.gender]}
                  </Badge>}
                </CardSubtitle>
                <CardText className="text-muted text-medium mb-0 font-weight-light">
                  <i className="iconsminds-mail"></i> {user.email}
                  <br />
                  <i className="iconsminds-phone-3"></i> {user.phone}
                  <br />
                  <i className="iconsminds-user"></i> {user.username + ' đã tạo ' + momentTime(user.created_at)}
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  )
}

export default React.memo(ImageListView)
