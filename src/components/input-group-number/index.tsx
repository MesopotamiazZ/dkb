import React, { memo, useState, useEffect } from 'react';
import { Input } from 'antd';
import './style.less';


interface inputGroupNumberProps {
  numbers: Array<number>;
  onChange: (numbers: Array<number>) => void;
}

const InputGroupNumber: React.FC<inputGroupNumberProps> = memo((props) => {
  const {
    numbers,
    onChange,
  } = props;

  const [numberArr, setNumberArr] = useState<Array<number>>([]);

  useEffect(() => {
    setNumberArr(numbers);
  }, [numbers]);

  return (
    <Input.Group compact>
      <Input
        style={{ width: 220, textAlign: 'left' }}
        placeholder="请输入数值"
        type="number"
        value={numberArr[0]}
        onChange={(e) => {
          let numberArrClone = JSON.parse(JSON.stringify(numberArr));
          numberArrClone[0] = e.target.value;
          setNumberArr(numberArrClone);
          onChange(numberArrClone);
        }}
      />
      <Input
        className="site-input-split"
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
        }}
        placeholder="~"
        disabled
      />
      <Input
        className="site-input-right"
        style={{
          width: 220,
          textAlign: 'left',
        }}
        placeholder="请输入数值"
        type="number"
        value={numberArr[1]}
        onChange={(e) => {
          let numberArrClone = JSON.parse(JSON.stringify(numberArr));
          numberArrClone[1] = e.target.value;
          setNumberArr(numberArrClone);
          onChange(numberArrClone);
        }}
      />
    </Input.Group>
  )
})

export default InputGroupNumber;