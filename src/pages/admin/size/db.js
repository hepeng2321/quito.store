import axios from "axios";
import {Timeout} from "../../../common/util/url";

export function updateSizeAPI (sizeId, cat, size, handleGetSizeAPI) {

  let data = {
    'SizeId': sizeId,
    'Cat': cat,
    'Size': size,
  }
  console.log(sizeId, cat, size, handleGetSizeAPI)
  const instance = axios.create({
    baseURL: '/v1/update_size',
    timeout: Timeout,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  new Promise((resolve, reject) => {
    instance.post('', data)
      .then((res) => {
        console.log("updateSizeAPI", res)
        if (res.data.Code === 0) {
          handleGetSizeAPI()
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

}

export function deleteSizeAPI (sizeId, handleGetSizeAPI) {

  let data = {
    'SizeId': sizeId
  }

  const instance = axios.create({
    baseURL: '/v1/delete_size',
    timeout: Timeout,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  new Promise((resolve, reject) => {
    instance.post('', data)
      .then((res) => {
        console.log("deleteSizeAPI", res)
        if (res.data.Code === 0) {
          handleGetSizeAPI()
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

};
