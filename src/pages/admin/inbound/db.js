import axios from "axios";
import {Timeout} from "../../../common/util/url";

export function inboundAPI (cat, pid, source, desc, catSizeList, handleGetCatProductAPI, handleGetProductAPI, handleGetInboundAPI) {

  let size = []
  let qty = []
  for (const s of catSizeList) {
    if (s.Qty && s.Qty > 0) {
      size.push(s.SizeId)
      qty.push(s.Qty)
    }
  }

  let data = {
    'ShopCode': 1000,
    'Pid': pid,
    'InboundType': 'PURCHASE',
    'InboundSource': source,
    'InboundDesc': desc,
    'InboundPeriod': '202001',
    'Opt': 'admin',
    'SizeId': size,
    'InboundQty': qty
  }

  const instance = axios.create({
    baseURL: '/v1/inbound',
    timeout: Timeout,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  new Promise((resolve, reject) => {
    instance.post('', data)
      .then((res) => {
        console.log("inboundAPI", res)
        if (res.data.Code === 0) {
          handleGetCatProductAPI(cat)
          handleGetProductAPI(pid)
          handleGetInboundAPI(pid)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

}

export function reverseInboundAPI (cat, pid, id, handleGetCatProductAPI, handleGetProductAPI, handleGetInboundAPI) {

  let data = {
    'Id': id
  }

  const instance = axios.create({
    baseURL: '/v1/reverse_inbound',
    timeout: Timeout,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  new Promise((resolve, reject) => {
    instance.post('', data)
      .then((res) => {
        console.log("reverseInboundAPI", res)
        if (res.data.Code === 0) {
          handleGetCatProductAPI(cat)
          handleGetProductAPI(pid)
          handleGetInboundAPI(pid)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

}