import styled from 'styled-components';
import logoPic from '../../statics/vogger.png'
import {styled as mui} from "@mui/material/styles";
import {Badge} from "@material-ui/core";

export const HeaderWrapper = styled.div`
    position: relative;
    height: 42px;
    border-bottom: 1px solid #f0f0f0;
    background: white;
`;

export const Logo = styled.div`
    // position: absolute;
    // margin-left: 0;
    // top: 4px;
    // left: 0;
    // display: block;
    width: 100px;
    height: 32px;
    margin-top: 2px;
    background: url(${logoPic});
    background-size: contain;
`;

export const Nav = styled.div`
    width: 1190px;
    height: 100%;
    padding-left: 130px;
    padding-right: 10px;
    margin: 0 auto;
    box-sizing: border-box;
`;

export const NavItem = styled.div`
  line-height: 38px;
  margin-top: 3px;
  padding: 0 15px;
  font-size: 17px;
  color: #333;
  &.left {
    float: left;
  }
  &.right {
    float: right;
    margin-left: 10px;
    padding-right: 10px;
    color: #969696; 
  }
  &.active {
    color: #FB55CE;
    font-weight: bold;
  }
`;

export const NavSearchWrapper = styled.div`
  position: relative;
  float: left;
  .iconfont {
    position: absolute;
    right: 5px;
    top: 10px;
    width: 24px;
    line-height: 24px;
    border-radius: 15px;
    text-align: center;
  }
`;

export const NavSearch = styled.input.attrs({
  placeholder: 'Search'
})`
    width: 160px;
    height: 28px;
    padding: 0 30px 0 15px;
    margin-top: 8px;
    margin-left: 20px;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-radius: 19px;
    background: #eee;
    font-size: 14px;
    color: #666;
    &::placeholder {
      color: #999
    }
    &.focused {
      width: 280px;
    }
    &.slide-enter {
    transition: all .2s ease-out;
    }
    &.slide-enter-active {
    width: 280px;
    }
    &.slide-exit {
    transition: all .2s ease-out;
    }
    &.slide-exit-active {
    width: 160px;
    }
`;

export const NavSearchInfo = styled.div`
    position: absolute;
    left: 0;
    top: 38px;
    width: 280px;
    padding: 0 20px;
    margin-left: 20px;
    background: white;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
`;

export const NavSearchInfoTitle = styled.div`
    margin-top: 20px;
    margin-bottom: 14px;
    line-height: 20px;
    font-size: 14px;
    color: #969696;
`;

export const NavSearchInfoDel = styled.span`
    float: right;
    font-size: 13px;
`;

export const NavSearchInfoList = styled.div`
    overflow: hidden;
`;

export const NavSearchInfoItem= styled.a`
    display: block;
    float: left;
    line-height: 20px;
    padding: 0 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    border: 1px solid #ddd;
    color: #787878;
    border-radius: 3px;
`;

export const Addition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 38px;
`;

export const Button = styled.div`
  float: right;
  margin-top: 4px;
  margin-right: 20px;
  padding: 0 20px; 
  line-height: 30px;
  border-radius: 19px;
  border: 1px solid #ec6149;
  font-size: 14px;
  &.reg {
    color: #ec6149;
  }
  &.wri {
    color: #fff;
    background: #ec6149;
  }
`;

export const UserContentDiv = styled.div`
  float: right;
  //width: 200px;
  display: flex;
`;

export const UserContentMenuDiv = styled.div`
  float: right;
  width: auto;
  height: auto;
  margin-left: 2px;
`;

export const UserContentUserListDiv = styled.div`
  display: flex;
  width: auto;
  height: auto;
`;

export const UserIcon = styled.div`
  float: right;
`;

export const UserContentUserTextDiv = styled.div`
  margin-left: 5px;
`;

export const StyledBadge = mui(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 0,
    border: `2px solid white`,
    padding: '0 4px',
  },
}));

