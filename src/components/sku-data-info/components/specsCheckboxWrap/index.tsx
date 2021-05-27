import React, { memo, useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import './style.less';

interface specProps {
  id: number;
  name: string;
  reveal: number;
  search: boolean;
  sort: number;
  value: string;
}

interface wrapProps {
  specs: Array<specProps>;
  onSetSpecs: (data: any) => void;
}

const SpecsCheckboxWrap: React.FC<wrapProps> = memo((props) => {
  const {
    specs,
    onSetSpecs,
  } = props;

  const [specsData, setSpecsData] = useState([]);

  /**
   * 赋值渲染出模板规格
   */
  useEffect(() => {
    setSpecsData(specs);
  }, [specs])

  /**
   * 返回选择后的模板规格
   */
  useEffect(() => {
    onSetSpecs(specsData);
  }, [specsData])

  return (
    <div className="specs-checkbox-wrap bg-white">
      {
        specsData?.map((spec, index) => ({
          ...spec,
          values: spec.value.split(',')
        })).map((spec, index) => {
          return (
            <div className="spec-item" key={spec.id}>
              <div className="spec-item-title">
                {spec.name}：
              </div>
              <div className="spec-item-checkbox">
                <Checkbox.Group
                  options={spec?.values}
                  onChange={(selects) => {
                    let dataClone = JSON.parse(JSON.stringify(specsData));
                    dataClone[index].selects = selects;
                    setSpecsData(dataClone);
                  }}
                />
                <Button type="link">新增规格值</Button>
              </div>
            </div>
          )
        })
      }
      <div className="spec-item">
        <Button type="link">
          新增规格
        </Button>
      </div>
    </div>
  )
})

export default SpecsCheckboxWrap;