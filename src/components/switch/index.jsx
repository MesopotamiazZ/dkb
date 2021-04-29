import React, { useState } from 'react';

const Switch = ({ children, flag }) => {
  const [toogle, setToogle] = useState(flag);

  const switchToogle =  () => {
    setToogle(!toogle)
  }

  return (<>{children({toogle, switchToogle})}</>)
}

export default Switch