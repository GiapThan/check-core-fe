import axiosClient from "./axiosClient";

const login = async (payload = {}, type = "login") => {
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

export default { login };
