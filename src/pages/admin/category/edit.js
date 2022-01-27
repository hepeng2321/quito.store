import * as React from 'react';
import {
  DialogContentActionDiv,
  DialogContentCategoryPictureImg,
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
import {deleteCategoryAPI, updateCategoryAPI} from "./db";
import ShowPicture from "../../../common/picture";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EditCategory extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      openPicture: false,
      pic: [],
      picObject: [],
      openPicIndex: 0,
      newRecord: Boolean(props.item.Id === 0),
      id: props.item.Id,
      cat: props.item.Cat,
      category: props.item.Category,
      parent: props.item.Parent,
      brother: props.item.Brother,
      width: props.item.Width,
      picture: props.item.Pic,
      changed: false,
      errorMsg: null,
      openConfirm: false
    }
  }

  catRef = React.createRef();
  categoryRef = React.createRef();
  parentRef = React.createRef();
  brotherRef = React.createRef();
  widthRef = React.createRef();
  pictureRef = React.createRef();

  restoreChange = () => {
    const {item} = this.props
    this.setState({
      cat: item.Cat,
      category: item.Category,
      parent: item.Parent,
      brother: item.Brother,
      width: item.Width,
      picture: item.Pic,
      changed: false,
    });
  }

  catChange = () => {
    const {cat, category, parent, brother, width, picture, changed} = this.state
    const {item} = this.props
    const inputText = this.catRef.current.value
    // console.log(cat, inputText, changed)
    if (inputText !== cat) {
      if ((inputText !== item.Cat) && !changed) {
        this.setState({
          cat: inputText,
          changed: true
        });
      } else if ((inputText !== item.Cat) && changed) {
        this.setState({
          cat: inputText,
        });
      } else if (
        changed &&
        category === item.Category &&
        parent === item.Parent &&
        brother === item.Brother &&
        width === item.Width &&
        picture === item.Pic
      ) {
        this.setState({
          cat: inputText,
          changed: false
        });
      } else {
        this.setState({
          cat: inputText,
        });
      }
    }
    this.checkRecord(inputText, category, brother, width)
  }

  categoryChange = () => {
    const {cat, category, parent, brother, width, picture, changed} = this.state
    const {item} = this.props
    const inputText = this.categoryRef.current.value
    // console.log(category, inputText, changed)
    if (inputText !== category) {
      if ((inputText !== item.Category) && !changed) {
        this.setState({
          category: inputText,
          changed: true
        });
      } else if ((inputText !== item.Category) && changed) {
        this.setState({
          category: inputText,
        });
      } else if (
        changed &&
        cat === item.Cat &&
        parent === item.Parent &&
        brother === item.Brother &&
        width === item.Width &&
        picture === item.Pic
      ) {
        this.setState({
          category: inputText,
          changed: false
        });
      } else {
        this.setState({
          category: inputText,
        });
      }
    }
  }

  parentChange = () => {
    const {cat, category, parent, brother, width, picture, changed} = this.state
    const {item} = this.props
    const inputText = this.parentRef.current.value
    // console.log(parent, inputText, changed)
    if (inputText !== parent) {
      if ((inputText !== item.Parent) && !changed) {
        this.setState({
          parent: inputText,
          changed: true
        });
      } else if ((inputText !== item.Parent) && changed) {
        this.setState({
          parent: inputText,
        });
      } else if (
        changed &&
        cat === item.Cat &&
        category === item.Category &&
        brother === item.Brother &&
        width === item.Width &&
        picture === item.Pic
      ) {
        this.setState({
          parent: inputText,
          changed: false
        });
      } else {
        this.setState({
          parent: inputText,
        });
      }
    }
    this.checkRecord(cat, inputText, brother, width)
  }

  brotherChange = () => {
    const {cat, category, parent, brother, width, picture, changed} = this.state
    const {item} = this.props
    const inputText = this.brotherRef.current.value
    // console.log(brother, inputText, changed)
    if (inputText !== brother) {
      if ((inputText !== item.Brother) && !changed) {
        this.setState({
          brother: inputText,
          changed: true
        });
      } else if ((inputText !== item.Brother) && changed) {
        this.setState({
          brother: inputText,
        });
      } else if (
        changed &&
        cat === item.Cat &&
        category === item.Category &&
        parent === item.Parent &&
        width === item.Width &&
        picture === item.Pic
      ) {
        this.setState({
          brother: inputText,
          changed: false
        });
      } else {
        this.setState({
          brother: inputText,
        });
      }
    }
    this.checkRecord(cat, parent, inputText, width)
  }

  widthChange = () => {
    const {cat, category, parent, brother, width, picture, changed} = this.state
    const {item} = this.props
    const inputText = this.widthRef.current.value
    // console.log(width, inputText, changed)
    if (inputText !== width) {
      if ((inputText !== item.Width) && !changed) {
        this.setState({
          width: inputText,
          changed: true
        });
      } else if ((inputText !== item.Width) && changed) {
        this.setState({
          width: inputText,
        });
      } else if (
        changed &&
        cat === item.Cat &&
        category === item.Category &&
        parent === item.Parent &&
        brother === item.Brother &&
        picture === item.Pic
      ) {
        this.setState({
          width: inputText,
          changed: false
        });
      } else {
        this.setState({
          width: inputText,
        });
      }
    }
    this.checkRecord(cat, parent, brother, inputText)
  }

  pictureChange = () => {
    const {cat, category, parent, brother, width, picture, changed} = this.state
    const {item} = this.props
    const inputText = this.pictureRef.current.value
    // console.log(picture, inputText, changed)
    if (inputText !== picture) {
      if ((inputText !== item.Picture) && !changed) {
        this.setState({
          picture: inputText,
          changed: true
        });
      } else if ((inputText !== item.Picture) && changed) {
        this.setState({
          picture: inputText,
        });
      } else if (
        changed &&
        cat === item.Cat &&
        category === item.Category &&
        parent === item.Parent &&
        brother === item.Brother &&
        width === item.Width
      ) {
        this.setState({
          picture: inputText,
          changed: false
        });
      } else {
        this.setState({
          picture: inputText,
        });
      }
    }
  }

  checkRecord = (cat, parent, brother, width) => {
    const {categoryList} = this.props
    let msg = []
    if (this.state.newRecord) {
      if (cat === "") {
        msg.push('Cat: Cannot be empty')
      } else {
        for (const c of categoryList) {
          if (c.get('Cat') === cat) {
            msg.push('Cat: Record duplicated')
            break
          }
        }
      }
    }
    if (parent !== 'home') {
      let found = false
      for (const c of categoryList) {
        if (c.get('Cat') === parent) {
          found = true
          break
        }
      }
      if (!found) {
        msg.push('Parent: Must be an existing Cat')
      }
    }
    if (brother !== '') {
      let found = false
      for (const c of categoryList) {
        if (c.get('Cat') === brother) {
          found = true
          break
        }
      }
      if (!found) {
        msg.push('Brother: Must be an existing Cat')
      }
    }
    let pattern = new RegExp(/^\d+%$/);
    let result = pattern.test(width)
    if (!result) {
      msg.push('Width: Must be a percentage')
    }
    this.setState({
      errorMsg: msg
    })
    return msg
  }

  saveChange = () => {
    const {
      id, cat, category, parent, brother, width, picture
    } = this.state
    const {
      closeEdit,
      handleGetCategoryAPI
    } = this.props
    let msg = this.checkRecord(cat, parent, brother, width)
    if (msg.length === 0) {
      updateCategoryAPI(id, cat, category, parent, brother, width, picture, handleGetCategoryAPI)
      closeEdit()
    }
  }

  handleOpenPic = (index, pic, picObject) => {
    this.setState({
      "openPicture": true,
      "pic": pic,
      "picObject": picObject,
      "openPicIndex": index
    })
  };

  handleClosePic = () => {
    this.setState({
      "openPicture": false,
      "pic": [],
      "picObject": [],
      "openPicIndex": 0
    })
  };

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
      id
    } = this.state
    const {
      closeEdit,
      handleGetCategoryAPI
    } = this.props
    deleteCategoryAPI(id, handleGetCategoryAPI)
    closeEdit()
  };

  handleDeletePic1 = (e) => {
    this.setState({
      changed: true,
      picture: "",
    })
    e.stopPropagation();
  }

  render() {
    const {
      item,
      // loginToken,
      closeEdit,
    } = this.props

    const {
      pic,
      picObject,
      openPicIndex,
      openPicture,
      newRecord,
      cat,
      category,
      parent,
      brother,
      width,
      picture,
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
          {
            openPicture > 0 ?
              <ShowPicture
                pic={pic}
                picObject={picObject}
                index={openPicIndex}
                handleClosePic={this.handleClosePic}
              /> : undefined
          }
          <DialogTitleDiv className={"DialogTitleDiv"}>
            <DialogTitleTextDiv className={"DialogTitleTextDiv"}>
              {
                newRecord ? 'New Category' : 'Edit Category'
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
                Id
              </DialogContentItemDiv>
              <MuiTextFieldDisabled
                value={item.Id}
                InputProps={{
                  readOnly: true,
                }}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Cat
              </DialogContentItemDiv>
              {
                newRecord ?
                  <MuiTextField
                    inputRef={this.catRef}
                    onChange={() => this.catChange()}
                    value={cat}
                  /> :
                  <MuiTextFieldDisabled
                    value={cat}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
              }
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Category
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.categoryRef}
                onChange={() => this.categoryChange()}
                value={category}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Parent
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.parentRef}
                onChange={() => this.parentChange()}
                value={parent}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Brother
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.brotherRef}
                onChange={() => this.brotherChange()}
                value={brother}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Width
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.widthRef}
                onChange={() => this.widthChange()}
                value={width}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Picture
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.pictureRef}
                onChange={() => this.pictureChange()}
                value={picture}
                sx={{
                  '& .MuiInputBase-input': {
                    width: '400px'
                  }
                }}
              />
            </DialogContentLineDiv>

            {
              picture && picture !== "" ?
                <DialogContentLineDiv>
                  <DialogContentItemDiv>
                    {"\u00a0"}
                  </DialogContentItemDiv>
                  <DialogContentCategoryPictureImg
                    src={picture}
                    alt={'pic'}
                    onClick={() => this.handleOpenPic(0, null, [picture])}
                  />
                  <IconButton
                    aria-label="delete" color="primary" component="span"
                    sx={{float: "left", margin: '115px 0 0 0'}}
                    onClick={(event)=>this.handleDeletePic1(event)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </DialogContentLineDiv> : undefined
            }


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

export default EditCategory