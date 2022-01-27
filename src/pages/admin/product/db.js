import axios from "axios";
import {Timeout} from "../../../common/util/url";

export function updateProductAPI (pid, cat, title, fabric, description, pic1, pic2, price, priceOri, listed, pictures, handleGetCatProductAPI, handleGetProductAPI) {

  let l
  if (listed) {
    l = 1
  } else {
    l = 0
  }
  let data = {
    'Pid': pid,
    'Cat': cat,
    'Title': title,
    'Description': description,
    'Fabric': fabric,
    'Pic1': pic1,
    'Pic2': pic2,
    'Price': price,
    'PriceOri': priceOri,
    'Listed': l,
    'Pictures': pictures
  }

  const instance = axios.create({
    baseURL: '/APIs/v1/update_product',
    timeout: Timeout,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  new Promise((resolve, reject) => {
    instance.post('', data)
      .then((res) => {
        console.log("updateProductAPI", res)
        if (res.data.Code === 0) {
          handleGetCatProductAPI(cat)
          if (pid > 0) {
            handleGetProductAPI(pid)
          }
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

};

export function deleteProductAPI (pid, cat, handleGetCatProductAPI) {

  let data = {
    'Pid': pid
  }

  const instance = axios.create({
    baseURL: '/APIs/v1/delete_product',
    timeout: Timeout,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  new Promise((resolve, reject) => {
    instance.post('', data)
      .then((res) => {
        console.log("deleteProductAPI", res)
        if (res.data.Code === 0) {
          handleGetCatProductAPI(cat)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

};
