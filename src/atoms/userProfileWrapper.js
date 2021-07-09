import styled from 'styled-components'
import camera from 'atoms/user-profile/camera.svg'
import global from 'atoms/user-profile/global.svg'
import edit from 'atoms/user-profile/edit.svg'
import copy from 'atoms/user-profile/copy.svg'
import user from 'atoms/user-profile/user.svg'
import pass from 'atoms/user-profile/pass.svg'
import phone from 'atoms/user-profile/phone.svg'
import mail from 'atoms/user-profile/mail.svg'
import gender from 'atoms/user-profile/gender.svg'
import home from 'atoms/user-profile/home.svg'
import pro from 'atoms/user-profile/pro.svg'
import company from 'atoms/user-profile/company.svg'
import id from 'atoms/user-profile/id.svg'
import history from 'atoms/user-profile/history.svg'

export default styled.div`
.user-profile .ifa-block-content {
    box-shadow: 2px 5px 20px rgba(42, 44, 49, 0.13);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding-bottom: 60px;
    margin-bottom: 80px;
}
.profile-cover{
    width: 100%;
    height: 315px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #ccc;
    background-size: cover;
    position: relative;
}
.profile-cover .avatar-block .avatar-img {
    border: 1px solid #eee;
    width: 180px;
    height: 180px;
    position: absolute;
    bottom: -90px;
    left: calc(50% - 90px);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #f5f5f5;
    cursor: pointer;
}
.profile-cover .avatar-block .avatar-img-none {
    border: 1px solid #eee;
    width: 180px;
    height: 180px;
    position: absolute;
    bottom: -90px;
    left: calc(50% - 90px);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #f5f5f5;
    cursor: pointer;
}
.profile-cover input {
    display: none;
}
.profile-cover .avatar-block .avatar-img::after {
    content: '';
    position: absolute;
    width: 34px;
    height: 33px;
    background-image: url(${camera});
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: center;
    background-color: #F6F8FF;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 25px;
    right: 10px;
    bottom: 10px;
    border: 1px solid #eee;
}
.profile-cover .cover-block {
    width: 116px;
    height: 34px;
    position: absolute;
    right: 25px;
    bottom: 16px;
}
.profile-cover .cover-block .change-cover-button {
    background-image: url(${camera});
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: 6px center;
    background-color: #F6F8FF;
    width: 100%;
    height: 100%;
    padding: 0 0 0 35px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    line-height: 34px;
    border: none;
    font-weight: normal;
    font-size: 12px;
    color: #091230;
}
.user-information {
    padding-top: 110px;
    width: 970px;
    margin: auto;
}
.user-information .description .description-link {
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #0B46A9;
    text-align: center;
    display: block;
}
.user-information .description .textbox-area {
    margin-top: 30px;
}
.user-information .description .textbox-area .list-button {
    margin-top: 20px;
}
.user-information .description .textbox-area textarea {
    background: #FFFFFF;
    border: 1px solid #B8BEC8;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    height: 110px;
    width: 100%;
    padding: 20px 25px;
    font-weight: normal;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.01em;
    color: #676E86;
    outline: none;
}
.user-information .description {
    margin-top: 12px;
    width: 570px;
    margin: auto;
}
.list-button .dropdown-toggle::after {
    display: none;
}
.list-button .dropdown-toggle {
    width: 181px;
    height: 49px;
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #091230;
    background-color: #F7F7F7;
    border: 1px solid #B8BEC8;
    box-sizing: border-box;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: left;
    padding-left: 65px;
    background-image: url(${global});
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: 30px center;
}
.list-button .btn-primary:focus, .btn-primary.focus {
    box-shadow: unset;
}
.list-button .btn-primary:not(:disabled):not(.disabled):active,
.list-button .show>.btn-primary.dropdown-toggle  {
    color: #091230;
    background-color: #F7F7F7;
    border: 1px solid #B8BEC8;
    box-shadow: unset;
}
.list-button .right-button {
    display: inline-block;
    height: 49px;
    font-weight: 600;
    font-size: 18px;
    line-height: 49px;
    letter-spacing: 0.01em;
    color: #fff;
    text-align: center;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    cursor: pointer;
}
.list-button .right-button.cancel-description {
    width: 106px;
    margin-left: 179px;
    background-color: #94B2E3;
}
.list-button .right-button.save-description {
    width: 92px;
    margin-left: 12px;
    background-color: #0B46A9;
}
.list-button .dropdown {
    display: inline-block;
}
.user-information .barcode {
    text-align: center;
    margin-top: 30px;
}
.user-information .barcode .barcode-name {
    font-weight: bold;
    font-size: 28px;
    line-height: 33px;
    color: #000;
    margin-top: 11px;
}
.user-information .barcode img {
    max-width: 100%;
}
.user-information .invite-block {
    width: 400px;
    height: 44px;
    margin: auto;
    background-color: #E1E5F1;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    box-sizing: border-box;
    margin-top: 30px;
}
.user-information .invite-block::after,
.list-info::after {
    content: '';
    clear: both;
}
.invite-block .invite-txt {
    font-weight: normal;
    font-size: 16px;
    line-height: 44px;
    color: #193769;
    text-align: center;
}
.invite-block .copy-block {
    float: left;
    height: 44px;
    width: 229px;
    position: relative;
}
.invite-block .copy-block .invite-input {
    height: 100%;
    width: 100%;
    padding: 9px 16px;
    border: 1px solid #eee;
    background-color: #fff;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    -webkit-letter-spacing: 0.01em;
    -moz-letter-spacing: 0.01em;
    -ms-letter-spacing: 0.01em;
    letter-spacing: 0.01em;
    color: #B8BEC8;
}
.invite-block .copy-btn {
    background-image: url(${copy});
    background-repeat: no-repeat;
    background-size: 32px 32px;
    background-position: center;
    width: calc(100% - 126px - 229px);
    height: 44px;
    float: left;
    cursor: pointer;
}
.list-info {
    position: relative;
    margin-top: 40px;
    width: 970px;
    background-color: #eee;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    padding: 60px 100px;
    overflow: hidden;
}
.list-info .list-info-change-pw {
    position: absolute;
    top: -20px;
    right: 50px;
    display: flex;
    justify-content: flex-end;
}

.list-info .list-info-change-pw .info-value-block {
    cursor: pointer;
}

.list-info .info-block {
    padding-left: 32px;
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: 0 0;
    width: calc(50% - 77.5px);
    float: left;
    margin-top: 30px;
}
.list-info .info-block:nth-child(even) {
    margin-left: 155px;
}
.list-info .info-block:nth-child(odd) {
    clear: both;
}
.list-info .info-block.user,
.list-info .info-block.birthday,
.list-info .info-block.pos,
.list-info .info-block.department {
    background-image: url(${user});
}
.list-info .info-block.pass {
    background-image: url(${pass});
}
.list-info .info-block.phone {
    background-image: url(${phone});
}
.list-info .info-block.mail {
    background-image: url(${mail});
}
.list-info .info-block.gender {
    background-image: url(${gender});
}
.list-info .info-block.address {
    background-image: url(${home});
}
.list-info .info-block.pro {
    background-image: url(${pro});
}
.list-info .info-block.company {
    background-image: url(${company});
}
.list-info .info-block.id {
    background-image: url(${id});
}
.info-block .info-label {
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #696F79;
}
.info-block .info-value-block {
    margin-top: 5px;
}
.info-block .info-value-block span {
    font-weight: bold;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0.01em;
    color: #091230;
    display: inline-block;
    height: 54px;
}
.info-block .info-value-block span::after {
    content: '';
    display: inline-block;
    background-image: url(${edit});
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: 0 0;
    width: 22.84px;
    height: 22.84px;
    position: absolute;
    margin-left: 10px;
    cursor: pointer;
}
.info-block.hide-icon .info-value-block span::after {
    content: unset;
}
.info-block .info-value-block .info-value-input {
    display: none;
}
.info-block .info-value-block .info-value-input.active {
    display: inline-block;
    height: 48px;
    width: 100%;
    border: 1px solid #676E86;
    box-sizing: border-box;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    padding: 11px 20px;
    font-weight: normal;
    font-size: 16px;
    line-height: 48px;
    -webkit-letter-spacing: 0.01em;
    -moz-letter-spacing: 0.01em;
    -ms-letter-spacing: 0.01em;
    letter-spacing: 0.01em;
    color: #676E86;
}
.info-block .info-value-block .react-datepicker-wrapper input {
    height: 48px;
    width: 100%;
    border: 1px solid #676E86;
    box-sizing: border-box;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    padding: 11px 20px;
    font-weight: normal;
    font-size: 16px;
    line-height: 48px;
    letter-spacing: 0.01em;
    color: #676E86;
    background-image: url(${history});
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: right 12px center;
}
.fullname.info-block .info-value-block span {
    font-weight: bold;
    font-size: 32px;
    line-height: 130%;
    letter-spacing: 0.01em;
    color: #193769;
    text-align: center;
    position: relative;
}
.fullname.info-block .info-value-block {
    text-align: center;
}
.fullname.info-block .info-value-block span::after {
    position: absolute;
    bottom: 0;
    top: calc(50% - 14.42px);
}
`