import * as React from 'react';
import { Steps, Button, Spin } from 'antd';

import refreshSvg from '@/assets/images/refresh.svg';
import './style.less';

const { Step } = Steps;

enum statusType {
  WAIT = 'wait',
  PROCESS = 'process ',
  FINISH = 'finish',
  ERROR = 'error',
}

interface stepDatasProps {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  status?: string;
  disabled?: string;
  key: string | number;
}

interface stepsProps {
  className?: string;
  current?: number;
  labelPlacement?: string;
  size?: string;
  onChange: Function;
}

interface importStepsProps {
  channel_name: string;
  status_msg: string;
  stepsProps: stepsProps;
  stepDatas: Array<stepDatasProps>;
  onHandRefresh: Function;
  spinLoading: boolean;
}

const ImportSteps: React.FC<importStepsProps> = (props) => {
  const {
    channel_name,
    status_msg,
    stepsProps,
    stepDatas,
    onHandRefresh,
    spinLoading,
  } = props;

  return (
    <Spin
      spinning={spinLoading}
      tip="进件中..."
    >
      <div className="import-steps">
        <div className="steps-header">
          <div className="header-name">
            <div className="title">
              {channel_name}处理进度
          </div>
            <div
              className="refresh"
              onClick={() => onHandRefresh()}
            >
              <img src={refreshSvg} alt="" />
              <Button type="link">手动刷新</Button>
            </div>
          </div>
          <div className="header-status">当前状态：{status_msg}</div>
        </div>
        <div className="steps-body">
          <Steps
            className={stepsProps.className}
            labelPlacement="vertical"
            size="small"
            onChange={() => stepsProps.onChange()}
            current={stepsProps.current}
          >
            {
              stepDatas.map((data) => (
                <>
                  <Step
                    key={data.key}
                    title={data.title}
                    subTitle={data.subTitle}
                    status={
                      data.status === statusType.FINISH
                        ? 'finish' : data.status === statusType.ERROR
                          ? 'error' : 'wait'
                    }
                  />
                </>
              ))
            }
          </Steps>
        </div>
        <div className="steps-foot"></div>
      </div>
    </Spin>
  )
}

export default ImportSteps