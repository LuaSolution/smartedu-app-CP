import React from "react";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import Job from "atoms/home/Job.svg";
import Group from "atoms/home/Company.svg";
import { NoData } from "atoms";

const FriendFeed = () => (
  <div className="box-friend-feed">
    <div className="header-friend-feed">
      <div className="title-header">Danh sách bạn bè</div>
      <div className="input-search-friend">
        <SearchOutlined />
        <input className="style-input-search-friend" placeholder="Tìm tên bạn bè" />
      </div>
      <div />
    </div>
    <div className="box-list-friend-request">
    {process.env.REACT_APP_LOCAL === "false" ? <NoData/>:
      <div className="item-request-user-friend">
        <div className="image-left">
          <img src={null} alt={""} className="style-image-left" />
        </div>
        <div className="content-right">
          <div className="fullname-user">
            Nguyễn Trần Thùy Quyên
            </div>
          <div className="description-user">
            <img src={Job} alt={""} className="icon-left" />
              Nhân viên văn phòng
            </div>
          <div className="description-user">
            <img src={Group} alt={""} className="icon-left" />
              Công ty CP Group
            </div>
          <div className="list-btn-bottom">
            <div className="btn-primary-profile-sm btn-accept-friend">Xác nhận</div>
            <div className="btn-default-profile-sm btn-cancel-friend">Xóa lời mời</div>
          </div>
        </div>
        <div className="more-item-user">
          <div className="box-fixed-more">
            <div className="icon-dot-more">
              <EllipsisOutlined />
            </div>
            <div className="list-function-more">
              <div className="row-function-more">Hủy kết bạn</div>
              <div className="row-function-more">Thêm bạn bè</div>
              <div className="row-function-more active">Hồ sơ học tập</div>
            </div>
          </div>
        </div>
      </div>
}
    </div>
  </div>
)

export default FriendFeed