import cookie from 'react-cookies';
let service = {};


service.isAdmin = () => {
    let type = cookie.load('role');
    if (type === "A") {
        return true;
    } else if (type === "M") {
        return false;
    } else {
        // redirect login
    }
}

service.getUser = () => {
    let userID = cookie.load('user_id');
   
    return {
        userID: userID
    }

}

export default service;
