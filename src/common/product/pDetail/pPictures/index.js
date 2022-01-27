import React, { PureComponent } from 'react'
import Button from "@mui/material/Button";
import {
  ProductDetailPictureAreaBigPictureDiv,
  ProductDetailPictureAreaBigPictureImg,
  ProductDetailPictureAreaFunctionDiv,
  ProductDetailPictureAreaListDiv,
  ProductDetailPictureAreaListPictureDiv,
  ProductDetailPictureAreaListPictureSelectedDiv, ProductDetailPictureWrapperDiv,
} from "./style";
import "./style.css"

function renderPic(index, picIndex, item, setPic) {
  if (index === picIndex) {
    return (
      <ProductDetailPictureAreaListPictureSelectedDiv
        className={"ProductDetailPictureAreaListPictureSelectedDiv"}
        key={index+item}
        src={item}
        alt={"img"}
        onMouseEnter={()=>setPic(index)}
      />
    )
  } else {
    return(
      <ProductDetailPictureAreaListPictureDiv
        className={"ProductDetailPictureAreaListPictureDiv"}
        key={index+item}
        src={item}
        alt={"img"}
        onMouseEnter={()=>setPic(index)}
      />
    )
  }
}

let timerShow = null
let timerHide = null


class ProductPictures extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      picIndex: 0,
      show: true,
      playing: false
    }
    this.pRef = React.createRef();
  }

  setPic = (index) => {
    clearTimeout(timerShow)
    clearTimeout(timerHide)
    this.setState({
      playing : false,
      picIndex: index
    })
  }

  startTimer = () => {
    if (this.state.playing) {
      this.setState({
        playing : false,
        show: true
      })
      clearTimeout(timerShow)
      clearTimeout(timerHide)
    } else {
      this.setState({
        playing : true,
        show: true
      })
      clearTimeout(timerShow)
      clearTimeout(timerHide)
      this.rollHide()
    }
  }

  render() {

    const {
      disablePlay,
      productPic,
    } = this.props

    const {
      show,
      playing,
      picIndex
    } = this.state

    return (
      <React.Fragment>
        <ProductDetailPictureWrapperDiv className={"ProductDetailPictureWrapperDiv"}>
          <ProductDetailPictureAreaListDiv ref={this.pRef} className={"ProductDetailPictureAreaListDiv"}>
            {
              productPic.map((item, index) => (
                renderPic(index, picIndex, item, this.setPic)
              ))
            }
          </ProductDetailPictureAreaListDiv>
          <ProductDetailPictureAreaBigPictureDiv className={"ProductDetailPictureAreaBigPictureDiv"}>
            <ProductDetailPictureAreaBigPictureImg
              className={show ? 'show':'hide'}
              src={productPic[picIndex]}
              alt={"img"}
            />
          </ProductDetailPictureAreaBigPictureDiv>
        </ProductDetailPictureWrapperDiv>

        {
          !disablePlay ?
            <ProductDetailPictureAreaFunctionDiv className={"ProductDetailPictureAreaFunctionDiv"}>
              {
                playing ?
                  <Button
                    variant="contained"
                    onClick={()=>this.startTimer()}
                    sx={{textTransform: 'none', height: "28px", width: "80px", borderRadius: 0}}
                  >
                    Pause
                  </Button> :
                  <Button
                    variant="outlined"
                    onClick={()=>this.startTimer()}
                    sx={{textTransform: 'none', height: "28px", width: "80px", borderRadius: 0}}
                  >
                    Playing
                  </Button>
              }
            </ProductDetailPictureAreaFunctionDiv> : undefined
        }

      </React.Fragment>
    )

  }

  roll = () => {

    const {
      productPic,
    } = this.props

    const {
      picIndex
    } = this.state

    let count = productPic.length
    let index = 0
    timerShow = setTimeout(() => {
      if (picIndex < count - 1) {
        index = picIndex + 1
      } else {
        index = 0
      }
      this.setState({
        picIndex: index,
        show: true
      })
      if (this.pRef.current) {
        // console.log(1, this.pRef.current.scrollTop, this.pRef.current.scrollHeight, this.pRef.current.offsetHeight, index * 100, (this.pRef.current.scrollTop + this.pRef.current.offsetHeight))
        if (index * 100 >= (this.pRef.current.scrollTop + this.pRef.current.offsetHeight)) {
          this.pRef.current.scrollTop = index * 100
        } else if (index === 0) {
          this.pRef.current.scrollTop = 0
        }
      }
      this.rollHide()
    }, 500);
  }

  rollHide = () => {
    timerHide = setTimeout(() => {
      this.setState({
        show: false
      })
      this.roll()
    }, 5000);
  }

  componentWillUnmount() {
    if (timerShow) {
      clearTimeout(timerShow)
    }
    if (timerHide) {
      clearTimeout(timerHide)
    }
  }

}

export default ProductPictures