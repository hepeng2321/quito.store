import * as React from 'react';
import {
  DialogContentActionDiv,
  DialogContentDiv, DialogContentItemDisableDiv, DialogContentItemDiv, DialogContentLineDiv,
  DialogTitleCloseDiv,
  DialogTitleDiv,
  DialogTitleTextDiv, InboundGridDiv,
  MuiDialog, MuiInboundTextField, MuiTextField, MuiTextFieldDisabled
} from "./style";
import {
  Alert, ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Slide, Switch,
} from "@material-ui/core";
import {PureComponent} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import {renderStock} from "../../../common/product/pDetail/pStock";
import ShowPicture from "../../../common/picture";
import {DialogContentCategoryPictureImg} from "../category/style";
import {DataGrid} from "@mui/x-data-grid";
import {inboundColumns} from "../columns";
import {inboundAPI, reverseInboundAPI} from "./db";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class EditInbound extends PureComponent{

  constructor(props) {
    super(props);

    this.state = {
      openPicture: false,
      pic: [],
      picObject: [],
      openPicIndex: 0,

      selectedRow: null,

      pPid: 0,
      product: null,
      stocks: null,

      sCat: 0,
      catSizeList: null,

      iPid: 0,
      inboundList: null,

      pid: props.item.Pid,
      cat: props.item.Cat,
      listed: Boolean(props.item.Listed > 0),

      changed: false,
      changedInbound: false,
      errorMsg: "",
      openConfirm: false,

    }
  }

  pPid = 0
  iPid = 0
  sCat = ""
  source = ""
  desc = ""
  inboundRefList = []
  sourceRef = React.createRef()
  descRef = React.createRef()

  selected = (GridRowParams) => {
    if (GridRowParams.row.ReverseId === 0) {
      this.setState({
        selectedRow: GridRowParams.row
      })
    } else {
      this.setState({
        selectedRow: null
      })
    }
  }

  unselected = () => {
    this.setState({
      selectedRow: null
    })
  }

  sourceChange = (e) => {
    const {catSizeList, changed} = this.state
    const inputText = e.target.value
    this.source = inputText
    if ((inputText !== "") && !changed) {
      this.setState({
        changed: true
      });
    } else if (
      changed &&
      inputText === "" &&
      this.desc === "" &&
      this.checkInboundZero(catSizeList)
    ) {
      this.setState({
        changed: false
      });
    }
  }

  descChange = (e) => {
    const {catSizeList, changed} = this.state
    const inputText = e.target.value
    this.desc = inputText
    if ((inputText !== "") && !changed) {
      this.setState({
        changed: true
      });
    } else if (
      changed &&
      inputText === "" &&
      this.source === "" &&
      this.checkInboundZero(catSizeList)
    ) {
      this.setState({
        changed: false
      });
    }
  }

  checkInboundZero(list) {
    for (let c of list) {
      if (c.Qty && c.Qty > 0) {
        return false
      }
    }
    return true
  }

  inboundChange = (e, size) => {
    let qty = this.checkQty(e.target.value)
    const {
      catSizeList
    } = this.state
    for (let c of catSizeList) {
      if (c.Size === size) {
        c.Qty = qty
      }
    }
    let changed = true
    let changedInbound = !this.checkInboundZero(catSizeList)
    if (qty === 0 && !changedInbound) {
      changed = this.source !== "" || this.desc !== "";
    }
    this.setState({
      changed: changed,
      changedInbound: changedInbound,
      catSizeList: catSizeList
    })
  }

  checkQty = (qty) => {
    const {errorMsg} = this.state
    if (qty === "") {
      if (errorMsg !== "") {
        this.setState({
          errorMsg: ""
        })
      }
      return 0
    } else {
      let pattern = new RegExp(/(^[0-9]*$)/);
      let result = pattern.test(qty)
      if (!result) {
        this.setState({
          errorMsg: 'Inbound: Must be a number'
        })
        return 0
      } else {
        if (errorMsg !== "") {
          this.setState({
            errorMsg: ""
          })
        }
        return Number(qty)
      }
    }
  }

  restoreChange = () => {
    for (let inboundRef of this.inboundRefList) {
      if (inboundRef.current.value !== "") {
        inboundRef.current.value = ""
      }
    }
    this.sourceRef.current.value = ""
    this.descRef.current.value = ""
    this.setState({
      changed: false
    })
  }

  saveChange = () => {
    const {
      cat, pid, catSizeList, errorMsg
    } = this.state
    const {
      handleGetCatProductAPI,
      handleGetProductAPI,
      handleGetInboundAPI
    } = this.props
    if (errorMsg === "" && !this.checkInboundZero(catSizeList)) {
      inboundAPI(cat, pid, this.source, this.desc, catSizeList, handleGetCatProductAPI, handleGetProductAPI, handleGetInboundAPI)
      this.restoreChange()
    }
  }

  reverseInbound = () => {
    const {
      cat, pid, selectedRow
    } = this.state
    const {
      handleGetCatProductAPI,
      handleGetProductAPI,
      handleGetInboundAPI
    } = this.props
    reverseInboundAPI(cat, pid, selectedRow.Id, handleGetCatProductAPI, handleGetProductAPI, handleGetInboundAPI)
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
    // const {
    //   pid,
    //   cat
    // } = this.state
    const {
      closeEdit,
      // handleGetCatProductAPI
    } = this.props
    // deleteProductAPI(pid, cat, handleGetCatProductAPI)
    closeEdit()
  };

  handleInitProdDetail = () => {
    const {
      sizeCat,
      catSize,
      productPid,
      productDetail,
      inboundPid,
      inbound,
    } = this.props
    const {pPid, iPid, sCat, inboundList, product} = this.state
    if (iPid !== inboundPid) {    // 初始状态
      let inboundList = []
      if (inbound) {
        for (let i of inbound.toJS()) {
          i.id = i.Id
          inboundList.push(i)
        }
      }
      this.setState({
        iPid: inboundPid,
        inboundList: inboundList
      })
    } else {  //有更新的情况
      if (inbound && inbound.size > inboundList.length) {
        let inboundList = []
        for (let i of inbound.toJS()) {
          i.id = i.Id
          inboundList.push(i)
        }
        this.setState({
          inboundList: inboundList
        })
      }
    }
    if (pPid !== productPid) {
      if (productDetail) {
        this.setState({
          pPid: productPid,
          product: productDetail.toJS()
        })
      } else {
        this.setState({
          pPid: productPid,
        })
      }
    } else {
      if (productDetail) {
        if (product.Qty !== productDetail.get('Qty')) {
          this.setState({
            product: productDetail.toJS()
          })
        }
      }
    }
    if (sCat !== sizeCat) {
      if (catSize) {
        this.setState({
          sCat: sizeCat,
          catSizeList: catSize.toJS()
        })
      } else {
        this.setState({
          sCat: sizeCat
        })
      }

    }
  }

  render() {
    const {
      item,
      // loginToken,
      closeEdit,
      productPid,
      sizeCat,
      inboundPid,
      handleGetInboundAPI,
      handleGetProductAPI,
      handleGetCatSizeAPI,
    } = this.props

    const {
      pic,
      picObject,
      openPicIndex,
      openPicture,
      selectedRow,
      product,
      inboundList,
      catSizeList,
      pid,
      cat,
      listed,
      changed,
      changedInbound,
      errorMsg,
      openConfirm,
    } = this.state


    // console.log(100, pid, "|", inboundPid, "|", productPid, "|", sizeCat, "|", inboundList)

    if (pid !== inboundPid && pid !== this.iPid) {
      this.iPid = pid
      handleGetInboundAPI(pid)
    } else if (pid !== productPid && pid !== this.pPid) {
      this.pPid = pid
      handleGetProductAPI(pid)
    } else if (cat !== sizeCat && cat !== this.sCat) {
      this.sCat = cat
      handleGetCatSizeAPI(cat)
    }

    if (catSizeList && catSizeList.length > 0 && this.inboundRefList.length === 0) {
      for (let i = 0; i < catSizeList.length; ++i) {
        this.inboundRefList.push(React.createRef())
      }
    }

    return (
      <MuiDialog
        className={"MuiDialog"}
        open={true}
        disableEscapeKeyDown
        fullWidth
        maxWidth="md"
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
              Input Inbound
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
          <Divider sx={{width: 870}}/>
          <DialogContentDiv className={"DialogContentDiv"}>

            <div style={{float: 'left'}}>
              <DialogContentLineDiv>
                <DialogContentItemDisableDiv>
                  Pid
                </DialogContentItemDisableDiv>
                <MuiTextFieldDisabled
                  value={pid}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <DialogContentItemDisableDiv>
                  Cat
                </DialogContentItemDisableDiv>
                <MuiTextFieldDisabled
                  value={item.Cat}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      width: '150px'
                    }
                  }}
                />
                <DialogContentItemDisableDiv>
                  Price
                </DialogContentItemDisableDiv>
                <MuiTextFieldDisabled
                  value={item.price}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <DialogContentItemDisableDiv>
                  PriceOri
                </DialogContentItemDisableDiv>
                <MuiTextFieldDisabled
                  value={item.priceOri}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </DialogContentLineDiv>

              <DialogContentLineDiv>
                <DialogContentItemDisableDiv>
                  Title
                </DialogContentItemDisableDiv>
                <MuiTextFieldDisabled
                  value={item.title}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      width: '310px'
                    }
                  }}
                />
                <DialogContentItemDisableDiv>
                  Fabric
                </DialogContentItemDisableDiv>
                <MuiTextFieldDisabled
                  value={item.fabric}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      width: '240px'
                    }
                  }}
                />
              </DialogContentLineDiv>

              <DialogContentLineDiv>
                <DialogContentItemDisableDiv>
                  Qty
                </DialogContentItemDisableDiv>
                <MuiTextFieldDisabled
                  value={product ? product.Qty : 0}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <DialogContentItemDisableDiv>
                  Listed
                </DialogContentItemDisableDiv>
                <Switch
                  size="small"
                  disabled
                  checked={listed}
                  sx={{marginTop: '-2px'}}
                />
              </DialogContentLineDiv>

              {
                product && product.Stock && product.Stock.length > 0 ?
                  <DialogContentLineDiv style={{height: 'auto', paddingTop: 0}}>
                    <DialogContentItemDisableDiv style={{paddingTop: '3px'}}>
                      Size&Stock
                    </DialogContentItemDisableDiv>
                    <div style={{width: 680, height: 'auto', float: 'left'}}>
                      {
                        product.Stock.map((item, index) => (
                          renderStock(item, index, true)
                        ))
                      }
                    </div>
                  </DialogContentLineDiv> : undefined
              }

            </div>

            {
              product ?
                <div style={{float: 'right', marginRight: '10px'}}>
                  <DialogContentLineDiv>
                    <DialogContentCategoryPictureImg
                      src={product.Pic1}
                      alt={'pic'}
                      onClick={() => this.handleOpenPic(0, null, [product.Pic1])}
                    />
                  </DialogContentLineDiv>
                </div> : undefined
            }

            <DialogContentLineDiv>
              <DialogContentItemDiv
                style={{lineHeight: '30px'}}
              >
                Source
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.sourceRef}
                onChange={(event) => this.sourceChange(event)}
                sx={{
                  '& .MuiInputBase-input': {
                    width: '300px'
                  }
                }}
              />
              <DialogContentItemDiv
                style={{lineHeight: '30px'}}
              >
                Desc
              </DialogContentItemDiv>
              <MuiTextField
                inputRef={this.descRef}
                onChange={(event) => this.descChange(event)}
                sx={{
                  '& .MuiInputBase-input': {
                    width: '380px'
                  }
                }}
              />
            </DialogContentLineDiv>

            {
              catSizeList && catSizeList.length > 0 ?
                <DialogContentLineDiv>
                  <DialogContentItemDiv>
                    Inbound
                  </DialogContentItemDiv>
                  <div style={{width: 800, height: 'auto', float: 'left'}}>
                    {
                      catSizeList.map((item, index) => (
                        <MuiInboundTextField
                          inputRef = {this.inboundRefList[index]}
                          size="small"
                          label={item.Size}
                          onChange={(event) => this.inboundChange(event, item.Size)}
                          sx={{
                            '& .MuiInputBase-input': {
                              width: '80px'
                            }
                          }}
                        />
                      ))
                    }
                  </div>
                </DialogContentLineDiv> : undefined
            }

            {
              inboundList && inboundList.length > 0 ?
                <InboundGridDiv>
                  <ClickAwayListener onClickAway={this.unselected}>
                    <DataGrid
                      rowHeight={30}
                      headerHeight={30}
                      rows={inboundList}
                      columns={inboundColumns}
                      pageSize={50}
                      rowsPerPageOptions={[50]}
                      sx={{
                        '& .MuiDataGrid-columnHeaderTitleContainer': {
                          padding: '0 6px 0 0'
                        },
                        '& .MuiDataGrid-columnHeaders': {
                          background: '#ddd'
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                          fontSize: '13px'
                        },
                        '& .MuiDataGrid-cell': {
                          fontSize: '13px'
                        }

                      }}
                      onRowClick={this.selected}
                    />
                  </ClickAwayListener>

                </InboundGridDiv> : undefined
            }

          </DialogContentDiv>
        </DialogContent>

        <DialogContentActionDiv>
          <Divider sx={{width: 860, marginBottom: '10px'}}/>
          {
            errorMsg !== "" ?
              <Alert
                severity="error"
                sx={{mt: 1, mb:1}}
              >
                {errorMsg}
              </Alert> : undefined
          }

          {
            changedInbound ?
              <Button
                variant="contained"
                onClick={this.saveChange}
                sx={{marginLeft: '20px', float: 'left'}}
              >
                Save Inbound
              </Button> : undefined
          }

          {
            changed ?
              <Button
                variant="outlined"
                onClick={this.restoreChange}
                sx={{marginLeft: '20px', float: 'left'}}
              >
                Restore
              </Button> : undefined
          }

          {
            selectedRow ?
              <Button
                variant="contained"
                color="error"
                onClick={this.reverseInbound}
                sx={{marginLeft: '20px', float: 'left'}}
              >
                Reverse
              </Button> : undefined
          }

          <Button
            variant="outlined"
            onClick={closeEdit}
            sx={{float: 'right'}}
          >
            Close
          </Button>

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

  componentDidMount() {
    this.handleInitProdDetail()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.handleInitProdDetail()
  }

}

export default EditInbound