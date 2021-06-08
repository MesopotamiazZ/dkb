/**
 * 智能识别组件
 */
import React, { memo } from 'react';
import {
  Form,
  Input,
} from 'antd';
import './style.less';
import imgpng from '../../assets/images/imgpng.png';


interface IIntelIdentification {
  form,
}

const { TextArea } = Input;

const IntelIdentification: React.FC<IIntelIdentification> = memo((props) => {
  const {
    form
  } = props;

  const onImgClick = () => {

  }

  return (
    <div className="intel-identification">
      <Form.Item
        label=""
        name="content"
        style={{ marginBottom: 0 }}
      >
        <TextArea placeholder="直接粘贴文字、图片即可智能识别" />
      </Form.Item>
      <div className="operactor-wrap">
        <img
          src={imgpng}
          alt=""
          onClick={onImgClick}
        />
        <div className="identify-btn">
          一键识别
        </div>
      </div>
    </div>
  )
})

export default IntelIdentification;