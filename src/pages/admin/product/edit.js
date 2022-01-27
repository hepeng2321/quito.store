import * as React from 'react';
import {
  DialogContentActionDiv,
  DialogContentDiv, DialogContentItemDiv, DialogContentLineDiv,
  DialogTitleCloseDiv,
  DialogTitleDiv,
  DialogTitleTextDiv,
  MuiDialog, MuiTextField, MuiTextFieldDisabled
} from "./style";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  ImageList,
  ImageListItem,
  Slide, Switch,
  TextField
} from "@material-ui/core";
import {PureComponent} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import {deleteProductAPI, updateProductAPI} from "./db";
import {renderStock} from "../../../common/product/pDetail/pStock";
import ShowPicture from "../../../common/picture";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import {DialogContentCategoryPictureImg} from "../category/style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EditProduct extends PureComponent{

  constructor(props) {
    super(props);
    const {productDetail} = props
    let pid, pictures, stocks
    if (productDetail) {
      let prod = productDetail.toJS()
      pid = prod.Pid
      pictures = prod.Pic
      stocks = prod.Stock
    };
    this.state = {
      openPicture: false,
      pic: [],
      picObject: [],
      openPicIndex: 0,
      newRecord: Boolean(props.item.Pid === 0),
      pid: props.item.Pid,
      cat: props.item.Cat,
      title: props.item.Title,
      description: props.item.Description,
      fabric: props.item.Fabric,
      pic1: props.item.Pic1,
      pic2: props.item.Pic2,
      price: props.item.Price,
      priceOri: props.item.PriceOri,
      listed: Boolean(props.item.Listed > 0),
      pPid: pid,
      pictures: pictures,
      stocks: stocks,
      changed: false,
      errorMsg: null,
      openConfirm: false,
      openAddPicture: false,
    }
  }

  titleRef = React.createRef();
  descriptionRef = React.createRef();
  fabricRef = React.createRef();
  priceRef = React.createRef();
  priceOriRef = React.createRef();
  pic1Ref = React.createRef();
  pic2Ref = React.createRef();
  pictureRef = React.createRef();

  restoreChange = () => {
    const {item, productDetail} = this.props
    const {pPid} = this.state
    let prod = productDetail.toJS()
    let pictures, stocks
    if (pPid === prod.Pid) {
      pictures = prod.Pic
      stocks = prod.Stock
    }
    this.setState({
      title: item.Title,
      description: item.Description,
      fabric: item.Fabric,
      pic1: item.Pic1,
      pic2: item.Pic2,
      price: item.Price,
      priceOri: item.PriceOri,
      listed: Boolean(item.Listed > 0),
      pictures: pictures,
      stocks: stocks,
      changed: false,
    });
  }

  titleChange = () => {
    const {title, description, fabric, pic1, pic2, price, priceOri, listed, changed} = this.state
    const {item} = this.props
    const inputText = this.titleRef.current.value
    if (inputText !== title) {
      if ((inputText !== item.Title) && !changed) {
        this.setState({
          title: inputText,
          changed: true
        });
      } else if ((inputText !== item.Title) && changed) {
        this.setState({
          title: inputText,
        });
      } else if (
        changed &&
        description === item.Description &&
        fabric === item.Fabric &&
        pic1 === item.Pic1 &&
        pic2 === item.Pic2 &&
        ((listed && item.Listed > 0) || (!listed && item.Listed === 0)) &&
        price === item.Price &&
        priceOri === item.PriceOri
      ) {
        this.setState({
          title: inputText,
          changed: false
        });
      } else {
        this.setState({
          title: inputText,
        });
      }
    }
  }

  descriptionChange = () => {
    const {title, description, fabric, pic1, pic2, price, priceOri, listed, changed} = this.state
    const {item} = this.props
    const inputText = this.descriptionRef.current.value
    if (inputText !== description) {
      if ((inputText !== item.Description) && !changed) {
        this.setState({
          description: inputText,
          changed: true
        });
      } else if ((inputText !== item.Description) && changed) {
        this.setState({
          description: inputText,
        });
      } else if (
        changed &&
        title === item.Title &&
        fabric === item.Fabric &&
        pic1 === item.Pic1 &&
        pic2 === item.Pic2 &&
        ((listed && item.Listed > 0) || (!listed && item.Listed === 0)) &&
        price === item.Price &&
        priceOri === item.PriceOri
      ) {
        this.setState({
          description: inputText,
          changed: false
        });
      } else {
        this.setState({
          description: inputText,
        });
      }
    }
  }

  fabricChange = () => {
    const {title, description, fabric, pic1, pic2, price, priceOri, listed, changed} = this.state
    const {item} = this.props
    const inputText = this.fabricRef.current.value
    if (inputText !== fabric) {
      if ((inputText !== item.Fabric) && !changed) {
        this.setState({
          fabric: inputText,
          changed: true
        });
      } else if ((inputText !== item.Fabric) && changed) {
        this.setState({
          fabric: inputText,
        });
      } else if (
        changed &&
        title === item.Title &&
        description === item.Description &&
        pic1 === item.Pic1 &&
        pic2 === item.Pic2 &&
        ((listed && item.Listed > 0) || (!listed && item.Listed === 0)) &&
        price === item.Price &&
        priceOri === item.PriceOri
      ) {
        this.setState({
          fabric: inputText,
          changed: false
        });
      } else {
        this.setState({
          fabric: inputText,
        });
      }
    }
  }

  pic1Change = () => {
    const {title, description, fabric, pic1, pic2, price, priceOri, listed, changed} = this.state
    const {item} = this.props
    const inputText = this.pic1Ref.current.value
    if (inputText !== pic1) {
      if ((inputText !== item.Pic1) && !changed) {
        this.setState({
          pic1: inputText,
          changed: true
        });
      } else if ((inputText !== item.Pic1) && changed) {
        this.setState({
          pic1: inputText,
        });
      } else if (
        changed &&
        title === item.Title &&
        description === item.Description &&
        fabric === item.Fabric &&
        pic2 === item.Pic2 &&
        ((listed && item.Listed > 0) || (!listed && item.Listed === 0)) &&
        price === item.Price &&
        priceOri === item.PriceOri
      ) {
        this.setState({
          pic1: inputText,
          changed: false
        });
      } else {
        this.setState({
          pic1: inputText,
        });
      }
    }
  }

  pic2Change = () => {
    const {title, description, fabric, pic1, pic2, price, priceOri, listed, changed} = this.state
    const {item} = this.props
    const inputText = this.pic2Ref.current.value
    if (inputText !== pic2) {
      if ((inputText !== item.Pic2) && !changed) {
        this.setState({
          pic2: inputText,
          changed: true
        });
      } else if ((inputText !== item.Pic2) && changed) {
        this.setState({
          pic2: inputText,
        });
      } else if (
        changed &&
        title === item.Title &&
        description === item.Description &&
        fabric === item.Fabric &&
        pic1 === item.Pic1 &&
        ((listed && item.Listed > 0) || (!listed && item.Listed === 0)) &&
        price === item.Price &&
        priceOri === item.PriceOri
      ) {
        this.setState({
          pic2: inputText,
          changed: false
        });
      } else {
        this.setState({
          pic2: inputText,
        });
      }
    }
  }

  priceChange = () => {
    const {title, description, fabric, pic1, pic2, price, priceOri, listed, changed} = this.state
    const {item} = this.props
    const inputText = this.priceRef.current.value
    if (inputText !== price) {
      console.log(0)
      if ((Number(inputText) !== item.Price) && !changed) {
        console.log(1)
        this.setState({
          price: Number(inputText),
          changed: true
        });
      } else if ((Number(inputText) !== item.Price) && changed) {
        console.log(2)
        this.setState({
          price: Number(inputText),
        });
      } else if (
        changed &&
        title === item.Title &&
        description === item.Description &&
        fabric === item.Fabric &&
        pic1 === item.Pic1 &&
        pic2 === item.Pic2 &&
        ((listed && item.Listed > 0) || (!listed && item.Listed === 0)) &&
        priceOri === item.PriceOri
      ) {
        this.setState({
          price: Number(inputText),
          changed: false
        });
      } else {
        this.setState({
          price: Number(inputText),
        });
      }
    }
    this.checkRecord(inputText)
  }

  priceOriChange = () => {
    const {title, description, fabric, pic1, pic2, price, priceOri, listed, changed} = this.state
    const {item} = this.props
    const inputText = this.priceOriRef.current.value
    if (inputText !== priceOri) {
      if ((Number(inputText) !== item.PriceOri) && !changed) {
        this.setState({
          priceOri: Number(inputText),
          changed: true
        });
      } else if ((Number(inputText) !== item.PriceOri) && changed) {
        this.setState({
          priceOri: Number(inputText),
        });
      } else if (
        changed &&
        title === item.Title &&
        description === item.Description &&
        fabric === item.Fabric &&
        pic1 === item.Pic1 &&
        pic2 === item.Pic2 &&
        ((listed && item.Listed > 0) || (!listed && item.Listed === 0)) &&
        price === item.Price
      ) {
        this.setState({
          priceOri: Number(inputText),
          changed: false
        });
      } else {
        this.setState({
          priceOri: Number(inputText),
        });
      }
    }
    this.checkRecord(inputText)
  }

  listedChange = (e) => {
    const {title, description, fabric, pic1, pic2, price, priceOri, listed, changed} = this.state
    const {item} = this.props
    if (e.target.checked !== listed) {
      if (((e.target.checked && item.Listed === 0) || (!e.target.checked && item.Listed > 0)) && !changed) {
        this.setState({
          listed: e.target.checked,
          changed: true
        });
      } else if (((e.target.checked && item.Listed === 0) || (!e.target.checked && item.Listed > 0)) && changed) {
        this.setState({
          listed: e.target.checked,
        });
      } else if (
        changed &&
        title === item.Title &&
        description === item.Description &&
        fabric === item.Fabric &&
        pic1 === item.Pic1 &&
        pic2 === item.Pic2 &&
        price === item.Price &&
        priceOri === item.PriceOri
      ) {
        this.setState({
          listed: e.target.checked,
          changed: false
        });
      } else {
        this.setState({
          listed: e.target.checked,
        });
      }
    }
  }

  checkRecord = (price) => {
    let msg = []
    let pattern = new RegExp(/(^[0-9]+(.[0-9]{1,2})?$)|(^0(\.\d{1,2})?$)/);
    let result = pattern.test(price)
    if (!result) {
      msg.push('Price: Must be a number')
    }
    this.setState({
      errorMsg: msg
    })
    return msg
  }

  saveChange = () => {
    const {
      pid, cat, title, fabric, description, pic1, pic2, price, priceOri, listed, pictures, errorMsg
    } = this.state
    const {
      closeEdit,
      handleGetCatProductAPI,
      handleGetProductAPI
    } = this.props
    if (!errorMsg || errorMsg.length === 0) {
      updateProductAPI(pid, cat, title, fabric, description, pic1, pic2, price, priceOri, listed, pictures, handleGetCatProductAPI, handleGetProductAPI)
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
      pid,
      cat
    } = this.state
    const {
      closeEdit,
      handleGetCatProductAPI
    } = this.props
    deleteProductAPI(pid, cat, handleGetCatProductAPI)
    closeEdit()
  };

  handleOpenAddPicture = () => {
    this.setState({
      openAddPicture: true
    })
  }

  handleCloseAddPicture = () => {
    this.setState({
      openAddPicture: false
    })
  }

  handleAddPicture = () => {
    const {
      pictures
    } = this.state
    let pic = [...pictures];
    const inputText = this.pictureRef.current.value
    pic.push(inputText)
    this.setState({
      changed: true,
      pictures: pic,
      openAddPicture: false,
    })
  }

  handleDeletePicture = (e, index) => {
    const {
      pictures
    } = this.state
    let pic = [...pictures];
    pic.splice(index, 1)
    this.setState({
      changed: true,
      pictures: pic,
    })
    e.stopPropagation();
  }

  handleDeletePic1 = (e) => {
    this.setState({
      changed: true,
      pic1: "",
    })
    e.stopPropagation();
  }

  handleDeletePic2 = (e) => {
    this.setState({
      changed: true,
      pic2: "",
    })
    e.stopPropagation();
  }

  handleInitProdDetail = () => {
    const {productDetail} = this.props
    const {pPid} = this.state
    let prod = productDetail.toJS()
    if (pPid !== prod.Pid) {
      this.setState({
        pPid: prod.Pid,
        pictures: prod.Pic,
        stocks: prod.Stock
      })
    }
  }

  render() {
    const {
      item,
      // loginToken,
      closeEdit,
      productPid,
      productDetail,
      handleGetProductAPI,
    } = this.props

    const {
      pic,
      picObject,
      openPicIndex,
      openPicture,
      newRecord,
      pid,
      title,
      description,
      fabric,
      price,
      priceOri,
      listed,
      pic1,
      pic2,
      pictures,
      stocks,
      changed,
      errorMsg,
      openConfirm,
      openAddPicture
    } = this.state

    if (pid > 0) {
      if (!productDetail || productPid !== pid) {
        handleGetProductAPI(pid)
      }
    }

    let picHeight = 30
    if (pictures) {
      picHeight = Math.ceil(pictures.length / 3) * 205
    }

    // console.log(100, newRecord, item, pictures, stocks)

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
                newRecord ? 'New Product' : 'Edit Product'
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
          <DialogContentDiv className={"DialogContentDiv"}>

            {
              pid > 0 ?
                <DialogContentLineDiv>
                  <DialogContentItemDiv>
                    Pid
                  </DialogContentItemDiv>
                  <MuiTextFieldDisabled
                    value={pid}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </DialogContentLineDiv> : undefined
            }

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Cat
              </DialogContentItemDiv>
              <MuiTextFieldDisabled
                value={item.Cat}
                InputProps={{
                  readOnly: true,
                }}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Price
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.priceRef}
                onChange={() => this.priceChange()}
                value={price}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                PriceOri
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.priceOriRef}
                onChange={() => this.priceOriChange()}
                value={priceOri}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv style={{paddingTop: '5px'}}>
                Listed
              </DialogContentItemDiv>
              <Switch
                checked={listed}
                onChange={(event) => this.listedChange(event)}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Title
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.titleRef}
                onChange={() => this.titleChange()}
                value={title}
                sx={{
                  '& .MuiInputBase-input': {
                    width: '400px'
                  }
                }}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Fabric
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.fabricRef}
                onChange={() => this.fabricChange()}
                value={fabric}
                sx={{
                  '& .MuiInputBase-input': {
                    width: '400px'
                  }
                }}
              />
            </DialogContentLineDiv>

            <DialogContentLineDiv style={{height: '250px'}}>
              <DialogContentItemDiv>
                Description
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.descriptionRef}
                onChange={() => this.descriptionChange()}
                value={description}
                multiline
                minRows={10}
                sx={{
                  '& .MuiInputBase-input': {
                    width: '400px',
                  },
                  '& .MuiOutlinedInput-root': {
                    height: '240px',
                  },
                }}
              />
            </DialogContentLineDiv>

            {
              pid > 0 ?
                <DialogContentLineDiv>
                  <DialogContentItemDiv>
                    Qty
                  </DialogContentItemDiv>
                  <MuiTextFieldDisabled
                    value={item.Qty}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </DialogContentLineDiv> : undefined
            }

            {
              stocks && stocks.length > 0 ?
                <DialogContentLineDiv style={{height: 'auto', paddingTop: 0}}>
                  <DialogContentItemDiv>
                    Size&Stock
                  </DialogContentItemDiv>
                  <div style={{width: 450, height: 'auto', float: 'left'}}>
                    {
                      stocks.map((item, index) => (
                        renderStock(item, index, true)
                      ))
                    }
                  </div>
                </DialogContentLineDiv> : undefined
            }

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Cover1
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.pic1Ref}
                onChange={() => this.pic1Change()}
                value={pic1}
                sx={{
                  '& .MuiInputBase-input': {
                    width: '400px'
                  }
                }}
              />
            </DialogContentLineDiv>

            {
              pic1 && pic1 !== "" ?
                <DialogContentLineDiv>
                  <DialogContentItemDiv>
                    {"\u00a0"}
                  </DialogContentItemDiv>
                  <DialogContentCategoryPictureImg
                    src={pic1}
                    alt={'pic'}
                    onClick={() => this.handleOpenPic(0, null, [pic1])}
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

            <DialogContentLineDiv>
              <DialogContentItemDiv>
                Cover2
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.pic2Ref}
                onChange={() => this.pic2Change()}
                value={pic2}
                sx={{
                  '& .MuiInputBase-input': {
                    width: '400px'
                  }
                }}
              />
            </DialogContentLineDiv>

            {
              pic2 && pic2 !== "" ?
                <DialogContentLineDiv>
                  <DialogContentItemDiv>
                    {"\u00a0"}
                  </DialogContentItemDiv>
                  <DialogContentCategoryPictureImg
                    src={pic2}
                    alt={'pic'}
                    onClick={() => this.handleOpenPic(0, null, [pic2])}
                  />
                  <IconButton
                    aria-label="delete" color="primary" component="span"
                    sx={{float: "left", margin: '115px 0 0 0'}}
                    onClick={(event)=>this.handleDeletePic2(event)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </DialogContentLineDiv> : undefined
            }

            {
              pictures ?
                <DialogContentLineDiv style={{height: 'auto'}}>
                  <DialogContentItemDiv>
                    Pictures
                  </DialogContentItemDiv>
                  <ImageList
                    sx={{ width: 400, height: picHeight }} cols={3} rowHeight={200}
                  >
                    {pictures.map((item, index) => (
                      <ImageListItem
                        onClick={() => this.handleOpenPic(index, null, pictures)}
                        sx={{cursor: 'pointer', display: 'flex'}}
                        key={index+item}
                      >
                        <img
                          src={`${item}`}
                          srcSet={`${item}`}
                          alt={"img"}
                          loading="lazy"
                        />
                        <IconButton
                          aria-label="delete" color="primary" component="span" size="small"
                          sx={{position: "absolute", bottom: 0, right: 0}}
                          onClick={(event)=>this.handleDeletePicture(event, index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ImageListItem>
                    ))}
                  </ImageList>
                </DialogContentLineDiv> : undefined
            }

            <DialogContentLineDiv style={{height: 'auto'}}>
              <DialogContentItemDiv>
                {"\u00a0"}
              </DialogContentItemDiv>
              <div style={{width: '400px', float: 'left'}}>
                <Button
                  variant="contained"
                  onClick={this.handleOpenAddPicture}
                >
                  Add Picture
                </Button>
                <Dialog
                  open={openAddPicture}
                  onClose={this.handleCloseAddPicture}
                  fullWidth
                >
                  <DialogTitle>Subscribe</DialogTitle>
                  <DialogContent>
                    <TextField
                      inputRef={this.pictureRef}
                      autoFocus
                      fullWidth
                      margin="dense"
                      id="url"
                      label="Picture Url"
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseAddPicture}>Cancel</Button>
                    <Button onClick={this.handleAddPicture}>Add</Button>
                  </DialogActions>
                </Dialog>
              </div>
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.handleInitProdDetail()
  }

}

export default EditProduct