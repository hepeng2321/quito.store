import * as React from "react";

import {
  ProductDetailItemDiv, ProductDetailItemStockDiv, ProductDetailItemTitleDiv, ProductDetailItemValueDiv,
  ProductDetailStockAreaDiv,
  ProductDetailTitleDiv,
  ProductItemPriceText2Div, ProductItemPriceText3Div, ProductItemPriceText4Div,
  ProductItemPriceTextDiv
} from "./style";
import Button from "@mui/material/Button";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function renderPrice(price, priceOri) {
  if (price > 0 && price < priceOri) {
    return (
      <ProductItemPriceTextDiv>
        <ProductItemPriceText2Div>
          ${price.toFixed(2)}
        </ProductItemPriceText2Div>
        <ProductItemPriceTextDiv>
          <ProductItemPriceText3Div>
            ${priceOri.toFixed(2)}
          </ProductItemPriceText3Div>
          <ProductItemPriceText4Div>
            ({(100 - price * 100 / priceOri).toFixed(0)}% off)
          </ProductItemPriceText4Div>
        </ProductItemPriceTextDiv>
      </ProductItemPriceTextDiv>
    )
  } else if (price === priceOri){
    return (
      <ProductItemPriceTextDiv>
        <ProductItemPriceText2Div>
          ${price.toFixed(2)}
        </ProductItemPriceText2Div>
      </ProductItemPriceTextDiv>
    )
  } else {
    return (
      <ProductItemPriceTextDiv>
        <ProductItemPriceText2Div>
          <WhatsAppIcon fontSize="large" sx={{color: "#2BBB4B"}}/>
        </ProductItemPriceText2Div>
        <ProductItemPriceText3Div
          className={"ProductItemPriceText3Div"}
          style={{padding: '5px 5px 0 10px'}}>
          ${priceOri.toFixed(2)}
        </ProductItemPriceText3Div>
      </ProductItemPriceTextDiv>
    )
  }
}

export function renderStock(item, index, dispalyStock) {

  const {
    Size,
    Qty
  } = item

  let disable
  if (Qty > 0) {
    disable = false
  } else {
    disable = true
  }

  let stock
  if (!dispalyStock) {
    if ((Qty <= 2) && (Qty > 0)) {
      stock = Size + " (" + Qty + ")"
    } else {
      stock = Size
    }
  } else {
    stock = Size + " (" + Qty + ")"
  }

  return (
    <Button
      variant="outlined"
      size="small"
      key={index+Size}
      sx={{textTransform: 'none', margin: '2px 10px 7px 0', height: "25px", borderRadius: 0}}
      disabled={disable}
    >
      {stock}
    </Button>
  )

}

export function RenderProductStock(props) {
  const {
    product
  } = props
  return (
    <ProductDetailStockAreaDiv>
      <ProductDetailTitleDiv>
        {product.Title}
      </ProductDetailTitleDiv>

      {renderPrice(product.Price, product.PriceOri)}

      <React.Fragment>
        {
          product.Stock ?
            <React.Fragment>
              <ProductDetailItemDiv style={{padding: '8px 0 0 0'}}>
                <ProductDetailItemTitleDiv>
                  Size & Stock:
                </ProductDetailItemTitleDiv>
              </ProductDetailItemDiv>
              <ProductDetailItemStockDiv>
                {
                  product.Stock.map((item, index) => (
                    renderStock(item, index)
                  ))
                }
              </ProductDetailItemStockDiv>
            </React.Fragment> :
            <ProductDetailItemDiv style={{padding: '8px 0 0 0'}}>
              <ProductDetailItemTitleDiv>
                Size & Stock:
              </ProductDetailItemTitleDiv>
              <ProductDetailItemValueDiv style={{fontSize: '14px'}}>
                Out of stock
              </ProductDetailItemValueDiv>
            </ProductDetailItemDiv>
        }

      </React.Fragment>

      {
        product.Fabric && product.Fabric !== "" ?
          <ProductDetailItemDiv>
            <ProductDetailItemTitleDiv>
              Fabric:
            </ProductDetailItemTitleDiv>
            <ProductDetailItemValueDiv>
              {product.Fabric}
            </ProductDetailItemValueDiv>
          </ProductDetailItemDiv> : undefined
      }

      {
        product.Description !== "" ?
          <React.Fragment>
            <ProductDetailItemTitleDiv style={{marginTop: '8px'}}>
              Description:
            </ProductDetailItemTitleDiv>
            <ProductDetailItemValueDiv style={{marginLeft: 0}}>
              {product.Description}
            </ProductDetailItemValueDiv>
          </React.Fragment>
        : undefined
      }

    </ProductDetailStockAreaDiv>
  )
}
