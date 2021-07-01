import React, { memo, useCallback, useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { getLal, getAddress, getIpLocation } from '../../utils/map';
import * as _ from 'lodash';
import './style.less';

let markerLayer = null;

let map = null;

const MapLocation = memo((props) => {
  const {
    form,
    onSetLatLng,
    editAddress
  } = props;

  const [hasMap, setHasMap] = useState(false);
  const [loc, setLoc] = useState(null);
  const [addressList, setAddressList] = useState([]);

  const initialData = async () => {
    const location = await getIpLocation();
    setLoc(location);
  }

  /**
   * 获取地址列表
   * @param {*} loc 
   */
  const getAddressAsync = async (lat, lng) => {
    const result = await getAddress(lat, lng);
    setAddressList(result.nearPois);
  }

  /**
   * 初始化地图
   */
  const initMap = () => {
    var center = new window.TMap.LatLng(loc?.lat, loc?.lng);//设置中心点坐标
    map = new window.TMap.Map("map-wrap", {
      center: center
    });

    //初始化marker图层
    markerLayer = new window.TMap.MultiMarker({
      id: 'marker-layer',
      map: map,
      geometries: [
        {
          "id": "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          "styleId": 'myStyle',  //指定样式id
          "position": new window.TMap.LatLng(loc?.lat, loc?.lng),  //点标记坐标位置
          "properties": {//自定义属性
            "title": "marker1"
          }
        }
      ]
    });

    //监听点击事件添加marker
    map.on("click", async (evt) => {
      const id = markerLayer.geometries[0].id;
      markerLayer.remove([id]);
      markerLayer.add({
        position: evt.latLng
      });
      await getAddressAsync(evt.latLng.lat, evt.latLng.lng);
      // const result = await getAddress(evt.latLng.lat, evt.latLng.lng);
      // setAddressList(result.nearPois);
      setLoc({ ...evt.latLng });
      onSetLatLng({ ...evt.latLng });
    });
  }

  useEffect(() => {
    initialData();
  }, [])

  /**
   * 地图赋值
   */
  useEffect(() => {
    if (editAddress && Object.keys(editAddress).length) {
      form.setFieldsValue({
        address: editAddress.address
      });
      map?.setCenter({ lat: editAddress.lat, lng: editAddress.lng });
      const id = markerLayer?.geometries[0].id;
      markerLayer?.remove([id]);
      markerLayer?.add({ position: new window.TMap.LatLng(editAddress.lat, editAddress.lng) });
      getAddressAsync(editAddress.lat, editAddress.lng);
    }
  }, [editAddress])

  useEffect(() => {
    if (loc && !hasMap) {
      setHasMap(true);
      initMap();
    }
  }, [loc, hasMap])

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
            onSetLatLng({ ...loc });
            map?.setCenter({ lat: loc.lat, lng: loc.lng });
            const id = markerLayer?.geometries[0].id;
            markerLayer?.remove([id]);
            markerLayer?.add({ position: new window.TMap.LatLng(loc.lat, loc.lng) });
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
    </div >
  )
})

export default MapLocation;