import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { actions } from '../../store/slice';
import { updateToogleSameCity } from '@/services/system';
import ToogleTipWrap from '@/components/toogle-tip-wrap';

const SameCityDelivery = memo(() => {
  const dispatch = useDispatch();

  const {
    toogleSameCityActionAsync,
  } = actions;

  let {
    toogleCity,
  } = useSelector(state => state.system, shallowEqual) //store数据

  const initialData = () => {
    dispatch((toogleSameCityActionAsync()))
  }

  useEffect(() => {
    initialData()
  }, [])

  const onSameCityDelivery = async (checked) => {
    let formData = new FormData();
    formData.append('is_localexp', checked);
    const res = await updateToogleSameCity(formData);
    if (res.code === 200) {
      dispatch(toogleSameCityActionAsync());
    }
  }
  return (
    <>
      <ToogleTipWrap
        isOpen={toogleCity?.is_localexp}
        title="同城配送"
        content="启用同城配送后，在配送范围内的买家可以选择同城配送，
        您可以接入第三方配送，也可以自己配送。"
        onToogle={onSameCityDelivery}
      />
    </>
  )
})

export default SameCityDelivery;