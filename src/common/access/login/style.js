import styled from 'styled-components';
import {styled as mui} from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const LoginCardDiv = styled.div`
  width: 100%;
  height: auto;
  margin-top: 3px;
  `;

export const LoginCardContentDiv = styled.div`
  width: 100%;
  padding: 20px;
  height: 100%;
  max-width: 350px;
  border: 1px solid #f0f0f0;
  border-radius: 11px;
  background: white;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #7F7F7F;
  flex-direction: column;
  `;

export const LoginCardContentTitleDiv = styled.div`
  width: 100%;
  margin: 5px auto;
  height: 24px;
  background: white;
  font-size: 16px;
  font-weight: bold;
  color: #7F7F7F;
  `;

export const LoginCardContentUserTextField = mui(TextField)(({ theme }) => ({
  margin: "5px 5px 10px 5px",
  color: "secondary",
  '& fieldset': {
    borderRadius: '25px',
    border: "1px solid #E5E8EC",
    background: "rgba(156,186,239,0.1)"
  },
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      border: "1px solid #E5E8EC",
      background: "rgba(156,186,239, 0.15)"
    },
    '&.Mui-focused fieldset': {
      border: "1px solid #E5E8EC",
      background: "rgba(156,186,239, 0.15)"
    },
  },
}));

export const LoginCardContentLoginButton = mui(Button)(({ theme }) => ({
  width: "170px",
  margin: "5px auto",
  // paddingTop: "5px"
  borderRadius: "18px",
}));
