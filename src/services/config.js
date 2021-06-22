
/**
 * mock
 */
// const devBaseURL = "https://www.fastmock.site/mock/94a0f2047d1702f65cd162e1a272f080/api/";

/**
 * 档口宝后台
 */
const devBaseURL = "http://localhost:3000";
// const devBaseURL = "https://b.api.dangkoubao.com";
const proBaseURL = "https://b.api.dangkoubao.com";

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;
export const TIMEOUT = 15000;


