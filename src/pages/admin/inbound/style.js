import styled from "styled-components";
import {styled as mui} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

export const AdminTitleDiv = styled.div`
  float: top;
  width: auto;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  font-size: 20px;
  font-weight: 600;
  `;

export const AdminGridDiv = styled.div`
  float: top;
  width: auto;
  height: 480px;
  margin: 10px 0;
  `;

export const InboundGridDiv = styled.div`
  float: top;
  width: auto;
  height: 335px;
  margin: 10px 0;
  `;

export const DialogTitleDiv = styled.div`
  width: auto;
  height: 45px;
  background: white;
  padding: 0 5px 0 0;
  `;

export const DialogTitleTextDiv = styled.div`
  float: left;
  width: auto;
  height: 45px;
  background: white;
  line-height: 45px;
  font-size: 16px;
  font-weight: bold;
  color: #777
  `;

export const DialogTitleCloseDiv = styled.div`
  float: right;
  width: 30px;
  height: 45px;
  line-height: 40px;
  font-size: 13px;
  margin-top: 10px;
  cursor: pointer;
  `;

export const DialogContentDiv = styled.div`
  width: 100%;
  height: auto;
  background: white;
  font-size: 16px;
  margin-top: 10px;
  `;

export const DialogContentLineDiv = styled.div`
  width: 100%;
  height: auto;
  padding: 5px 0;
  display: flex;
  background: white;
  `;

export const DialogContentItemDisableDiv = styled.div`
  float: left;
  width: 60px;
  height: auto;
  background: white;
  font-size: 13px;
  line-height: 20px;
  text-align: right;
  margin-right: 10px;
  color: #777;
  `;


export const DialogContentItemDiv = styled.div`
  float: left;
  width: 60px;
  height: auto;
  background: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 38px;
  text-align: right;
  margin-right: 10px;
  color: dodgerblue;
  `;

export const DialogContentActionDiv = styled.div`
  width: 100%;
  height: auto;
  padding: 3px 20px 15px 20px;
  //display: flex;
  background: white;
  `;

export const MuiDialog = mui(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: "5px",
  },
});

export const MuiTextFieldDisabled = mui(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '20px',
    borderRadius: 0
  },
  '& .MuiInputBase-input': {
    padding: '2px 5px 0 5px',
    color: '#777',
    fontSize: '13px',
    width: '80px',
  },
});

export const MuiTextField = mui(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '30px',
    borderRadius: 0,
  },
  '& .MuiInputBase-input': {
    padding: '0 10px',
    color: '#222',
    fontSize: '16px',
    width: '200px',
  },
});

export const MuiInboundTextField = mui(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '38px',
    borderRadius: 0,
    marginRight: '10px',
    marginBottom: '5px'
  },
  '& .MuiInputBase-input': {
    padding: '0 10px',
    color: '#222',
    fontSize: '16px',
    width: '200px',
  },
});