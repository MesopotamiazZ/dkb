/**
 * 智能识别组件
 */
import React, { memo, useEffect, useRef } from 'react';
import {
  Form,
  Input,
  message,
} from 'antd';
import { toOcr } from '../../services/order';
import AddressParse from 'address-parse';
import './style.less';
import imgpng from '../../assets/images/imgpng.png';


interface IIntelIdentification {
  form: any,
  onGetAddress: (data: any) => void;
}

const { TextArea } = Input;

const IntelIdentification: React.FC<IIntelIdentification> = memo((props) => {
  const {
    form,
    onGetAddress,
  } = props;

  const loadPicRef = useRef(null);

  const onImgClick = () => {

  }

  /**
   * file转base64
   * @param blob 
   * @param cb 
   */
  const blobToDataURL = (blob, cb) => {
    let reader = new FileReader();
    reader.onload = function (evt) {
      let base64 = evt.target.result;
      cb(base64);
    };
    reader.readAsDataURL(blob);
  };

  /**
   * 图片识别
   */
  useEffect(() => {
    loadPicRef.current.addEventListener('change', (event) => {
      // console.log(event.currentTarget.files[0])
      blobToDataURL(event.currentTarget.files[0], async (base64) => {
        const res = await toOcr({ image: base64.split('base64,')[1] });
        if (res.code === 200) {
          const [result] = AddressParse.parse(res?.result?.words);
          onGetAddress(result);
        }
      })
    })
  }, [loadPicRef])

  return (
    <div className="intel-identification">
      <Form.Item
        label=""
        name="content"
        style={{ marginBottom: 0 }}
      >
        <TextArea
          placeholder="直接粘贴文字、图片即可智能识别"
        />
      </Form.Item>
      <div className="operactor-wrap">
        <div>
          <img
            src={imgpng}
            alt=""
            onClick={onImgClick}
          />
          <input
            ref={loadPicRef}
            className="upload-pic"
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png"
          />
        </div>
        <div
          className="identify-btn"
          onClick={() => {
            const content = form.getFieldValue('content');
            if (content) {
              const [result] = AddressParse.parse(content);
              onGetAddress(result);
            } else {
              message.warning('请先粘贴文字或上传图片再点击识别');
            }
          }}
        >
          一键识别
        </div>
      </div>
    </div>
  )
})

export default IntelIdentification;