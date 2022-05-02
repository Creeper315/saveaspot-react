import axios from 'axios';
// import cloudinary from 'cloudinary/lib/cloudinary'; // cloudinary = cloudinary.v2;

const cloudURL = 'https://api.cloudinary.com/v1_1/linsfan/image/upload';
const profile_preset = 'fun_together_profile';
const location_preset = 'fun_together_location';
const photo_preset = 'fun_together_photo';

// cloudinary.config({
//     cloud_name: 'linsfan',
//     api_key: '571842814458179',
//     api_secret: '6kOYe5L4xcL-1ciW9onycGQ_et4',
// });

export function toPictureStr(edata) {
    let url = edata.secure_url;
    let pid = edata.public_id;

    return JSON.stringify({ url, pid });
}

export function getPicPid(str) {
    let obj = JSON.parse(str);
    return obj['pid'];
}

export function getPicUrl(str) {
    try {
        let obj = JSON.parse(str);
        return obj['url'];
    } catch (er) {
        return null;
    }
}

export async function toProfileCloud(
    fileData,
    username,
    current_picture_str,
    setThisUser
) {
    let formData = new FormData();
    formData.append('file', fileData.current);
    formData.append('upload_preset', profile_preset);
    // formData.append('cloud_name', 'linsfan');
    let e = await axios({
        method: 'post',
        url: cloudURL,
        data: formData,
    });
    let newPictureStr = toPictureStr(e.data);
    console.log('pic str', newPictureStr);
    // store str in database!
    let s = axios({
        method: 'post',
        url: '/api/userUpdate',
        data: { username, userpic: newPictureStr },
    });
    setThisUser({ ...setThisUser, userpic: newPictureStr });
    // console.log('update user picture result ', s);
    // let id_to_delete = getPicPid(current_picture_str);

    // cloudinary.uploader.destroy(id_to_delete, (result) => {
    //     console.log('delete pic result ', result);
    // });
}

export function imageExist(picture_string) {
    let imgUrl = getPicUrl(picture_string);
    return axios({
        method: 'get',
        url: imgUrl,
    })
        .then(() => {
            return imgUrl;
        })
        .catch((e) => {
            return false;
        });
}
