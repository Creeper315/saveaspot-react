const listLocation = 'listLocation';
// const listUser = 'listUser';
const userId = 'userId';
const ownPost = 'ownPost';
const saved = 'saved';
const helpedByMe = 'helpedByMe';
const pageJump = 'pageJump';

const filterOption = {
    listLocation: [],
    listUser: null,
    // userId: null,
    ownPost: false,
    saved: false,
    helpedByMe: false,
    pageSize: 3,
    onPage: 1,
};

export const setLocation = (list) => ({ type: listLocation, data: list });

// export const setUser = (str) => ({ type: listUser, data: str });

export const setId = (id) => ({ type: userId, data: id });

export const setOwnPost = (bool) => ({ type: ownPost, data: bool });

export const setSaved = (bool) => ({ type: saved, data: bool });

export const setHelpedByMe = (bool) => ({ type: helpedByMe, data: bool });

export const setPage = (num) => ({ type: pageJump, data: num });

export default function f(state = filterOption, action) {
    let d = action.data;

    switch (action.type) {
        case listLocation:
            return { ...state, listLocation: d };

        // case listUser:
        //     return { ...state, listUser: d };
        case userId:
            return { ...state, userId: d };
        case ownPost:
            return { ...state, ownPost: d };
        case saved:
            return { ...state, saved: d };
        case helpedByMe:
            return { ...state, helpedByMe: d };
        case pageJump:
            return { ...state, onPage: d };
        default:
            return state;
    }
}

// exports = {
//     setLocation,
//     setUser,
//     setId,
//     setOwnPost,
//     setSaved,
//     setHelpedByMe,
//     f,
// };
