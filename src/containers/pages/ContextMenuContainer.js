import React from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import IntlMessages from 'helpers/IntlMessages'
import { Modal } from 'antd'

const { confirm } = Modal

const ContextMenuContainer = ({ onContextMenu, onContextMenuClick }) => {
  const showConfirm = (e, data) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa dữ liệu này?',
      onOk() {
        onContextMenuClick(e, data)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <ContextMenu id="menu_id" onShow={e => onContextMenu(e, e.detail.data)}>
      <MenuItem onClick={onContextMenuClick} data={{ action: 'edit' }}>
        <i className="simple-icon-docs" /> <span><IntlMessages id="button.rc.edit" /></span>
      </MenuItem>
      {/* <MenuItem onClick={onContextMenuClick} data={{ action: 'move' }}>
        <i className="simple-icon-drawer" /> <span>Move to archive</span>
      </MenuItem> */}
      <MenuItem onClick={showConfirm} data={{ action: 'delete' }}>
        <i className="simple-icon-trash" /> <span><IntlMessages id="button.rc.delete" /></span>
      </MenuItem>
    </ContextMenu>
  )
}

export default ContextMenuContainer
