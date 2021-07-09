import React from 'react'
import { Card, CustomInput, Badge } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { ContextMenuTrigger } from 'react-contextmenu'
import { Colxx } from 'components/common/CustomBootstrap'
import { badgeColor, userLevel, genderColor, GENDER, IMG_ERROR, AVATAR_PATH } from 'defines'
import momentTime from 'helpers/moment'

const ThumbListView = ({ user, isSelect, collect, onCheckItem }) => {
  return <Colxx xxs="12" key={user.id} className="mb-3">
    <ContextMenuTrigger id="menu_id" data={user.id} collect={collect}>
      <Card
        onClick={event => onCheckItem(event, user.id)}
        className={classnames('d-flex flex-row', {
          active: isSelect,
        })}
      >
        <NavLink to={`?p=${user.id}`} className="d-flex">
          <img src={AVATAR_PATH + user.id + '.webp?' + Math.random()}
            className="list-thumbnail responsive border-0 card-img-left"
            onError={e => {
              e.target.onerror = null
              e.target.src = IMG_ERROR
            }}
          />
        </NavLink>
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <NavLink to={`?p=${user.id}`} className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {user.first_name + ' ' + user.last_name} {' '}
                <Badge color={badgeColor[user.level]} pill style={{ fontSize: 10 }}>
                  {userLevel[user.level]}
                </Badge> {' '}
                {user.gender === null ? null : <Badge color={genderColor[user.gender]} pill>
                  {GENDER[user.gender]}
                </Badge>}
              </p>
            </NavLink>
            <p className="mb-1 text-muted text-medium w-25 w-sm-100">
              <i className="iconsminds-mail"></i>{user.email}
            </p>
            <p className="mb-1 text-muted text-medium w-20 w-sm-100">
              <i className="iconsminds-phone-3"></i> {user.phone}
            </p>
            <p className="mb-1 text-muted text-medium w-30 w-sm-100">
              <i className="iconsminds-user"></i>  {momentTime(user.created_at)}
            </p>
            {/* <div className="w-15 w-sm-100">
                <Badge color={genderColor[user.level]} pill>
                  {gender[user.level]}
                </Badge>
              </div> */}
          </div>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${user.id}`}
              checked={isSelect}
              onChange={() => { }}
            />
          </div>
        </div>
      </Card>
    </ContextMenuTrigger>
  </Colxx>
}

export default React.memo(ThumbListView)
