import React, { memo } from 'react';
import ToogleTipWrap from '@/components/toogle-tip-wrap';

const SameCityDelivery = memo(() => {

  const onSameCityDelivery = (checked) => {
    console.log(checked)
  }
  return (
    <>
      <ToogleTipWrap
        isOpen={true}
        title="同城配送"
        content="启用同城配送后，在配送范围内的买家可以选择同城配送，
        您可以接入第三方配送，也可以自己配送。"
        onToogle={onSameCityDelivery}
      />
    </>
  )
})

export default SameCityDelivery;