import React, { memo, useEffect, useState } from 'react';
import { Popover } from 'antd';
import { HexColorPicker } from "react-colorful";
import './style.less';

interface selectColorProps {
  color?: string;
  onGetBgColor: (data: any) => void;
}

const SelectColor: React.FC<selectColorProps> = memo(({ color, onGetBgColor }) => {
  const [selectColor, setSelectColor] = useState(color);

  /**
   * 初始赋值
   */
  useEffect(() => {
    setSelectColor(color);
  }, [color])

  useEffect(() => {
    if (color) {
      onGetBgColor(selectColor);
    }
  }, [selectColor])

  const content = (
    <section className="custom-layout example">
      <HexColorPicker
        color={color}
        onChange={(color) => {
          // console.log(obj)
          // setSelectColor(`rgba(${obj.r}, ${obj.g}, ${obj.b}, ${obj.a})`)
          setSelectColor(color);
        }} />
    </section>
  );

  return (
    <>
      <Popover
        className="select-color-popover"
        placement="rightTop"
        content={content}
        trigger="click"
      >
        <div
          className="select-color"
        >
          <div
            className="select-color-inner"
            style={{ background: selectColor }}
          ></div>
        </div>
      </Popover>
    </>
  )
})

SelectColor.defaultProps = {
  color: '#d9001b'
}

export default SelectColor;