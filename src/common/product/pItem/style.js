import styled from "styled-components";

export const ProductItemWrapperDiv = styled.div`
  width: auto;
  height: auto;
  //padding: 5px;
`;

export const ProductItemPictureImg = styled.img`
  float: top;
  width: 210px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  `;

export const ProductItemTitleDiv = styled.div`
  float: top;
  padding: 5px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #333;
  :hover {
    text-decoration: underline;
  }
  `;

export const ProductItemPriceTextDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  `;

export const ProductItemPriceText2Div = styled.div`
  float: left;
  width: auto;
  padding: 0 5px 5px 5px;
  font-size: 14px;
  font-weight: 550;
  font-style: italic;
  line-height: 18px;
  color: deeppink;
`;

export const ProductItemPriceText3Div = styled.div`
  float: left;
  width: auto;
  padding: 0 5px 5px 5px;
  font-size: 13px;
  font-weight: 500;
  font-style: italic;
  text-decoration:line-through;
  line-height: 14px;
  color: #777;
`;

export const ProductItemPriceText4Div = styled.div`
  float: left;
  width: auto;
  padding: 0 5px 5px 5px;
  font-size: 13px;
  font-weight: 500;
  font-style: italic;
  line-height: 14px;
  color: #777;
`;