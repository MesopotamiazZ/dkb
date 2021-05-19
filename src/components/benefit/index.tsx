import React, { memo, useEffect, useState } from 'react';
import {
  Checkbox,
  InputNumber,
  Radio,
  Input,
  Form,
} from 'antd';
import AddConsumeDiscount from '../../components/add-consume-discount';
import './style.less';

type discountType = '1' | '2';

interface initValueInterface {
  freeShip: boolean; // 是否开启满金额包邮
  consumeDiscount: boolean; // 是否开启消费折扣
  freeShipValue: string | number; // 包邮金额
  discountType: discountType; // 折扣类型
  unifiedDiscount: string | number; // 统一折扣
  segmentDiscount: any; // 分段折扣
}

interface benefitProps {
  initValue: initValueInterface;
  onGetBenefit: (data: any) => void;
}

const Benefit: React.FC<benefitProps> = memo((props) => {
  const {
    initValue,
    onGetBenefit,
  } = props;
  // console.log('initvalue', initValue)

  // const [freeShipChecked, setFreeShipChecked] = useState(initValue.freeShip); // 是否开启满金额包邮
  // const [consumeDiscountChecked, setConsumeDiscountChecked] = useState(initValue.consumeDiscount); // 是否开启消费折扣
  // const [freeShipValue, setFreeShipValue] = useState(initValue.freeShipValue); // 包邮金额
  // const [discountType, setDiscountType] = useState(initValue.discountType); // 折扣类型
  // const [unifiedDiscount, setUnifiedDiscount] = useState(initValue.unifiedDiscount); // 统一折扣
  // const [segmentDiscount, setSegmentDiscount] = useState(initValue.segmentDiscount.map((item, index) => ({
  //   ...item,
  //   id: index,
  // }))); // 分段折扣
  const [benefitDefaultValues, setBenefitDefaultValues] = useState({
    freeShip: true, // 是否开启满金额包邮
    freeShipValue: '', // 包邮金额
    consumeDiscount: true, // 是否开启消费折扣
    discountType: '1', // 折扣类型
    unifiedDiscount: '', // 统一折扣
    segmentDiscount: [], // 分段折扣
  });

  /**
   * 初始赋值
   */
  useEffect(() => {
    if (Object.keys(initValue).length) {
      console.log('初始赋值', initValue)
      // setBenefitDefaultValues({
      //   ...initValue,
      //   segmentDiscount: initValue.segmentDiscount.map((item, index) => ({
      //     ...item,
      //     id: index
      //   })),
      // });
    }
  }, [initValue])

  useEffect(() => {
    console.log('update')
    onGetBenefit({
      ...benefitDefaultValues
    })
  }, [benefitDefaultValues])

  /**
   * 分段折扣条件信息
   */
  const onGetConditionhandle = (data) => {
    // console.log(data);
    // setSegmentDiscount(data);
    const cloneData = JSON.parse(JSON.stringify(benefitDefaultValues));
    cloneData.segmentDiscount = data;
    setBenefitDefaultValues(cloneData);
  }


  return (
    <div className="benefit-wrap">
      <div className="benefit-wrap-item free-ship-wrap">
        <Form.Item>
          <Checkbox
            checked={benefitDefaultValues.freeShip}
            onChange={(e) => {
              const cloneData = JSON.parse(JSON.stringify(benefitDefaultValues));
              cloneData.freeShip = e.target.checked;
              setBenefitDefaultValues(cloneData);
            }}
          >
            满金额包邮
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <div className="free-ship-input">
            <span>消费满</span>
            <InputNumber
              value={Number(benefitDefaultValues.freeShipValue)}
              placeholder="仅支持整数"
              onChange={(value) => {
                const cloneData = JSON.parse(JSON.stringify(benefitDefaultValues));
                cloneData.freeShipValue = value;
                setBenefitDefaultValues(cloneData);
              }}
            />
            <span>元，可包邮</span>
          </div>
        </Form.Item>
      </div>
      <div className="benefit-wrap-item consume-discount-wrap">
        <Form.Item>
          <Checkbox
            checked={benefitDefaultValues.consumeDiscount}
            onChange={(e) => {
              const cloneData = JSON.parse(JSON.stringify(benefitDefaultValues));
              cloneData.consumeDiscount = e.target.checked;
              setBenefitDefaultValues(cloneData);
            }}
          >
            消费折扣
          </Checkbox>
        </Form.Item>
        <div className="free-ship-input">
          <Form.Item>
            <Radio.Group
              value={benefitDefaultValues.discountType}
              onChange={(e) => {
                const cloneData = JSON.parse(JSON.stringify(benefitDefaultValues));
                cloneData.discountType = e.target.value;
                setBenefitDefaultValues(cloneData);
              }}
            >
              <Radio value="1">
                统一折扣
            </Radio>
              <Radio value="2">
                分段折扣
            </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        {
          benefitDefaultValues.discountType === '1'
            ? <Input
              type="number"
              addonAfter="折"
              style={{ width: '140px' }}
              value={Number(benefitDefaultValues.unifiedDiscount)}
              onChange={(e) => {
                const cloneData = JSON.parse(JSON.stringify(benefitDefaultValues));
                cloneData.unifiedDiscount = e.target.value;
                setBenefitDefaultValues(cloneData);
              }}
            />
            : <AddConsumeDiscount
              dataSource={benefitDefaultValues.segmentDiscount}
              onGetCondition={onGetConditionhandle}
            />
        }
      </div>
    </div>
  )
});

export default Benefit;