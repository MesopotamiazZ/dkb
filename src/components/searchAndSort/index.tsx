import React, { memo, useState } from 'react';
import {
  Input,
} from 'antd';
import './style.less';
import imgpng from '../../assets/images/imgpng.png';

interface ISearchAndSort {
  sort?: string | null;
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
    sort
  } = props;

  const [curSort, setCurSort] = useState(sort);

  const onSearch = (val, e) => {
    console.log(val, e)
  }

  const onImgClick = () => {
    console.log('imgclick')
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
        suffix={(<img
          src={imgpng}
          alt=""
          onClick={onImgClick}
        />)}
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
