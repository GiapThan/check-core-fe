import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./DSTT.css";
import { UserContext } from "../../index";
import { getBaiTap, signInBaiTap } from "../../api/examApi";
import UserInforr from "../UserInfor/UserInfor";
import Manage from "../Manage/Manage";

const DSTT = () => {
  const UserInfor = useContext(UserContext);
  const navigation = useNavigate();
  const params = useParams();

  const [btap, setBTap] = useState([]);
  const [chuong, setChuong] = useState("");
  const [lesson, setLesson] = useState("");
  const [error, setError] = useState("");

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (UserInfor.mssv === "" && UserInfor.name === "") {
      return navigation("/login");
    }

    const getData = async () => {
      let res = await getBaiTap(params, UserInfor.accessToken);
      if (res) {
        setBTap(res.listQuestion);
        setChuong(res.chuong);
        setLesson(res.lesson);
        setChecked(res.listHasSignIn);
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại");
        navigation("/login");
      }
    };
    getData();
  }, []);

  const submitDki = async () => {
    if (checked.length === 0) return;
    let res = await signInBaiTap({
      mssv: UserInfor.mssv,
      chuong: chuong,
      lesson: lesson,
      listQuestion: checked,
    });
    console.log(res);
    if (res === -1) {
      setTimeout(() => {
        setError("");
      }, 2000);
      return setError("Chưa đến hoặc đã hết thời gian đăng ký");
    }
    if (res) {
      setTimeout(() => {
        setError("");
      }, 2000);
      return setError("Đăng ký thành công");
    } else {
      setTimeout(() => {
        setError("");
      }, 2000);
      return setError("Đã có lỗi. Hãy thử lại");
    }
  };

  const handlePushQuestion = (element) => {
    setChecked([...checked, element]);
  };

  const handleDelete = (element) => {
    let newArr = checked;
    delete newArr[checked.indexOf(element)];
    newArr = newArr.filter((e) => {
      if (e) return e;
    });
    setChecked(newArr);
  };

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="q-title">
            Câu hỏi bài tập Chương {chuong} Bài {lesson}
          </div>

          <div className="question">
            {btap.map((element) => {
              return (
                <div key={element}>
                  <input
                    type="checkbox"
                    checked={checked.indexOf(element) === -1 ? "" : "checked"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handlePushQuestion(element);
                      } else {
                        handleDelete(element);
                      }
                    }}
                  />
                  <label>{element}</label>
                </div>
              );
            })}
          </div>

          <button onClick={submitDki}>Đăng ký làm bài</button>
          <div
            style={{ marginTop: "0px", fontWeight: "600", fontSize: "14px" }}
            className="show-error"
          >
            {error}
          </div>
        </div>

        <UserInforr />
      </div>
      {UserInfor.role === "00" && (
        <Manage chuong={params.chuong} lesson={params.lesson} />
      )}
    </>
  );
};

export default DSTT;
