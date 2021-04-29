import * as React from 'react';
import { Steps, Button } from 'antd';

import './style.less';

const { Step } = Steps;

interface importDataStepsProps {
  merchantDetail: any;
  applymentDetail: any;
  onExecute: Function;
}

const ImportDataSteps: React.FC<importDataStepsProps> = React.memo((props) => {
  const {
    merchantDetail,
    applymentDetail,
    onExecute,
  } = props;

  return (
    <div className="import-data-step">
      {
        Object.keys(applymentDetail).length && <Steps
          // current={applymentDetail.}
          size="small"
          labelPlacement="vertical"
        >
          {
            applymentDetail.steps.map((step) => (
              <Step
                key={step.id}
                title={step.step}
                subTitle={
                  <Button
                    onClick={() => onExecute({
                      merchant_id: step.apply.merchant_id,
                      channel_id: step.apply.channel_id,
                      apply_id: step.apply.apply_id,
                    })}
                  >
                    执行
                  </Button>
                }
              />
            ))
          }
        </Steps>
      }
    </div>
  )
})

export default ImportDataSteps;