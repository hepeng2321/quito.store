import React, {PureComponent} from "react";
import {AdminGridDiv, AdminTitleDiv} from "./style";
import { DataGrid } from '@mui/x-data-grid';
import {connect} from "react-redux";
import {actionCreators as acHome} from "../../home/store";
import {actionCreators as acShop} from "../../shop/store";
import {actionCreators as acProduct} from "../../product/store";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {Autocomplete, ClickAwayListener, FormControlLabel, FormGroup, Switch, TextField} from "@material-ui/core";
import {productColumns} from "../columns";
import EditInbound from "./edit";

class AdminInbound extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editRow: null,
      selectedRow: null,
      selectedPid: 0,
      selectedCategory: "",
      selectedTitle: '',
      selectedListed: false
    }
    const domNode = ReactDOM.findDOMNode(this.props.cRef.current);
    const dom = domNode.getBoundingClientRect()
    this.titleWidth = dom.width - 630
    this.titleRef = React.createRef()
    this.defaultCat = props.adminCat
  }

  selected = (GridRowParams) => {
    this.setState({
      selectedRow: GridRowParams.row
    })
  }

  unselected = () => {
    this.setState({
      selectedRow: null
    })
  }

  openEditDialog = (row) => {
    this.setState({
      edit: true,
      editRow: row
    })
  }

  openEdit = (GridRowParams) => {
    this.openEditDialog(GridRowParams.row)
  }

  openNew = () => {
    const {
      selectedPid
    } = this.state
    let row = {
      Id: 0,
      Pid: selectedPid
    }
    this.openEditDialog(row)
  }

  openCopy = () => {
    const {
      selectedPid
    } = this.state
    let row = this.state.selectedRow
    row.id = 0
    row.Id = 0
    row.Pid = selectedPid
    this.openEditDialog(row)
  }

  closeEdit = () => {
    this.setState({
      edit: false,
      editRow: null,
      selectedRow: null,
      selectedPid: 0
    })
  }

  changeCategory = (event, value) => {
    const {
      handleGetCatProductAPI
    } = this.props
    this.setState({
      selectedCategory: value,
      selectedTitle: ""
    })
    handleGetCatProductAPI(value)
  }

  titleChange = () => {
    const {selectedTitle} = this.state
    const inputText = this.titleRef.current.value
    if (inputText !== selectedTitle) {
      this.setState({
        selectedTitle: inputText
      })
    }
  }

  listedChange = (e) => {
    this.setState({
      selectedListed: e.target.checked
    })
  }

  render() {

    const {
      category,
      catProduct,
      inboundPid,
      inbound,
      sizeCat,
      catSize,
      productPid,
      productDetail,
      handleGetCategoryAPI,
      handleGetCatProductAPI,
      handleGetInboundAPI,
      handleGetProductAPI,
      handleGetCatSizeAPI,
      handleOpenPic,
    } = this.props

    const {
      edit,
      editRow,
      selectedRow,
      selectedCategory,
      selectedTitle,
      selectedListed,
    } = this.state

    let cats = []
    if (!category) {
      handleGetCategoryAPI()
      return null
    } else {
      for (const c of category) {
        cats.push(c.get('Cat'))
      }
    }

    let products = []
    if (catProduct) {
      let catProductJS = catProduct.toJS()
      for (let prod of catProductJS) {
        if (selectedListed && prod.Listed === 0) {
          continue
        }
        if (!selectedTitle ||
          selectedTitle === "" ||
          prod.Title.toUpperCase().search(selectedTitle.toUpperCase()) >= 0
        ) {
          prod.id = prod.Pid
          products.push(prod)
        }
      }
    }

    // console.log('100 products', products, cats)

    return (
      <React.Fragment>
        <AdminTitleDiv>
          Inbound
          {
            selectedRow ?
              <Button
                size="small"
                variant="outlined"
                sx={{marginLeft: '20px', fontSize: '12px', padding: '3px 15px'}}
                startIcon={<EditIcon/>}
                onClick={()=>this.openEditDialog(selectedRow)}
              >
                Input
              </Button> : undefined
          }
        </AdminTitleDiv>

        <div style={{display: 'flex'}}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cats}
            defaultValue={cats && cats.length > 0 && this.defaultCat && this.defaultCat !== "" ? this.defaultCat : undefined}
            sx={{
              float: 'left', width: 200, margin: '5px 5px 0 0',
              '& .MuiInputLabel-root': {
                paddingLeft: '12px'
              },
              '& .MuiInput-root': {
                paddingLeft: '10px'
              }
            }}
            onChange={this.changeCategory}
            renderInput={
              (params) =>
                <TextField
                  {...params}
                  label="Category"
                  variant="standard"
                />
            }
          />

          <TextField
            inputRef={this.titleRef}
            onChange={this.titleChange}
            label="Title"
            variant="standard"
            sx={{
              float: 'left', width: 200, margin: '5px 5px 0 10px',
              '& .MuiInputLabel-root': {
                paddingLeft: '12px'
              },
              '& .MuiInput-root': {
                paddingLeft: '10px'
              }
            }}
          />

          <FormGroup sx={{float: 'left', margin: '20px 5px 0 10px'}}>
            <FormControlLabel
              label="Listed"
              labelPlacement="start"
              control={
                <Switch
                  onChange={(event) => this.listedChange(event)}
                />
              }
            />
          </FormGroup>

        </div>

        <AdminGridDiv>
          <ClickAwayListener onClickAway={this.unselected}>
            <DataGrid
              rowHeight={38}
              headerHeight={38}
              rows={products}
              columns={productColumns(this.titleWidth)}
              pageSize={10}
              rowsPerPageOptions={[10]}
              sx={{
                '& .MuiDataGrid-columnHeaderTitleContainer': {
                  padding: '0 6px 0 0'
                },
                '& .MuiDataGrid-columnHeaders': {
                  background: '#ddd'
                }
              }}
              // checkboxSelection
              // disableSelectionOnClick
              onRowClick={this.selected}
              onRowDoubleClick={this.openEdit}
            />
          </ClickAwayListener>
          {
            edit ?
              <EditInbound
                closeEdit={this.closeEdit}
                item={editRow}
                sizeCat={sizeCat}
                catSize={catSize}
                productPid={productPid}
                productDetail={productDetail}
                inboundPid={inboundPid}
                inbound={inbound}
                handleGetInboundAPI={handleGetInboundAPI}
                handleGetCatProductAPI={handleGetCatProductAPI}
                handleGetProductAPI={handleGetProductAPI}
                handleGetCatSizeAPI={handleGetCatSizeAPI}
                handleOpenPic={handleOpenPic}
              /> : undefined
          }
        </AdminGridDiv>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.getIn(['home', 'category']),
    sizeCat: state.getIn(['home', 'sizeCat']),
    catSize: state.getIn(['home', 'catSize']),
    adminCat: state.getIn(['shop', 'cat']),
    catProduct: state.getIn(['shop', 'catProduct']),
    productPid: state.getIn(['product', 'pid']),
    productDetail: state.getIn(['product', 'product']),
    inboundPid: state.getIn(['product', 'inboundPid']),
    inbound: state.getIn(['product', 'inbound']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCategoryAPI() {
      dispatch(acHome.getCategoryAPI())
    },
    handleGetCatSizeAPI(cat) {
      dispatch(acHome.getCatSizeAPI(cat))
    },
    handleGetCatProductAPI(cat) {
      dispatch(acShop.getCatProductAPI(cat))
    },
    handleGetProductAPI(pid) {
      dispatch(acProduct.getProductAPI(pid))
    },
    handleGetInboundAPI(pid) {
      dispatch(acProduct.getInboundAPI(pid))
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminInbound);
