import axiosClient from "./axiosClient";

const insertDiem = async (payload) => {
  let res = await axiosClient.post("/diem/insert", payload);
  if (res.errCode === 0) return true;
  return false;
};

const incDiem = async (payload = {}, accessToken) => {
  try {
    let res = await axiosClient.put("/diem/inc", payload, {
      headers: { author: accessToken },
    });
    if (res && res.errCode === 0) return true;
    return false;
  } catch (error) {
    return false;
  }
};
export { insertDiem, incDiem };
