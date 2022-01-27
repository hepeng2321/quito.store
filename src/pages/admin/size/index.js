import React, {PureComponent} from "react";
import {AdminGridDiv, AdminTitleDiv} from "./style";
import { DataGrid } from '@mui/x-data-grid';
import {connect} from "react-redux";
import {actionCreators} from "../../home/store";
import Button from "@mui/material/Button";
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {Autocomplete, ClickAwayListener, TextField} from "@material-ui/core";
import EditSize from "./edit";
import {sizeColumns} from "../columns";

class AdminSize extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editRow: null,
      selectedRow: null,
      selectedCategory: ''
    }
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
    let row = {
      SizeId: 0,
      Cat: '',
      Category: '',
      Size: ''
    }
    this.openEditDialog(row)
  }

  openCopy = () => {
    let row = this.state.selectedRow
    row.id = 0
    row.SizeId = 0
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
    this.setState({
      selectedCategory: value
    })
  }

  render() {

    const {
      size,
      category,
      handleGetSizeAPI,
      handleGetCategoryAPI
    } = this.props

    const {
      edit,
      editRow,
      selectedRow,
      selectedCategory
    } = this.state

    if (!size) {
      handleGetSizeAPI()
      return null
    }

    let sizeJS = size.toJS()
    let sizes = []
    if (!selectedCategory || selectedCategory === "") {
      for (let size of sizeJS) {
        size.id = size.SizeId
        sizes.push(size)
      }
    } else {
      for (let size of sizeJS) {
        if (size.Cat === selectedCategory) {
          size.id = size.SizeId
          sizes.push(size)
        }
      }
    }


    let cats = []
    if (!category) {
      handleGetCategoryAPI()
    } else {
      for (const c of category) {
        cats.push(c.get('Cat'))
      }
    }

    // console.log('sizes', sizes, this.picWidth)

    return (
      <React.Fragment>
        <AdminTitleDiv>
          Size
          <Button
            size="small"
            variant="outlined"
            sx={{marginLeft: '20px', fontSize: '12px', padding: '3px 15px'}}
            startIcon={<AddCardIcon />}
            onClick={()=>this.openNew()}
          >
            New
          </Button>
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

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={cats}
          sx={{
            width: 300, marginTop: '5px',
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

        <AdminGridDiv>
          <ClickAwayListener onClickAway={this.unselected}>
            <DataGrid
              rowHeight={38}
              headerHeight={38}
              rows={sizes}
              columns={sizeColumns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              sx={{
                width: "550px",
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
              <EditSize
                closeEdit={this.closeEdit}
                item={editRow}
                categoryList={category}
                handleGetSizeAPI={handleGetSizeAPI}
              /> : undefined
          }
        </AdminGridDiv>
      </React.Fragment>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    size: state.getIn(['home', 'size']),
    category: state.getIn(['home', 'category']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCategoryAPI() {
      dispatch(actionCreators.getCategoryAPI())
    },
    handleGetSizeAPI() {
      dispatch(actionCreators.getSizeAPI())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSize);
