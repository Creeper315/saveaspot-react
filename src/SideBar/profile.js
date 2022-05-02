import a from '../img/lin.jpg';
// import defaultPic from '../svg/defaultprofile.svg';
import { Fragment, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { getPicUrl, toProfileCloud, imageExist } from '../imgHelper';

const Profile = ({ ThisUser, setThisUser }) => {
    const [ImgUrl, setImgUrl] = useState(a);
    // console.log('Profile Render ', ThisUser);

    useEffect(() => {
        console.log('Profile Effect', ThisUser.userpic);
        if (ThisUser.userpic !== undefined) {
            imageExist(ThisUser.userpic).then((e) => {
                console.log('Profile Then', e);
                if (e !== false) {
                    setImgUrl(e);
                }
            });
        }
    }, [ThisUser.userpic]);

    const fileData = useRef();
    const imgUploader = useRef();

    function receiveImg(e) {
        let f = e.target.files[0];
        fileData.current = f;
        let url = URL.createObjectURL(f);
        setImgUrl(url);

        toProfileCloud(
            fileData,
            ThisUser.username,
            ThisUser.userpic,
            setThisUser
        );
    }

    // function toCloud(e) {
    //     e.preventDefault();

    //     let formData = new FormData();
    //     formData.append('file', fileData.current);
    //     formData.append('upload_preset', 'fun_together_profile');
    //     // formData.append('cloud_name', 'linsfan');
    //     axios({
    //         method: 'post',
    //         url: cloudURL,
    //         data: formData,
    //     })
    //         .then((e) => {
    //             // e.data.secure_url 就是想要的图片 Link
    //             // e.data.public_id 就是图片的 id，用来之后删除图片用
    //             let finalUrl = e.data.secure_url;
    //             console.log('upload then ', finalUrl, e.data);
    //             // 上传 cloudinary 成功后
    //         })
    //         .catch((e) => {
    //             console.log('upload catch ', e);
    //         });
    // }

    return (
        <Fragment>
            <input
                type="file"
                onChange={receiveImg}
                ref={imgUploader}
                style={{ display: 'none' }}
            />
            {/* <button type="submit" onClick={toCloud}>
                Submit img
            </button> */}
            <div id="profile-contain">
                <div id="profile-contain-2">
                    <div
                        className="spinning-gear-contain"
                        onClick={() => {
                            imgUploader.current.click();
                        }}
                    >
                        <div className="spinning-gear">ccc</div>
                    </div>
                    <img src={ImgUrl} alt="profile icon" id="profile-icon" />
                </div>
            </div>
        </Fragment>
    );
};

export default Profile;
