import React from "react";
import PostPictureCloseIcon from "../icons/postPictureClose";
import {GetPicUrl} from "../util/url";
import Backdrop from "@mui/material/Backdrop";
import KeyBind from "../util/keyListtener";

import {
  PictureEnlargedDiv,
  PictureEnlargedImg,
  PictureOptionDiv,
  PictureToolbarDiv
} from "./style";

export default function ShowPicture(props) {

  const [open, setOpen] = React.useState(true);
  const [picIndex, setPicIndex] = React.useState(props.index);

  let picCount = 1
  if (props.pic !== null) {
    picCount = props.pic.length
  } else {
    picCount = props.picObject.length
  }

  const handleClosePic = () => {
    setOpen(false)
    props.handleClosePic()
  };

  // const handleTogglePic = (i) => {
  //   setOpen(!open)
  //   setPicIndex(i)
  // };

  const handleKeycode = (e) => {
    if (e.type === "keydown") {
      if (e.keyCode === 39) {
        if (picIndex === picCount - 1) {
          setPicIndex(0)
        } else {
          setPicIndex(picIndex+1)
        }
      } else if (e.keyCode === 37) {
        if (picIndex === 0) {
          setPicIndex(picCount - 1)
        } else {
          setPicIndex(picIndex - 1)
        }
      } else if (e.keyCode === 27) {
        setOpen(false);
        props.handleClosePic()
      }
    }

    e.stopPropagation();
    // e.stopImmediatePropagation();
  };

  if (props.pic !== null) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 10,
          minWidth: "800px" }}
        open={open}
        onClick={handleClosePic}
      >
        {open ? <KeyBind handleKeycode={(event) => handleKeycode(event)}/> : undefined}
        <PictureEnlargedDiv className={"PictureEnlargedDiv"}>
          <PictureToolbarDiv className={"PictureToolbarDiv"}>
            <PictureOptionDiv className={"PictureOptionDiv"}>
              <PostPictureCloseIcon />
            </PictureOptionDiv>
          </PictureToolbarDiv>
          <PictureEnlargedImg
            className={"PictureEnlargedImg"}
            src={`${GetPicUrl(props.pic[picIndex].UR)}`}
            alt={'pic'}
            onClick={() => handleClosePic()}
          />
        </PictureEnlargedDiv>
      </Backdrop>
    )
  } else {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={open}
        onClick={handleClosePic}
      >
        {open ? <KeyBind handleKeycode={(event) => handleKeycode(event)}/> : undefined}
        <PictureEnlargedDiv className={"PictureEnlargedDiv"}>
          <PictureToolbarDiv className={"PictureToolbarDiv"}>
            <PictureOptionDiv className={"PictureOptionDiv"}>
              <PostPictureCloseIcon />
            </PictureOptionDiv>
          </PictureToolbarDiv>
          <PictureEnlargedImg
            className={"PictureEnlargedImg"}
            src={props.picObject[picIndex]}
            alt={'pic'}
            onClick={() => handleClosePic()}
          />
        </PictureEnlargedDiv>
      </Backdrop>
    )
  }

}