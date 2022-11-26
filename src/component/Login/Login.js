import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../api/userApi";
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
    console.log(name.trim());
    if (!name) {
      return setError("Chưa nhập họ và tên");
    }
    if (name.trim() === "") return setError("Họ và tên không được để trống");
    let res = await UserLogin({ name: name, mssv: mssv }, "name");
    if (res) {
      UserInfor.name = name.trim();
      UserInfor.accessToken = res.accessToken;
      UserInfor.role = res.role;
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
    if (mssv.includes(" ")) {
      return setError("MSSV không chứa khoảng trắng");
    }
    if (!password) {
      return setError("Mật khẩu không được bỏ trống");
    }
    let res = await UserLogin({ mssv: mssv.trim(), password: password });
    if (res) {
      UserInfor.name = res.name;
      UserInfor.mssv = res.mssv;
      UserInfor.stars = res.stars;
      UserInfor.accessToken = res.accessToken;
      UserInfor.role = res.role;

      if (res.name === "" || !res.name) {
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
