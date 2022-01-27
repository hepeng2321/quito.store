import React, {PureComponent} from "react";
import {AdminGridDiv, AdminTitleDiv} from "./style";
import { DataGrid } from '@mui/x-data-grid';
import {connect} from "react-redux";
import {actionCreators} from "../../home/store";
import ReactDOM from "react-dom";
import EditCategory from "./edit";
import Button from "@mui/material/Button";
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {categoryColumns} from "../columns";
import {ClickAwayListener} from "@material-ui/core";

class AdminCategory extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editRow: null,
      selectedRow: null
    }
    const domNode = ReactDOM.findDOMNode(this.props.cRef.current);
    const dom = domNode.getBoundingClientRect()
    this.picWidth = dom.width - 600
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
      Id: 0,
      Cat: '',
      Category: '',
      Parent: '',
      Brother: '',
      Width: '',
      Pic: ''
    }
    this.openEditDialog(row)
  }

  openCopy = () => {
    let row = this.state.selectedRow
    row.id = 0
    row.Id = 0
    this.openEditDialog(row)
  }

  closeEdit = () => {
    this.setState({
      edit: false,
      editRow: null,
      selectedRow: null
    })
  }

  render() {

    const {
      category,
      handleGetCategoryAPI
    } = this.props

    const {
      edit,
      editRow,
      selectedRow
    } = this.state

    if (!category) {
      handleGetCategoryAPI()
      return null
    }

    let categoryJS = category.toJS()
    let cats = []
    for (let cat of categoryJS) {
      cat.id = cat.Id
      cats.push(cat)
    }

    // console.log('cats', cats, this.picWidth)

    return (
      <React.Fragment>
        <AdminTitleDiv>
          Category
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

        <AdminGridDiv>
          <ClickAwayListener onClickAway={this.unselected}>
            <DataGrid
              rowHeight={38}
              headerHeight={38}
              rows={cats}
              columns={categoryColumns(this.picWidth)}
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
              <EditCategory
                closeEdit={this.closeEdit}
                item={editRow}
                categoryList={category}
                handleGetCategoryAPI={handleGetCategoryAPI}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCategoryAPI() {
      dispatch(actionCreators.getCategoryAPI())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategory);
