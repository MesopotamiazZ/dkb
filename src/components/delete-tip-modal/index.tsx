import React, { memo, useEffect, useState } from 'react';
import { Modal } from 'antd';
import './style.less';

interface deleteModalProps {
  title: string;
  width: string | number;
  text: string | React.ReactDOM;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const DeleteTipModal: React.FC<deleteModalProps> = memo((props) => {
  const {
    title,
    width,
    text,
    visible,
    onOk,
    onCancel,
  } = props;

  return (
    <Modal
      className="delete-tip-modal"
      title={title}
      visible={visible}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      width={width}
      okButtonProps={{ type: 'primary', danger: true }}
    >
      <p>{text}</p>
    </Modal>
  )
})

export default DeleteTipModal;