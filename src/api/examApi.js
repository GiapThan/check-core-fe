import axiosClient from "./axiosClient";

const getBaiTap = async (payload = {}, accessToken) => {
  try {
    let res = await axiosClient.get(
      `exam/${payload.chuong}/${payload.lesson}`,
      { headers: { author: accessToken } }
    );
    console.log(res);
    if (res && res.errCode === 0) {
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const createBaiTap = async (payload = {}, accessToken) => {
  try {
    let res = await axiosClient.post("exam/create", payload, {
      headers: { author: accessToken },
    });
    if (res && res.errCode === 0) {
      return true;
    } else if (res.errCode === -2) {
      return -2;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const signInBaiTap = async (payload = {}) => {
  try {
    let data = await axiosClient.post("/exam/signin", payload);
    console.log(data);
    if (data.errCode === -1) return -1;
    if (data.errCode === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const changeOpen = async (payload = {}, accessToken) => {
  try {
    let res = await axiosClient.post("/exam/change", payload, {
      headers: { author: accessToken },
    });
    if (res.errCode === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getBaiTapManage = async (payload = {}, accessToken) => {
  try {
    let res = await axiosClient.get(
      `exam/manage/${payload.chuong}/${payload.lesson}`,
      { headers: { author: accessToken } }
    );
    if (res && res.errCode === 0) {
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const reLoadDataManage = async (payload, accessToken) => {
  try {
    let res = await axiosClient.get(
      `exam/reload/${payload.chuong}/${payload.lesson}`,
      { headers: { author: accessToken } }
    );
    if (res.errCode === 0) return res.data;
    return false;
  } catch (error) {
    return false;
  }
};
export {
  getBaiTap,
  createBaiTap,
  signInBaiTap,
  changeOpen,
  getBaiTapManage,
  reLoadDataManage,
};
