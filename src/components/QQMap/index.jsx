/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

function _Map(props) {
  const {
    setMapInfo,
  } = props;

  // const [map, setMap] = useState(null);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
      const loc = event.data;
      if (loc && loc.module === 'locationPicker') {
        // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        const location = {
          cityname: loc.cityname,
          address: loc.poiaddress,
          address_desc: loc.poiname,
          location: loc.latlng,
        };
        // setMap(location);
        setMapInfo(location);
      }
    }, false);
  }, []);

  return (
    <div className="map_wrap">
      <>
        <div className="select_wrap">
              {/* &coord=${props._localtion?.location} */}
          <iframe
            style={{ width: '100%', height: '500px' }}
            id="mapPage"
            className="mapPage"
            frameBorder={0}
            src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&radius=1000&total=5&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
          />
        </div>
        {/* <div className="btns">
            <Button onClick={() => { history.goBack(); }}>取消</Button>
            <Button type="primary" onClick={onSave}>保存</Button>
        </div> */}
      </>
    </div>
  );
}

export default _Map;
