import axiosClient from './axiosClient';

const refreshToken = async () => {
  try {
    let res = await axiosClient.get('user/refreshToken');
    console.log(res);
    if (res && res.errCode === 0) {
      return res.data;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const UserLogin = async (payload = {}, type = 'login') => {
  try {
    const res = await axiosClient.post(
      `${type === 'login' ? 'user/login' : 'user/login/name'}`,
      payload,
    );
    if (res && res.errCode === 0) {
      return res.data;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getUserInfor = async (payload = {}, accessToken) => {
  try {
    let res = await axiosClient.get(`user/${payload.mssv}`, {
      headers: {
        author: accessToken,
      },
    });
    if (res && res.errCode === 0) return res.data;
    return false;
  } catch (error) {
    return false;
  }
};

const getAllUserInfor = async (accessToken) => {
  try {
    let res = await axiosClient.get('user/all', {
      headers: { author: accessToken },
    });
    if (res.errCode === 0) return res.data;
    return false;
  } catch (error) {
    return false;
  }
};

const logOut = async (accessToken) => {
  try {
    let res = await axiosClient.get('user/logout', {
      headers: {
        author: accessToken,
      },
    });
    console.log(res);
    if (res && res.errCode === 0) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { UserLogin, getUserInfor, getAllUserInfor, refreshToken, logOut };
