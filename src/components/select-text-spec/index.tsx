/**
 * 选择文字类型的规格，例如尺寸，参照代客下单-选择商品规格
 */
import React, { memo, useEffect } from 'react';
import './style.less';

interface ISelectTextSpec {
  specKey: any;
  datas: Array<string>;
  value: string | number;
  onChangeSpec: (obj: any) => void;
}

const SelectTextSpec: React.FC<ISelectTextSpec> = memo((props) => {
  const {
    specKey,
    datas,
    value,
    onChangeSpec,
  } = props;

  useEffect(() => {
    console.log(111, specKey)
  }, [specKey])

  return (
    <div className="select-text-spec">
      {
        datas.map((data) => (
          <div
            className={['spec-item', value === data
              ? 'spec-item-active' : ''].join(' ')}
            key={data}
            onClick={() => {
              onChangeSpec({ [specKey]: data });
            }}
          >
            {data}
          </div>
        ))
      }
    </div>
  )
})

export default SelectTextSpec;