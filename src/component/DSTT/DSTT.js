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
                <div>
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
                  <label key={element}>{element}</label>
                </div>
              );
            })}
          </div>

          <button onClick={submitDki}>Đăng ký làm bài</button>
        </div>

        <UserInforr />
      </div>
      {UserInfor.role === "00" && <Manage chuong={chuong} lesson={lesson} />}
    </>
  );
};

export default DSTT;
