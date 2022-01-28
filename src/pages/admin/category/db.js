import axios from "axios";
import {Timeout} from "../../../common/util/url";

export function updateCategoryAPI (id, cat, category, parent, brother, width, picture, handleGetCategoryAPI) {

  let catData = {
    'Id': id,
    'Cat': cat,
    'Category': category,
    'Parent': parent,
    'Brother': brother,
    'Width': width,
    'Pic': picture
  }

  const instance = axios.create({
    baseURL: '/v1/update_category',
    timeout: Timeout,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  new Promise((resolve, reject) => {
    instance.post('', catData)
      .then((res) => {
        console.log("updateCategoryAPI", res)
        if (res.data.Code === 0) {
          handleGetCategoryAPI()
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

};

export function deleteCategoryAPI (id, handleGetCategoryAPI) {

  let catData = {
    'Id': id
  }

  const instance = axios.create({
    baseURL: '/v1/delete_category',
    timeout: Timeout,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  new Promise((resolve, reject) => {
    instance.post('', catData)
      .then((res) => {
        console.log("deleteCategoryAPI", res)
        if (res.data.Code === 0) {
          handleGetCategoryAPI()
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

};
