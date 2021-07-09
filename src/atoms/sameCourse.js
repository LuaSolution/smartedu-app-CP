import styled from 'styled-components'

export default styled.div`
position: relative;
margin-bottom: 80px;
.read-more {
    position: absolute;
    right: 0;
    top: 20px;
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #4063E0;
    background-image: url('/public/assets/img/web/dashboard/6.png');
    background-repeat: no-repeat;
    background-position: right 0;
    padding-right: 30px;
}
.title {
    font-weight: bold;
    font-size: 36px;
    line-height: 130%;
    letter-spacing: 0.01em;
    color: #193769;
    position: relative;
}
.title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background: #CC001B;
    border-radius: 2px;
    width: 120px;
    height: 5px;
}
.list-wish-list {
    margin-top: 60px;
    overflow: hidden;
}
.list-wish-list::after {
    content: '';
    clear: both;
}
@media only screen 
    and (min-width: 992px) 
    and (max-width: 1185px) {
    .title {
        padding-left: 20px;
    }
    .title::after {
        left: 20px;
    }
    .read-more {
        right: 20px;
    }
}
@media only screen 
    and (min-width: 992px) 
    and (max-width: 1175px) {
        .list-wish-list .course-item {
            max-width: calc(25% - 22px);
            float: left;
        }
}
@media only screen and (max-width: 991px) {
    .read-more {
        position: unset;
        display: block;
        margin-top: 20px;
        text-align: right;
    }
    & {
        margin-top: 50px;
    }
    .title {
        font-size: 20px;
        padding-left: 20px;
    }
    .title::after {
        left: 20px;
    }
    .read-more {
        margin-right: 20px;
        font-size: 16px;
    }
    .list-wish-list {
        margin-top: 0;
    }
}
`
