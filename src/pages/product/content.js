import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {ProductDetailDiv} from "./style";
import {ProductListDiv, RecListDiv, RecTitleDiv} from "../shop/style";
import Hidden from "@mui/material/Hidden";
import PItem from "../../common/product/pItem";
import ProductDetail from "../../common/product/pDetail";

export default function ProductContent(props) {

  const {
    product,
    recommendList
  } = props

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Hidden mdUp>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProductDetailDiv className={"ProductDetailDiv"}>
              <ProductDetail
                product={product}
              />
            </ProductDetailDiv>
          </Grid>
          <Grid item xs={12}>
            <ProductListDiv className={"ProductListDiv"}>
              <Grid key={'TITLE'} item>
                <RecTitleDiv>Gran Venta</RecTitleDiv>
              </Grid>
              <Grid container justifyContent="center" spacing={2}>
                {recommendList.product.map((item) => (
                  <Grid key={"rec_"+item.Id} item>
                    <Paper elevation={0} sx={{ height: 'auto', width: 210 }}>
                      <PItem
                        product={item}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </ProductListDiv>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdDown>
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <ProductDetailDiv className={"ProductDetailDiv"}>
              <ProductDetail
                product={product}
              />
            </ProductDetailDiv>
          </Grid>
          <Grid item xs={3}>
            <RecListDiv className={"RecListDiv"}>
              <Grid key={'TITLE'} item>
                <RecTitleDiv>Gran Venta</RecTitleDiv>
              </Grid>
              <Grid container justifyContent="center" rowSpacing={1} columnSpacing={0}>
                {recommendList.product.map((item) => (
                  <Grid key={"rec_"+item.Id} item>
                    <Paper elevation={0} sx={{ height: 'auto', width: 210 }}>
                      <PItem
                        product={item}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </RecListDiv>
          </Grid>
        </Grid>
      </Hidden>

    </Box>
  );
}