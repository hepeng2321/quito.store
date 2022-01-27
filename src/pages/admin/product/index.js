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
import EditProduct from "./edit";
import {productColumns} from "../columns";

class AdminProduct extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editRow: null,
      selectedRow: null,
      selectedCategory: props.adminCat,
      selectedTitle: '',
      selectedListed: false
    }
    const domNode = ReactDOM.findDOMNode(this.props.cRef.current);
    const dom = domNode.getBoundingClientRect()
    this.titleWidth = dom.width - 620
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
      selectedCategory
    } = this.state
    let row = {
      Pid: 0,
      Cat: selectedCategory,
      Title: '',
      Fabric: '',
      Price: 0,
      PriceOri: 0
    }
    this.openEditDialog(row)
  }

  openCopy = () => {
    let row = this.state.selectedRow
    row.id = 0
    row.Pid = 0
    this.openEditDialog(row)
  }

  closeEdit = () => {
    this.setState({
      edit: false,
      editRow: null,
      selectedRow: null
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
      productPid,
      productDetail,
      handleGetCategoryAPI,
      handleGetCatProductAPI,
      handleGetProductAPI,
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
          Product
          {
            selectedCategory && selectedCategory !== "" ?
              <Button
                size="small"
                variant="outlined"
                sx={{marginLeft: '20px', fontSize: '12px', padding: '3px 15px'}}
                startIcon={<AddCardIcon />}
                onClick={()=>this.openNew()}
              >
                New
              </Button> : undefined
          }
          {
            selectedRow ?
              <Button
                size="small"
                variant="outlined"
                sx={{marginLeft: '20px', fontSize: '12px', padding: '3px 15px'}}
                startIcon={<EditIcon/>}
                onClick={()=>this.openEditDialog(selectedRow)}
              >
                Edit
              </Button> : undefined
          }
          {
            selectedRow ?
              <Button
                size="small"
                variant="outlined"
                sx={{marginLeft: '20px', fontSize: '12px', padding: '3px 15px'}}
                startIcon={<ContentCopyIcon />}
                onClick={()=>this.openCopy()}
              >
                Copy
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
              <EditProduct
                closeEdit={this.closeEdit}
                item={editRow}
                productPid={productPid}
                productDetail={productDetail}
                handleGetProductAPI={handleGetProductAPI}
                handleGetCatProductAPI={handleGetCatProductAPI}
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
    adminCat: state.getIn(['shop', 'cat']),
    catProduct: state.getIn(['shop', 'catProduct']),
    productPid: state.getIn(['product', 'pid']),
    productDetail: state.getIn(['product', 'product']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCategoryAPI() {
      dispatch(acHome.getCategoryAPI())
    },
    handleGetCatProductAPI(cat) {
      dispatch(acShop.getCatProductAPI(cat))
    },
    handleGetProductAPI(pid) {
      dispatch(acProduct.getProductAPI(pid))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);
