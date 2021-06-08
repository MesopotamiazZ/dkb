/**
 * 加减组件
 * @num: 菜品数量
 * @max: 数字最大值
 * @min: 数字最小值
 * @productId: 产品Id
 * @returnNumber: 返回的菜品数量
 */
import React, { useState, useEffect } from 'react';
import {
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';

import './style.less';

const AddAnddecreaseComp = (props) => {
  const {
    num,
    max,
    min,
    returnNumber,
    isStock = true,
  } = props;

  const [currentNum, setCurrentNum] = useState(num);

  useEffect(() => {
    setCurrentNum(num);
  }, [num]);

  useEffect(() => {
    returnNumber(currentNum);
  }, [currentNum]);

  const decrease = () => {
    if (currentNum === min || 0) {
      return;
    }
    setCurrentNum(currentNum - 1);
  };

  const add = () => {
    if (max) {
      if (currentNum === max) {
        return;
      }
    }
    setCurrentNum(currentNum + 1);
  };

  return (
    <div className="add-decrease-comp">
      <span
        className="decrease"
        onClick={decrease}
      >
        <MinusOutlined />
      </span>
      <span className="number">{currentNum}</span>
      <span
        className="add"
        onClick={add}
      >
        <PlusOutlined />
      </span>
      {
        isStock ? <span className="stock-num">库存{max}件</span> : ''
      }
    </div>
  );
};

export default AddAnddecreaseComp;
