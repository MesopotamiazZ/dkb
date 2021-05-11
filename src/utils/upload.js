/* eslint-disable no-undef */
import { message } from 'antd';
import moment from 'moment';
import { MD5 } from 'crypto-js';
import request from '@/services/request';

export const getUploadToken = async (data) => {
  const res = await request({ url: '/Publics/Tools/getUpToken', method: 'get', params: { ...data } });
  if (res) {
    return res;
  }
  message.warning('获取文件上传Token失败');
  return false;
};


// 图片预览
export const handleOnPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }

  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow.document.write(image.outerHTML);
};

export const baseUrl = 'https://file.dangkoubao.com';
// export const baseUrl = 'https://dangkoubao-1303016503.cos.ap-shanghai.myqcloud.com';


export const uploadPic = () => {
  const token = localStorage.getItem('Dense-Diary-Authorization');
  const dkbId = localStorage.getItem('dkb-id');
  const date = moment(Date.now()).format('YYYY/MM/DD');
  // 请求用到的参数
  var Bucket = 'dangkoubao-1303016503';
  var Region = 'ap-shanghai';
  // var protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  var protocol = 'https:';
  // prefix 用于拼接请求 url 的前缀，域名使用存储桶的默认域名
  var prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';
  // 对更多字符编码的 url encode 格式
  var camSafeUrlEncode = function (str) {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  };
  // 计算签名
  var getAuthorization = async function (options, callback) {
    //   Token获取
    var url = 'https://b.api.dangkoubao.com/Publics/Tools/getUpToken';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader("token", token);
    xhr.setRequestHeader("dkbid", dkbId);
    xhr.onload = function (e) {
      var credentials;
      try {
        credentials = JSON.parse(xhr.responseText).result.response.credentials;
      } catch (e) { }
      if (credentials) {
        callback(null, {
          // 取自 result[].credentials[].sessionToken
          XCosSecurityToken: credentials.sessionToken,
          Authorization: CosAuth({
            // 取自 result[].credentials[].tmpSecretId
            SecretId: credentials.tmpSecretId,
            // 取自 result[].credentials[].tmpSecretKey
            SecretKey: credentials.tmpSecretKey,
            Method: options.Method,
            Pathname: options.Pathname,
          })
        });
      } else {
        console.error(xhr.responseText);
        callback('获取签名出错');
      }
    };
    xhr.onerror = function (e) {
      callback('获取签名出错');
    };
    xhr.send();
  };
  // 上传文件
  return (file, uploadCount, callback) => {
    // 这里指定上传目录和文件名 取自 result[].path
    var Key = `${dkbId}/${date}/${MD5(file.name)}${uploadCount}${Date.now()}.png`;
    console.log('key', Key);
    getAuthorization({ Method: 'PUT', Pathname: '/' + Key }, function (err, info) {
      if (err) {
        alert(err);
        return;
      }
      var auth = info.Authorization;
      var XCosSecurityToken = info.XCosSecurityToken;
      var url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/');
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Authorization', auth);
      XCosSecurityToken && xhr.setRequestHeader('x-cos-security-token', XCosSecurityToken);
      xhr.upload.onprogress = function (e) {
        console.log('上传进度 ' + (Math.round(e.loaded / e.total * 10000) / 100) + '%');
      };
      xhr.onload = function () {
        if (/^2\d\d$/.test('' + xhr.status)) {
          var ETag = xhr.getResponseHeader('etag');
          callback(null, { url: url, ETag: ETag });
        } else {
          callback('文件 ' + Key + ' 上传失败，状态码：' + xhr.status);
        }
      };
      xhr.onerror = function () {
        callback('文件 ' + Key + ' 上传失败，请检查是否没配置 CORS 跨域规则');
      };
      xhr.send(file);
    });
  };
}