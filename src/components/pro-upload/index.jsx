import React, { memo, useState, useEffect } from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined, LockFilled } from '@ant-design/icons';
import moment from 'moment'
import { MD5 } from 'crypto-js';
import { uploadPic, handleOnPreview } from '@/utils/upload';
import './index.less'
import paymentImg from '@/assets/images/payment.png'

export default memo(function ({ imageParams = {}, accept = ".jpg", defaultList = [], is_only, actionUrl, imgUrl, onChange, fileUrl }) {
    //当前时间
    const [currentDate, setCurrentDate] = useState('');
    // 图片上传次数
    const [uploadCount, setUploadCount] = useState(0);
    // 商品图片对象数组
    const [proPicList, setProPicList] = useState([]);
    // 图片地址数组
    const [proPics, setProPics] = useState([...defaultList]);
    //展示的图片数组
    const [proArr, setProArr] = useState([]);
    const [loading, setLoading] = useState(false);

    const [lock, setLock] = useState(false);
    const uploadButton = (
        <div>
            {
                loading
                    ? <LoadingOutlined style={{ fontSize: "46px", color: "#1890FF", opacity: "0.31" }} />
                    : <PlusOutlined style={{ fontSize: "46px", color: "#1890FF", opacity: "0.31" }} />
            }
        </div>
    );
    //获取初始值
    useEffect(() => {
        setCurrentDate(Date.now());
    }, [])

    // useEffect(() => {
    //     console.log('proPicList', proPicList);
    // }, [proPicList])

    useEffect(() => {
        // let defaultArr = [...defaultList];
        let defaultArr = JSON.parse(JSON.stringify(defaultList));
        defaultArr.forEach(item => {
            item.uid = item.path;
            item.key = item.path;
            item.name = item.path;
            item.status = "done";
            if (!item.url?.includes(imgUrl)) {
                item.url = `${imgUrl}` + item.path;
            }
            if (!item.path?.includes(imgUrl)) {
                item.path = `${imgUrl}` + item.path;
            }
        });
        setProArr([...defaultArr]);
        //给 
        setProPics([...defaultList]);
    }, [defaultList]);

    useEffect(() => {
        //防止一进来就规则校验
        if (!lock && proPics.length === 0) {
            // console.log("图片地址22++++");
            return;
        }
        if (typeof onChange === "function") {
            setLock(true);
            onChange(proPics);
        }
    }, [proPics]);

    // useEffect(() => {
    //     console.log("删除图片后的数组", proArr)
    // }, [proArr]);

    // 删除图片
    const handleDel = (index, e) => {
        e.stopPropagation();
        const arr1 = [...proPics];
        const arr2 = [...proArr];
        arr1.splice(index, 1);
        arr2.splice(index, 1);
        setProPics([...arr1])
        setProArr([...arr2])
    }
    // 设置为封面图
    const handleCover = (index) => {
        const arr1 = [...proPics];
        const arr2 = [...proArr];
        arr1.forEach(item => {
            item.is_cover = 0;
        })
        arr2.forEach(item => {
            item.is_cover = 0;
        })
        arr1[index].is_cover = 1;
        arr2[index].is_cover = 1;
        setProPics([...arr1]);
        setProArr([...arr2])

    }
    return (
        <>
            <div className="upload-wrapper">
                {
                    is_only > 1 && proArr.map((item, index) => {
                        return (
                            <div className="img-list" key={item.path}>
                                <div className="pic-item">
                                    <img src={item.path} alt="" />
                                    <div onClick={(e) => {
                                        handleDel(index, e);
                                    }}><DeleteOutlined style={{ color: "#fff", fontSize: "16px" }} /></div>
                                </div>
                                <div className={item.is_cover ? "content-item" : "content-item active"}
                                    onClick={() => {
                                        handleCover(index)
                                    }}
                                >{item.is_cover ? "当前封面" : "设为封面"}</div>
                            </div>
                        )
                    })
                }
                <Upload
                    // style={{ overflow: 'hidden', width: '104px', height: '104px',border:"1px solid #000" }}
                    // name="file"
                    accept={accept}
                    listType="picture-card"
                    // fileList={proPicList}
                    fileList={[{
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    }]}
                    className="avatar-uploader"
                    // 不能显示列表
                    showUploadList={false}
                    // action={actionUrl}
                    // data={
                    //     {
                    //         key: `${fileUrl}${MD5(`${fileUrl}${uploadCount}${currentDate}`)}${accept}`,
                    //         OSSAccessKeyId: imageParams.accessid,
                    //         ...imageParams,
                    //     }
                    // }
                    method="PUT"
                    customRequest={(options) => {
                        const { onSuccess, onError, file, onProgress, headers } = options;
                        // start：进度条相关
                        // 伪装成 handleChange里面的图片上传状态
                        // const imgItem = {
                        //     uid: '1', // 注意，这个uid一定不能少，否则上传失败
                        //     name: 'hehe.png',
                        //     status: 'uploading',
                        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        //     percent: 99, // 注意不要写100。100表示上传完成
                        // };
                        // setProPicList(proPicList.concat(imgItem));
                        // 更新 imgList
                        // end：进度条相关
                        onProgress((data) => {
                            // console.log('onPress', data)
                        })
                        onError((err, ret) => {
                            // console.log('error', err, ret);
                        })
                        onSuccess((ret, xhr) => {
                            // console.log('success', ret, xhr);
                        })
                        uploadPic()(file, uploadCount, (err, data) => {
                            // console.log(err || data?.url?.split('.com')[1]);
                            if (is_only === 1) {
                                setProPics([{ path: data?.url?.split('.com')[1], is_cover: 0 }]);
                                setProArr([{ path: data?.url, is_cover: 0 }]);
                                return;
                            } else {
                                setProPics([...proPics, { path: data?.url?.split('.com')[1], is_cover: 0 }]);
                                setProArr([...proArr, { path: data?.url, is_cover: 0 }]);
                            }
                            // err || (data && setProPics([...proPics, { type: 1, path: data?.url?.split('.com')[0], is_cover: 1 }]));
                        });
                    }}
                    onChange={({ file, fileList: newFileList }) => {
                        setLock(true);
                        // console.log('smyhvae handleChange file:', file);
                        // console.log('smyhvae handleChange fileList:', newFileList);

                        if (file.status === 'removed') {
                            setProPicList([])
                        }
                        if (file.status === 'uploading') {
                            setLoading(true);
                        }
                        if (file.status === 'done') {
                            setUploadCount(uploadCount + 1);
                            setProPicList(newFileList);
                            setLoading(false);
                            // setProPics([...proPics, { type: 1, path: , is_cover: 1 }])
                        }
                        // if (event) {
                        //     setTimeout(() => {
                        //         const fileName = `${fileUrl}${MD5(`${fileUrl}${uploadCount}${currentDate}`)}${accept}`;
                        //         setUploadCount(uploadCount + 1);
                        //         if (is_only === 1) {
                        //             setProPics([{ path: fileName, is_cover: 0 }]);
                        //             setProArr([{ path: `${imgUrl}${fileName}`, is_cover: 0 }]);
                        //             return;
                        //         } else {
                        //             setProPics([...proPics, { path: fileName, is_cover: 0 }]);
                        //             setProArr([...proArr, { path: `${imgUrl}${fileName}`, is_cover: 0 }]);
                        //         }
                        //     }, 200);
                        // }
                    }}
                // onRemove={(file) => {
                //     proPicList.forEach((list, index) => {
                //         if (list.name === file.name) {
                //             setProPics(proPics.slice(index + 1));
                //         }
                //     });
                // }}
                // onPreview={async (file) => {
                //     handleOnPreview(file);
                // }}
                >
                    {/* {!is_only ? uploadButton : ""} */}
                    {
                        is_only
                            ? ((proArr.length > 0 && is_only === 1)
                                ? <div className="pic-item">
                                    <img
                                        src={proArr[0].path}
                                        alt="avatar"
                                    />
                                    <div onClick={(e) => {
                                        handleDel(0, e)
                                    }}><DeleteOutlined style={{ color: "#fff", fontSize: "16px" }} /></div>
                                </div> : proArr.length >= is_only
                                    ? null : uploadButton) : uploadButton
                    }
                </Upload>
            </div>
        </>
    );
})
