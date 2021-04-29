import * as React from 'react';
import { Tabs } from 'antd';
import './style.less';

type tabsDataType = {
  label: string,
  status: string | undefined,
  key: string | undefined,
}

type SwitchTabsProps = {
  defaultKey: string | undefined,
  onChange?: ((value: string | number | undefined) => any),
  datas: Array<tabsDataType>
}

const SwitchTabs: React.FC<SwitchTabsProps> = ({ defaultKey, onChange, datas }) => {

  return (
    <div className="switch-tabs">
      {/* {
        (tabs) => (
          <ul>
            {
              tabs.length && tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={[tab.active && 'tab-active'].join(' ')}
                >
                  {tab.name}
                </li>
              ))
            }
          </ul>
        )
      } */}
      <Tabs
        defaultActiveKey={defaultKey}
        onChange={(e) => onChange(e)}
      >
        {datas.map(item => <Tabs.TabPane tab={item.label} key={item.key} />)}
      </Tabs>
    </div>
  )
}

export default SwitchTabs