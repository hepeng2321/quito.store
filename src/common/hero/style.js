import styled from "styled-components";
const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

export const HeroWrapper = styled.div`
  position: relative;
  height: 300px;
  background: #7fc7d9;
  overflow: hidden;
  // background: url(${backgroundImage});
  // background-size: 100% 100%;
`;

export const HeroPictureImg = styled.img`
  width: 100%;
  height: auto;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  object-fit: fill;
  //cursor: pointer;
  `;
