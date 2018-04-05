/**
 * Created with hzh.
 * Date: 2018/3/31
 * Time: 下午2:46
 */
import axios from 'axios/index';
import { Feedback } from '@icedesign/base';
import Constant from './Constant';
import CommonInfo from './CommonInfo';

export default function callApi(url, data, method, needToken) {
  let getUrlData = '';
  if (data) {
    if (!(typeof data === 'string')) {
      let tmp = '';
      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          tmp = `${k}=${data[k]}&${tmp}`;
        }
      }
      getUrlData = tmp;
    }
  }

  url = Constant.InterfaceUrl + url;

  if (!method) {
    method = 'POST';
  }

  if (data == null) {
    data = {};
  }

  if (method === 'GET') {
    url = `${url}?${getUrlData}`;
  }

  console.log(`data====${data}`);

  let config;
  if (needToken) {
    config = {
      url,
      method,
      headers: {
        Authorization: CommonInfo.getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };
  } else {
    config = {
      url,
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };
  }


  if (method !== 'POST' || JSON.stringify(data) === '{}') {
    delete config.data;
  }

  console.log(`config===${config}`);

  return axios(config)
    .then((response) => {
      if (
        response.status === 200 &&
        response.data.rescode === 200 &&
        response.data.result === 'ok'
      ) {
        console.log('1111111111');
        console.log(response.data.data);
        return response.data.data;
      }
      return response.data;
      // console.log('22222222');
      // Feedback.toast.success(response.data.msg);
      // console.log(response.data.msg);
      // return response.data;
    })
    .catch((error) => {
      Feedback.toast.error(error);
      console.log(error);
    });
}
