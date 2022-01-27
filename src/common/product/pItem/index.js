import * as React from "react";
import {Link} from "react-router-dom"
import {
  ProductItemPictureImg,
  ProductItemPriceText2Div,
  ProductItemPriceText3Div,
  ProductItemPriceText4Div,
  ProductItemPriceTextDiv,
  ProductItemTitleDiv,
  ProductItemWrapperDiv
} from "./style";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function renderPrice(price, priceOri) {

  if (price > 0 && price < priceOri) {
    return (
      <React.Fragment>
        <ProductItemPriceTextDiv>
          <ProductItemPriceText2Div>
            ${price.toFixed(2)}
          </ProductItemPriceText2Div>
        </ProductItemPriceTextDiv>
        {
          price < priceOri ?
            <ProductItemPriceTextDiv>
              <ProductItemPriceText3Div>
                ${priceOri.toFixed(2)}
              </ProductItemPriceText3Div>
              <ProductItemPriceText4Div>
                ({(100 - price * 100 / priceOri).toFixed(0)}% off)
              </ProductItemPriceText4Div>
            </ProductItemPriceTextDiv> : undefined
        }
      </React.Fragment>
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
          <WhatsAppIcon sx={{color: "#2BBB4B"}}/>
        </ProductItemPriceText2Div>
        <ProductItemPriceTextDiv>
          <ProductItemPriceText3Div style={{marginTop: '5px'}}>
            ${priceOri.toFixed(2)}
          </ProductItemPriceText3Div>
        </ProductItemPriceTextDiv>
      </ProductItemPriceTextDiv>
    )
  }
}

export default function PItem(props) {

  const [hoverPic, setHoverPic] = React.useState(false);

  const handlePicToFirst = () => {
    setHoverPic(false)
  }

  const handlePicToSecond = () => {
    setHoverPic(true)
  }

  const {
    itemWidth,
    itemHeight,
    product
  } = props

  return (
    <ProductItemWrapperDiv>
      <Link to={"/product/"+product.Pid}>
        <ProductItemPictureImg
          src={hoverPic ? product.Pic2: product.Pic1}
          alt={"img"}
          style={{width: itemWidth, height: itemHeight}}
          onMouseEnter={handlePicToSecond}
          onMouseLeave={handlePicToFirst}
        />
      </Link>
      <Link to={"/product/"+product.Pid}>
        <ProductItemTitleDiv>
          {product.Title}
        </ProductItemTitleDiv>
      </Link>

      {renderPrice(product.Price, product.PriceOri)}

    </ProductItemWrapperDiv>
  )
}