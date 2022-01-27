import * as React from 'react';
import {
  DialogContentActionDiv,
  DialogContentDiv, DialogContentItemDiv, DialogContentLineDiv,
  DialogTitleCloseDiv,
  DialogTitleDiv,
  DialogTitleTextDiv,
  MuiDialog, MuiTextField, MuiTextFieldDisabled
} from "./style";
import {Alert, Dialog, DialogActions, DialogContent, Divider, Slide} from "@material-ui/core";
import {PureComponent} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import {deleteSizeAPI, updateSizeAPI} from "./db";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EditSize extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      newRecord: Boolean(props.item.SizeId === 0),
      sizeId: props.item.SizeId,
      cat: props.item.Cat,
      category: props.item.Category,
      size: props.item.Size,
      changed: false,
      errorMsg: null,
      openConfirm: false
    }
  }

  catRef = React.createRef();
  categoryRef = React.createRef();
  sizeRef = React.createRef();

  restoreChange = () => {
    const {item} = this.props
    this.setState({
      cat: item.Cat,
      category: item.Category,
      size: item.Size,
      changed: false,
    });
  }

  catChange = () => {
    const {cat, size, changed} = this.state
    const {item, categoryList} = this.props
    const inputText = this.catRef.current.value
    // console.log(cat, inputText, changed)
    let category = ""
    for (const c of categoryList) {
      if (c.get('Cat') === inputText) {
        category = c.get('Category')
        break
      }
    }
    if (inputText !== cat) {
      if ((inputText !== item.Cat) && !changed) {
        this.setState({
          cat: inputText,
          category: category,
          changed: true
        });
      } else if ((inputText !== item.Cat) && changed) {
        this.setState({
          cat: inputText,
          category: category,
        });
      } else if (
        changed &&
        size === item.Size
      ) {
        this.setState({
          cat: inputText,
          category: category,
          changed: false
        });
      } else {
        this.setState({
          cat: inputText,
          category: category,
        });
      }
    }
    this.checkRecord(inputText)
  }

  sizeChange = () => {
    const {cat, size, changed} = this.state
    const {item} = this.props
    const inputText = this.sizeRef.current.value
    // console.log(parent, inputText, changed)
    if (inputText !== size) {
      if ((inputText !== item.Size) && !changed) {
        this.setState({
          size: inputText,
          changed: true
        });
      } else if ((inputText !== item.Size) && changed) {
        this.setState({
          size: inputText,
        });
      } else if (
        changed &&
        cat === item.Cat
      ) {
        this.setState({
          size: inputText,
          changed: false
        });
      } else {
        this.setState({
          size: inputText,
        });
      }
    }
  }

  checkRecord = (cat) => {
    const {categoryList} = this.props
    let msg = []
    if (cat === "") {
      msg.push('Cat: Cannot be empty')
    } else {
      let found = false
      for (const c of categoryList) {
        if (c.get('Cat') === cat) {
          found = true
          break
        }
      }
      if (!found) {
        msg.push('Cat: Must be an existing Cat')
      }
    }
    this.setState({
      errorMsg: msg
    })
    return msg
  }

  saveChange = () => {
    const {
      sizeId, cat, size
    } = this.state
    const {
      closeEdit,
      handleGetSizeAPI
    } = this.props
    let msg = this.checkRecord(cat)
    if (msg.length === 0) {
      updateSizeAPI(sizeId, cat, size, handleGetSizeAPI)
      closeEdit()
    }
  }

  handleOpenConfirm = () => {
    this.setState({
      openConfirm: true
    });
  };

  handleCloseConfirm = () => {
    this.setState({
      openConfirm: false
    });
  };

  handleCloseConfirmAndDelete = () => {
    this.setState({
      openConfirm: false
    });
    const {
      sizeId
    } = this.state
    const {
      closeEdit,
      handleGetSizeAPI
    } = this.props
    deleteSizeAPI(sizeId, handleGetSizeAPI)
    closeEdit()
  };

  render() {
    const {
      // loginToken,
      closeEdit,
    } = this.props

    const {
      newRecord,
      sizeId,
      cat,
      category,
      size,
      changed,
      errorMsg,
      openConfirm
    } = this.state

    // console.log(100, newRecord, item, item.Id, item.Id === 0)

    return (
      <MuiDialog
        className={"MuiDialog"}
        open={true}
        disableEscapeKeyDown
        TransitionComponent={Transition}
        onClose={closeEdit}
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{height: "45px", padding: "0 5px 0 15px"}}
        >
          <DialogTitleDiv className={"DialogTitleDiv"}>
            <DialogTitleTextDiv className={"DialogTitleTextDiv"}>
              {
                newRecord ? 'New Category Size' : 'Edit Category Size'
              }
            </DialogTitleTextDiv>
            <DialogTitleCloseDiv
              className={"DialogTitleCloseDiv"}
              onClick={()=>closeEdit()}
            >
              <CloseIcon />
            </DialogTitleCloseDiv>
          </DialogTitleDiv>
        </DialogTitle>
        <DialogContent
          className={"DialogContent"}
          sx={{padding: "15px 15px"}}
        >
          <Divider sx={{width: 570}}/>
          <DialogContentDiv>
            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Size_Id
              </DialogContentItemDiv>
              <MuiTextFieldDisabled
                value={sizeId}
                InputProps={{
                  readOnly: true,
                }}
              />
            </DialogContentLineDiv>
            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Cat
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.catRef}
                onChange={() => this.catChange()}
                value={cat}
              />
            </DialogContentLineDiv>
            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Category
              </DialogContentItemDiv>
              <MuiTextFieldDisabled
                inputRef={this.categoryRef}
                value={category}
                InputProps={{
                  readOnly: true,
                }}
              />
            </DialogContentLineDiv>
            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Size
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.sizeRef}
                onChange={() => this.sizeChange()}
                value={size}
              />
            </DialogContentLineDiv>

          </DialogContentDiv>
        </DialogContent>

        <DialogContentActionDiv>
          <Divider sx={{width: 560, marginBottom: '10px'}}/>
          {
            errorMsg && errorMsg.length > 0 ?
              <Alert
                severity="error"
                sx={{mt: 1, mb:1}}
              >
                {
                  errorMsg.map((item) => (
                    <div key={"k_"+item}>
                      {item}
                    </div>
                  ))
                }
              </Alert> : undefined
          }

          {
            !newRecord ?
              <Button
                variant="outlined"
                color="error"
                onClick={this.handleOpenConfirm}
                sx={{float: 'left'}}
              >
                Delete
              </Button> : undefined
          }
          {
            newRecord ?
              <Button
                variant="contained"
                onClick={this.saveChange}
                sx={{marginLeft: '20px', float: 'right'}}
              >
                Create new record
              </Button> : undefined
          }
          {
            changed && !newRecord ?
              <Button
                variant="contained"
                onClick={this.saveChange}
                sx={{marginLeft: '20px', float: 'right'}}
              >
                Save changes
              </Button> : undefined
          }
          {
            changed && !newRecord ?
              <Button
                variant="outlined"
                onClick={this.restoreChange}
                sx={{marginLeft: '20px', float: 'right'}}
              >
                Restore
              </Button> : undefined
          }
        </DialogContentActionDiv>
        <Dialog
          open={openConfirm}
          onClose={this.handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Do you want to delete it?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseConfirm}>No</Button>
            <Button onClick={this.handleCloseConfirmAndDelete}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </MuiDialog>
    );
  }

}

export default EditSize