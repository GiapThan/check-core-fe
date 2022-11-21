import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { UserContext } from "../../index";
import "./Login.css";

function Login() {
  const UserInfor = useContext(UserContext);
  const navigation = useNavigate();

  const [mssv, setMssv] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isShowFormInputName, setIsShowFormInputName] = useState(false);

  const handleSubmitName = async () => {
    if (!name) {
      return setError("Chưa nhập họ và tên");
    }
    let res = await userApi.login({ name: name, mssv: mssv }, "name");
    if (res) {
      UserInfor.name = name;
      UserInfor.accessToken = res.accessToken;
      UserInfor.role = res.role;
      console.log("...............");
      navigation(-1);
    } else {
      setError("Máy chủ đang bận. Hãy thử lại");
    }
  };

  const handleSubmit = async () => {
    console.log(mssv, password);
    if (!mssv) {
      return setError("Chưa nhập MSSV");
    }
    if (!password) {
      return setError("Mật khẩu không được bỏ trống");
    }
    let res = await userApi.login({ mssv: mssv, password: password });
    if (res) {
      UserInfor.name = res.name;
      UserInfor.mssv = res.mssv;
      UserInfor.stars = res.stars;
      UserInfor.accessToken = res.accessToken;
      UserInfor.role = res.role;

      if (res.name === "") {
        return setIsShowFormInputName(true);
      } else {
        navigation(-1);
      }
    } else {
      setError("Đăng nhập thất bại. Hãy thử lại");
    }
  };

  return (
    <>
      <div className={"form-input"}>
        <div className={"title"}>Đăng Nhập</div>
        {!isShowFormInputName && (
          <>
            <div className={"form-control"}>
              <input
                placeholder="MSSV"
                value={mssv}
                onClick={() => setError("")}
                onChange={(e) => setMssv(e.target.value)}
              />
            </div>

            <div className={"form-control"}>
              <input
                placeholder="Nếu lần đầu đăng nhập, hãy nhập mật khẩu mới"
                type={"password"}
                value={password}
                onClick={() => setError("")}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
            </div>

            <div className={"show-error"}>{error}</div>
            <button className={"submit-btn"} onClick={handleSubmit}>
              Đăng Nhập
            </button>
          </>
        )}
        {isShowFormInputName && (
          <>
            <div className="form-control">
              <input
                placeholder="Nhập tên của bạn"
                value={name}
                onClick={() => setError("")}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmitName();
                }}
                style={{ fontWeight: 600 }}
              />
            </div>
            <div className={"show-error"}>{error}</div>
            <button className={"submit-btn"} onClick={handleSubmitName}>
              Đăng Nhập
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
