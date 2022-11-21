import axiosClient from "./axiosClient";
const insertDiem = async (payload) => {
  let res = await axiosClient.post("/diem/insert", payload);
  if (res.errCode === 0) return true;
  return false;
};
export { insertDiem };
