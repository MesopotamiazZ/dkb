import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Tree,
} from 'antd';
import InputSearch from './InputSearch';
import './style.less';

interface ITreeChild {
  id: number | string;
  name: string;
  pid: number | string;
  level: number | string;
  child: Array<ITreeChild>;
}

interface IsearchTree {
  trees: Array<ITreeChild>;
}

// const treeData = [
//   {
//     title: 'parent 1',
//     key: '0-0',
//     children: [
//       {
//         title: 'parent 1-0',
//         key: '0-0-0',
//         children: [
//           { title: 'leaf', key: '0-0-0-0' },
//           {
//             title: (
//               <>
//                 <div>multiple line title</div>
//                 <div>multiple line title</div>
//               </>
//             ),
//             key: '0-0-0-1',
//           },
//           { title: 'leaf', key: '0-0-0-2' },
//         ],
//       },
//       {
//         title: 'parent 1-1',
//         key: '0-0-1',
//         children: [{ title: 'leaf', key: '0-0-1-0' }],
//       },
//       {
//         title: 'parent 1-2',
//         key: '0-0-2',
//         children: [
//           { title: 'leaf', key: '0-0-2-0' },
//           {
//             title: 'leaf',
//             key: '0-0-2-1',
//             // switcherIcon: <FormOutlined />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'parent 2',
//     key: '0-1',
//     children: [
//       {
//         title: 'parent 2-0',
//         key: '0-1-0',
//         children: [
//           { title: 'leaf', key: '0-1-0-0' },
//           { title: 'leaf', key: '0-1-0-1' },
//         ],
//       },
//     ],
//   },
// ];

const SearchTree: React.FC<IsearchTree> = memo((props) => {
  const {
    trees,
  } = props;

  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const options = parseTree(trees);
    setTreeData(options);
  }, [trees]);

  /**
   * 格式化树形分类
   * @param {*} categoryTrees 
   */
  const parseTree = (trees) => {
    const options = trees?.map((item) => ({
      ...item,
      title: item.name,
      key: item.id,
      children: parseTree(item.child)
    }))
    return options;
  }

  /**
   * 过滤树形分类
   * @param val 关键词 
   */
  const filterTree = (val, treeData) => {
    if (val === '') {
      return
    }
    const trees = treeData.filter((tree) => {
      // debugger
      return tree.name.indexOf(val) !== -1
        || hasKeyVal(val, tree.child)
    })
    setTreeData(trees);
  }

  /**
   * 递归判断child[index].name是否存在关键字
   * @param val 
   * @param child 
   * @param fg 
   * @returns 
   */
  const hasKeyVal = (val, child, fg = false) => {
    let flag = fg;
    child.forEach((item) => {
      if (item.name.indexOf(val) !== -1) {
        flag = true
      } else {
        hasKeyVal(val, item.child, flag)
      }
    })
    return flag;
  }

  /**
   * searchInput change
   * @param val 
   */
  const onChange = (val) => {
    if (val === '') {
      const options = parseTree(trees);
      setTreeData(options);
    }
  }

  /**
   * searchInput search
   * @param val 
   */
  const onSearch = (val) => {
    filterTree(val, treeData);
  }

  /**
   * tree select
   * @param selectedKeys 
   * @param info 
   */
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  }

  return (
    <div className="search-tree-wrap">
      <InputSearch
        placeholder="请输入关键词"
        onChange={onChange}
        onSearch={onSearch}
      />
      <div className="tree-wrap-content">
        <Tree
          showLine={{ showLeafIcon: false }}
          showIcon={false}
          // defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>
    </div>
  )
})

SearchTree.defaultProps = {
  trees: []
}

export default SearchTree;