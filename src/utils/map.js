/* eslint-disable no-undef */
import { message } from 'antd';
import request from '@/services/request';

const geocoder = new qq.maps.Geocoder();

const getLal = async (address) => {
  // 对指定地址进行解析
  geocoder.getLocation(address);
  return new Promise((resolve) => {
    geocoder.setError(() => {
      message.destroy();
      setTimeout(() => {
        message.error('地址输入错误');
      }, 200);
      resolve(false);
      // console.log(address + '地址输入错误', err)
    });
    // 设置服务请求成功的回调函数
    geocoder.setComplete((res) => {
      resolve(res.detail);
    });
  });
};

const getAddress = async (lat, lng) => {
  const coord = new qq.maps.LatLng(lat, lng);

  // 对指定地址进行解析
  geocoder.getAddress(coord);
  return new Promise((resolve) => {
    geocoder.setError(() => {
      message.destroy();
      setTimeout(() => {
        message.error('地址输入错误');
      }, 200);
      resolve(false);
      // console.log(address + '地址输入错误', err)
    });
    // 设置服务请求成功的回调函数
    geocoder.setComplete((res) => {
      resolve(res.detail);
    });
  });
};

const getIpLocation = () => {
  const res = request({
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    method: 'get',
    params: {
      key: '7W3BZ-H3WWJ-ZV7FE-KMYWE-4A44Q-CSBZ2'
    }
  })
  if (res.status === 0) {
    return {
      ...res.result.location
    }
  } else {
    return {
      lat: 39.90469,
      lng: 116.40717,
    }
  }
}

export { getLal, getAddress, getIpLocation };
