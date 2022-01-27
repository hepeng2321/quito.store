export const productColumns = (titleWidth) => {
  return (
    [
      // { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'Pid',
        headerName: 'Pid',
        width: 40
      },
      {
        field: 'Cat',
        headerName: 'Cat',
        width: 80
      },
      {
        field: 'Title',
        headerName: 'Title',
        width: titleWidth,
      },
      {
        field: 'Fabric',
        headerName: 'Fabric',
        width: 150,
      },
      {
        field: 'Price',
        headerName: 'Price',
        width: 100,
      },
      {
        field: 'PriceOri',
        headerName: 'PriceOri',
        width: 100,
      },
      {
        field: 'Qty',
        headerName: 'Qty',
        width: 50,
      },
      {
        field: 'Listed',
        headerName: 'Listed',
        width: 60,
      },
    ]
  )
}

export const categoryColumns = (picWidth) => {
  return (
    [
      // { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'Cat',
        headerName: 'Cat',
        width: 100
      },
      {
        field: 'Category',
        headerName: 'Category',
        width: 200,
      },
      {
        field: 'Parent',
        headerName: 'Parent',
        width: 100,
      },
      {
        field: 'Brother',
        headerName: 'Brother',
        width: 100,
      },
      {
        field: 'Width',
        headerName: 'Width',
        width: 60,
      },
      {
        field: 'Pic',
        headerName: 'Picture',
        width: picWidth,
      },
    ]
  )
}

export const sizeColumns = [
  // { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Cat',
    headerName: 'Cat',
    width: 150
  },
  {
    field: 'Category',
    headerName: 'Category',
    width: 200,
  },
  {
    field: 'Size',
    headerName: 'Size',
    width: 150,
  }
];

export const inboundColumns = [
      // { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'Id',
        headerName: 'Id',
        width: 30
      },
      {
        field: 'InboundPeriod',
        headerName: 'Period',
        width: 60
      },
      {
        field: 'InboundDate',
        headerName: 'Date',
        width: 80
      },
      {
        field: 'Opt',
        headerName: 'Opt',
        width: 100
      },
      {
        field: 'InboundType',
        headerName: 'Type',
        width: 100,
      },
      {
        field: 'InboundSource',
        headerName: 'Source',
        width: 130,
      },
      {
        field: 'InboundDesc',
        headerName: 'Description',
        width: 150,
      },
      {
        field: 'Size',
        headerName: 'Size',
        width: 60,
      },
      {
        field: 'InboundQty',
        headerName: 'Qty',
        width: 60,
      },
      {
        field: 'ReverseId',
        headerName: 'Revered',
        width: 70
      },

    ]