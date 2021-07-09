import styled from 'styled-components'

export default styled.div`
border-radius: 10px;
background-color: #fff;
padding: 30px;
a {
    font-weight: normal;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #676E86;
    padding: 0 16px 0 16px;
    border-right: 1px solid #94B2E3;
}
a:first-child {
    padding-left: 0;
}
a:last-child {
    padding-right: 16px;
    border-right: none;
}
a.active {
    font-weight: bold;
    color: #000;
    position: relative;
}
a.active::after {
    content: '';
    position: absolute;
    height: 5px;
    width: calc(100% - 8px) !important;
    background-color: #CC001B;
    left: 5px;
    bottom: -12px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
a:first-child.active::after {
    width: calc(100% - 38px);
    left: 0;
}
a:last-child.active::after {
    width: calc(100% - 38px);
}
@media only screen 
    and (min-width: 992px) 
    and (max-width: 1170px) {
    a {
        padding: 0 15px 0 15px;
        font-size: 18px;
    }
    a:first-child.active::after {
        width: calc(100% - 18px);
    }
    a.active::after {
        width: calc(100% - 36px);
        left: 18px;
    }
    a:last-child.active::after {
        width: calc(100% - 18px);
    }
}
@media only screen and (max-width: 992px) {
    padding: 20px;
    a {
        width: 100%;
        padding: 0;
        display: block;
        border-right: none;
        text-align: center;
        margin-top: 30px;
    }
    a:first-child.active::after,
    a.active::after,
    a:last-child.active::after {
        width: 100%;
        left: 0;
    }
    a:first-child {
        margin-top: 0;
    }
}
`