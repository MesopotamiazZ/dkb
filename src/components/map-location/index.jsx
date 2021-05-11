import React, { memo, useCallback, useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { getLal, getAddress, getIpLocation } from '../../utils/map';
import * as _ from 'lodash';
// import TMap from 'TMap';
import './style.less';

const MapLocation = memo((props) => {
  const {
    form,
    onSetLatLng,
    editAddress
  } = props;

  const [loc, setLoc] = useState(null);
  const [addressList, setAddressList] = useState([]);

  const initialData = async () => {
    const location = await getIpLocation();
    setLoc(location);
  }

  useEffect(() => {
    initialData();
  }, [])

  useEffect(() => {
    if (loc) {
      // var center = new TMap.LatLng(...loc);//设置中心点坐标
      // var map = new TMap.Map("map-wrap", {
      //   center: center
      // });

      // //初始化marker图层
      // var markerLayer = new TMap.MultiMarker({
      //   id: 'marker-layer',
      //   map: map
      // });
    }
  }, [loc])

  /**
   * 输入搜索
   */
  const handleOnSelectSearch = _.debounce(async (val) => {
    const res = await getLal(val);
    if (res.location) {
      setLoc(res.location);
      const result = await getAddress(res.location.lat, res.location.lng);
      setAddressList(result.nearPois);
    }
  }, 1000);

  const options = useCallback(addressList.map((list) => (
    <Select.Option
      key={list.id}
      value={list.name}
    >
      {list.name}
    </Select.Option>
  )), [addressList]);

  return (
    <div className="map-location">
      <Form.Item
        name="address"
        rules={[{ required: true, message: '请输入地址' }]}
        style={{ width: '440px' }}
      >
        {/* <Input placeholder="请输入通讯地址" /> */}
        <Select
          style={{ width: '100%' }}
          showSearch
          placeholder="请选择或输入地址"
          onSearch={handleOnSelectSearch}
          filterOption={false}
          onChange={(value) => {
            onSetLatLng({ ...loc })
          }}
        >
          {
            options
          }
        </Select>
      </Form.Item>
      <Form.Item>
        <div className="map-wrap" id="map-wrap"></div>
      </Form.Item>
    </div>
  )
})

export default MapLocation;