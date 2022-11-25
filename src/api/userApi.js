import axiosClient from "./axiosClient";

const UserLogin = async (payload = {}, type = "login") => {
  console.log(payload, type);
  try {
    const res = await axiosClient.post(
      `${type === "login" ? "user/login" : "user/login/name"}`,
      payload
    );
    if (res && res.errCode === 0) {
      return res.data;
    }
    return false;
  } catch (error) {
    console.log("err login", error);
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

export { UserLogin, getUserInfor };
