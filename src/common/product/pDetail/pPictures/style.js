import styled from "styled-components";

export const ProductDetailPictureWrapperDiv = styled.div`
  float: left;
  width: 100%;
  height: 500px;
  display: flex;
  //padding: 5px;
  //background: antiquewhite;
`;

export const ProductDetailPictureAreaFunctionDiv = styled.div`
  float: left;
  width: 50%;
  height: 36px;
  padding: 6px 10px 2px 10px;
  background: white;
`;


export const ProductDetailPictureAreaListDiv = styled.div`
  overflow: scroll;
  float: left;
  width: 20%;
  height: 500px;
  //padding: 5px;
  //background: antiquewhite;
`;

export const ProductDetailPictureAreaListPictureDiv = styled.img`
  width: 100%;
  height: 98px;
  object-fit: cover;
  cursor: pointer;
  opacity:0.6; 
  filter: alpha(opacity=60);
  :hover {
    opacity: 1;
    filter: alpha(opacity=100);
  }
  `;

export const ProductDetailPictureAreaListPictureSelectedDiv = styled.img`
  width: 100%;
  height: 98px;
  object-fit: cover;
  cursor: pointer;
  opacity: 1;
  filter: alpha(opacity=100);
  `;

export const ProductDetailPictureAreaBigPictureDiv = styled.div`
  float: left;
  flex-grow: 1;
  height: 500px;
  margin-left: 2px;
  //padding: 5px;
  //background: antiquewhite;
`;

export const ProductDetailPictureAreaBigPictureImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  `;

