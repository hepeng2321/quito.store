import {
  ProductDetailPictureAreaDiv,
  ProductDetailPictureAreaDivMobile,
  ProductDetailPictureGroupDiv, ProductDetailPictureGroupPictureDiv,
  ProductDetailStockAreaDiv,
  ProductDetailStockAreaDivMobile,
  ProductDetailTop1Div,
  ProductDetailWrapperDiv,
} from "./style";
import * as React from "react";
import {Hidden} from "@mui/material";
import {RenderProductStock} from "./pStock";
import ProductPictures from "./pPictures";

export default function ProductDetail(props) {

  const {
    product,
  } = props

  return (
    <ProductDetailWrapperDiv className={"ProductDetailWrapperDiv"}>
      <Hidden mdDown>
        <ProductDetailTop1Div className={"ProductDetailTop1Div"}>
          <ProductDetailPictureAreaDiv className={"ProductDetailPictureAreaDiv"}>
            <ProductPictures
              product={product}
            />
          </ProductDetailPictureAreaDiv>
          <ProductDetailStockAreaDiv className={"ProductDetailStockAreaDiv"}>
            <RenderProductStock
              product={product}
            />
          </ProductDetailStockAreaDiv>
        </ProductDetailTop1Div>
      </Hidden>
      <Hidden mdUp>
        <ProductDetailPictureAreaDivMobile className={"ProductDetailPictureAreaDivMobile"}>
          <ProductPictures
            product={product}
          />
        </ProductDetailPictureAreaDivMobile>
        <ProductDetailStockAreaDivMobile className={"ProductDetailStockAreaDivMobile"}>
          <RenderProductStock
            product={product}
          />
        </ProductDetailStockAreaDivMobile>
      </Hidden>
      <ProductDetailPictureGroupDiv>
        {
          product.Pic.map((item, index) => (
            <ProductDetailPictureGroupPictureDiv
              key={index+item}
              src={item}
              alt={"img"}
            />
          ))
        }

      </ProductDetailPictureGroupDiv>
    </ProductDetailWrapperDiv>
  )

}