import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  message,
} from 'antd';
import { useHistory } from 'react-router-dom';
import {
  updateSpecTemplate,
} from '../../../../services/product';
import './style.less';

interface detailProps {
  id: number | string;
  is_system: boolean;
  name: string;
  sort: number;
  status: boolean;
  spec: Array<specProps>;
}
interface specProps {
  id: number;
  name: string;
  reveal: number;
  search: boolean;
  sort: number;
  value: string;
}

interface wrapProps {
  specsDetail: detailProps;
  checked?: any;
  onSetSpecs: (data: any) => void;
  onRefresh: () => void;
}

const SpecsCheckboxWrap: React.FC<wrapProps> = memo((props) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const {
    specsDetail,
    checked,
    onSetSpecs,
    onRefresh,
  } = props;

  const [specsData, setSpecsData] = useState([]);
  const [chekedObj, setCheckedObj] = useState({});
  const [addSpecValueModal, setAddSpecValueModal] = useState(false);
  const [curIndex, setCurIndex] = useState(0);

  /**
   * 赋值渲染出模板规格
   */
  useEffect(() => {
    setSpecsData(specsDetail?.spec);
  }, [specsDetail])

  /**
   * 返回选择后的模板规格
   */
  useEffect(() => {
    if (Object.keys(checked).length) {
      // console.log('checked', checked, specsData);
      let specsDataClone = JSON.parse(JSON.stringify(specsData));
      specsDataClone.forEach((data) => {
        for (let key in checked) {
          // if (key === data.name && data.selects) {
          //   data.selects.push(checked[key]);
          // }
          if (key === data.name && !data.selects) {
            data.selects = checked[key];
          }
        }
      })
      onSetSpecs(specsDataClone);
    } else {
      onSetSpecs(specsData);
    }
  }, [specsData, checked])

  useEffect(() => {
    if (Object.keys(checked).length) {
      setCheckedObj(checked);
      // console.log('checked', checked, specsData);
      // let specsDataClone = JSON.parse(JSON.stringify(specsData));
      // specsDataClone.forEach((data) => {
      //   for (let key in checked) {
      //     if (key === data.name) {
      //       data.selects = checked[key];
      //     }
      //   }
      // })
      // setSpecsData(specsDataClone);
    }
  }, [checked])

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
                  value={chekedObj ? chekedObj[spec.name] : []}
                  onChange={(selects) => {
                    let dataClone = JSON.parse(JSON.stringify(specsData));
                    let chekedObjClone = JSON.parse(JSON.stringify(chekedObj));
                    dataClone[index].selects = selects;
                    chekedObjClone[spec.name] = selects;
                    setSpecsData(dataClone);
                    setCheckedObj(chekedObjClone);
                  }}
                />
                <Button type="link" onClick={() => {
                  setCurIndex(index);
                  setAddSpecValueModal(true);
                }}>新增规格值</Button>
              </div>
            </div>
          )
        })
      }
      <div className="spec-item">
        <Button
          type="link"
          onClick={() =>
            history.push({ pathname: '/product/product-manage/add-spec-template' })
          }
        >
          新增规格
        </Button>
      </div>
      {/* 新增规格值 */}
      <Modal
        className="create-customer-modal"
        title="新增规格"
        visible={addSpecValueModal}
        destroyOnClose
        width={570}
        okText="确定"
        cancelText="取消"
        onOk={async () => {
          let dataClone = JSON.parse(JSON.stringify(specsData));
          const values = await form.validateFields();
          const oldSpecArr = dataClone[curIndex].value.split(',');
          let newSpecArr = values.value.split('\n');
          newSpecArr = newSpecArr.filter((item) => {
            return (oldSpecArr.indexOf(item) === -1);
          })
          const all = oldSpecArr.concat(newSpecArr);
          dataClone[curIndex].value = all.join(',');
          const res = await updateSpecTemplate({
            ...specsDetail,
            spec: dataClone,
          })
          if (res.code === 200) {
            message.success('新增成功');
            onRefresh();
            setAddSpecValueModal(false);
          } else {
            message.warning('新增失败');
          }
        }}
        onCancel={() => {
          setAddSpecValueModal(false);
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          labelAlign="right"
          requiredMark={false}
          initialValues={{
            search: true,
            reveal: '1',
            sort: 100,
          }}
        // colon={false}
        >
          <Form.Item
            label="规格值"
            name="value"
            rules={[
              { required: true, message: '请输入规格值' },
            ]}
            help="格式: 规格值 [每行一个]"
          >
            <Input.TextArea placeholder="请输入规格值" style={{ height: '148px' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div >
  )
})

export default SpecsCheckboxWrap;