import styled from "styled-components";

export const PictureEnlargedDiv = styled.div`
  display: flex;
  max-width: 80%;
  max-height: 90%;
  //background: #ffc93a;
  `;

export const PictureEnlargedImg = styled.img`
  flex-grow: 1;
  height: auto;
  max-width: 80%;
  max-height: 90%;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  object-fit: contain;
  cursor: pointer;
  `;

export const PictureOptionDiv = styled.div`
  float: right;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  padding: 7px;
  background: rgba(200, 200, 200, 0.3);
  :hover {
    background: rgba(200, 200, 200, 0.5);
    cursor: pointer;
    .ri-close-line.ri-2x {
      color: #fff;
    }
  }
  `;

export const PictureToolbarDiv = styled.div`
  position: absolute;
  top: 30px;
  left: 50px;
  right: 50px;
  width: auto;
  height: 50px;
  //background: #ffc93a;
`;
