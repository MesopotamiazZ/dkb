/* eslint-disable no-undef */
import { message } from 'antd';

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

export { getLal, getAddress };
