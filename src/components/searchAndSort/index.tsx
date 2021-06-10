import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Input,
} from 'antd';
import { toOcr } from '../../services/order';
import AddressParse from 'address-parse';
import './style.less';
import imgpng from '../../assets/images/imgpng.png';

interface ISearchAndSort {
  sort?: string | null;
  onGetBase64: (data: string) => void;
}

const { Search } = Input;

// enum Sales {
//   salenum_desc = 'salenum_desc',
//   salenum_asc = 'salenum_asc',
// }
// enum Update {
//   update_desc = 'update_desc',
//   update_asc = 'update_asc'
// }

// enum Price {
//   update_desc = 'price_desc',
//   update_asc = 'price_asc'
// }

const SearchAndSort: React.FC<ISearchAndSort> = memo((props) => {

  const {
    sort,
    onGetBase64,
  } = props;

  const loadPicRef = useRef(null);
  const [curSort, setCurSort] = useState(sort);

  /**
   * file转base64
   * @param blob 
   * @param cb 
   */
  const blobToDataURL = (blob, cb) => {
    let reader = new FileReader();
    reader.onload = function (evt) {
      let base64 = evt.target.result;
      cb(base64);
    };
    reader.readAsDataURL(blob);
  };

  /**
   * 图片识别
   */
  useEffect(() => {
    loadPicRef.current.addEventListener('change', (event) => {
      // console.log(event.currentTarget.files[0])
      blobToDataURL(event.currentTarget.files[0], async (base64) => {
        onGetBase64(base64.split('base64,')[1]);
      })
    })
  }, [loadPicRef])

  const onSearch = (val, e) => {
    console.log(val, e)
  }

  const onChangeSort = (val) => {
    if (!val) {
      setCurSort(null);
    }
    if (val === 'sale') {
      setCurSort('salenum_desc');
    }
    if (val === 'update') {
      setCurSort('update_desc');
    }
    if (val === 'price') {
      setCurSort('price_desc');
    }
  }

  return (
    <div className="search-sort">
      <Search
        placeholder="输入关键词搜索或上传图片搜索"
        enterButton="搜索"
        size="large"
        suffix={(<div className="load-pic">
          <img
            src={imgpng}
            alt=""
          />
          <input
            ref={loadPicRef}
            className="upload-pic"
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png"
          />
        </div>)}
        onSearch={onSearch}
      />
      <div className="sort">
        <div className={['sort-item', curSort == null
          || curSort === ''
          ? 'sort-item-active' : ''].join(' ')}
          onClick={() => onChangeSort(null)}
        >
          默认
        </div>
        <div className={['sort-item', curSort === 'salenum_desc'
          ? 'sort-item-active' : ''].join(' ')}
          onClick={() => onChangeSort('sale')}
        >
          销量
        </div>
        <div className={['sort-item', curSort === 'update_desc'
          ? 'sort-item-active' : ''].join(' ')}
          onClick={() => onChangeSort('update')}
        >
          最新
        </div>
        <div className={['sort-item', curSort === 'price_desc'
          ? 'sort-item-active' : ''].join(' ')}
          onClick={() => onChangeSort('price')}
        >
          价格
        </div>
      </div>
    </div>
  )
});

SearchAndSort.defaultProps = {
  sort: null
}

export default SearchAndSort;
