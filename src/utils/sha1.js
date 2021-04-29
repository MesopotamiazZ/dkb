import sha1 from 'crypto-js/sha1';

/**
 * sha1加密
 */
export default context => {
    return sha1(context).toString()
}
