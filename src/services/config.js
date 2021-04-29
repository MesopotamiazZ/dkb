
/**
 * mock
 */
// const devBaseURL = "https://www.fastmock.site/mock/94a0f2047d1702f65cd162e1a272f080/api/";

/**
 * 森森日记
 */
// const devBaseURL = "http://47.108.88.248:9601/api/v1/admin";
// const proBaseURL = "http://127.0.0.1:8888/";

/**
 * 档口宝后台
 */
// const devBaseURL = "http://120.26.58.108:9501";
// const devBaseURL = "https://api.integral.haimeiyx.com";
// const proBaseURL = "https://api.integral.haimeiyx.com";

const devBaseURL = "http://localhost:3000";
const proBaseURL = "http://47.108.88.248:9612";

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;
export const TIMEOUT = 10000;


