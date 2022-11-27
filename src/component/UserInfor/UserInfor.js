import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfor } from "../../api/userApi";

import { UserContext } from "../../index";

const UserInforr = () => {
  const UserInfor = useContext(UserContext);
  const navigation = useNavigate();

  const [stars, setStars] = useState(UserInfor.stars);

  const reLoadUserInfor = async () => {
    let res = await getUserInfor(
      { mssv: UserInfor.mssv },
      UserInfor.accessToken
    );
    console.log(res);
    if (res) {
      UserInfor.stars = res.stars;
      setStars(res.stars);
    }
  };

  return (
    <div className="user-infor">
      <h4 style={{ color: "red" }}>{UserInfor.name}</h4>
      <h6>{UserInfor.mssv}</h6>
      {UserInfor.role === "00" && (
        <button
          onClick={() => {
            navigation("/dstt/create");
          }}
          className="create-exam"
        >
          Tạo form đăng ký
        </button>
      )}
      <div className="stars">
        <button onClick={reLoadUserInfor}>Tải lại</button>
        <span>Số sao đã có:</span>
        <div>
          {Object.keys(stars).map((key) => {
            return (
              <p key={key}>
                {key === "pre" ? "Trước đây" : `Ngày ${key}`}:{" "}
                <span>{stars[key] === "" ? 0 : stars[key]}</span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserInforr;
