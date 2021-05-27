import React, { memo, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './style.less';

interface IinputSearch {
  placeholder: string;
  onChange: (val: string) => void;
  onSearch: (val: string) => void;
}

const InputSearch: React.FC<IinputSearch> = memo((props) => {
  const {
    placeholder,
    onChange,
    onSearch,
  } = props;

  const [curVal, setCurVal] = useState('');

  return (
    <div className="input-search">
      <Input
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setCurVal(e.target.value);
        }}
      />
      <SearchOutlined
        className="search-icon"
        onClick={() => onSearch(curVal)}
      />
    </div>
  )
})

export default InputSearch;