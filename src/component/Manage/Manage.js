import { useState, useContext, useEffect } from "react";
import { incDiem } from "../../api/diemApi";

import {
  changeOpen,
  getBaiTapManage,
  reLoadDataManage,
} from "../../api/examApi";
import { UserContext } from "../../index";
import "./Manage.css";

const Manage = (props) => {
  const UserInfor = useContext(UserContext);

  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataSignIn, setDataSignIn] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getBaiTapManage(
        { lesson: props.lesson, chuong: props.chuong },
        UserInfor.accessToken
      );
      if (res) {
        setIsOpenSignIn(res.open);
      }
    };
    fetchData();
  }, [UserInfor.accessToken, props.lesson, props.chuong]);

  const handleChangeIsOpen = async () => {
    let res = await changeOpen(
      {
        lesson: props.lesson,
        chuong: props.chuong,
        open: !isOpenSignIn,
      },
      UserInfor.accessToken
    );
    if (res) {
      setIsOpenSignIn(!isOpenSignIn);
    }
  };

  const handleIncStarForBaiTap = async (mssv, cauhoi) => {
    setIsLoading(true);

    let res = await incDiem(
      {
        mssv: mssv,
        cauhoi: cauhoi,
        chuong: props.chuong,
        lesson: props.lesson,
      },
      UserInfor.accessToken
    );
    if (res) {
      reLoadData();
    } else {
      setIsLoading(false);
      setTimeout(() => {
        setError("");
      }, 2000);
      return setError("Đã có lỗi, hãy tải lại");
    }
  };

  const reLoadData = async () => {
    setDataSignIn([]);
    setIsLoading(true);
    let res = await reLoadDataManage(
      { chuong: props.chuong, lesson: props.lesson },
      UserInfor.accessToken
    );
    if (res) {
      setIsLoading(false);
      setDataSignIn(res);
      return;
    } else {
      setIsLoading(false);
      setTimeout(() => {
        setError("");
      }, 2000);
      return setError("Đã có lỗi, hãy tải lại");
    }
  };

  return (
    <div className="manage-wrapper">
      Quản lý bài {props.lesson} chương {props.chuong}
      <div className="option">
        <button
          onClick={handleChangeIsOpen}
          className={!isOpenSignIn ? "btn-green" : "btn-red"}
        >
          {!isOpenSignIn ? "Mở" : "Đóng"} đăng ký
        </button>
        <button
          onClick={reLoadData}
          className={isLoading ? "btn-green loading" : `btn-green`}
          disabled={isLoading}
        >
          Tải lại
        </button>
        <div
          style={{ marginTop: "0px", fontWeight: "600", fontSize: "14px" }}
          className="show-error"
        >
          {isLoading ? "Đang tải..." : null}
          {error}
        </div>
      </div>
      <div>
        <table className="table-dki">
          <tr>
            <th>Câu</th>
            <th>MSSV</th>
            <th>Tên</th>
            <th>Số sao đã có</th>
            <th>Thời gian đăng ký</th>
            <th></th>
          </tr>
          {Object.keys(dataSignIn).map((cauhoi) => {
            return dataSignIn[cauhoi].map((element) => {
              let date = new Date(element.time);
              return (
                <tr>
                  <td style={{ fontWeight: "600" }}>{cauhoi}</td>
                  <td>{element.mssv}</td>
                  <td>{element.name}</td>
                  <td>{element.stars}</td>
                  <td>{`${
                    date.toTimeString().split(" ")[0]
                  } ${date.toLocaleDateString()}`}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleIncStarForBaiTap(element.mssv, cauhoi)
                      }
                      className="btn-inc-star"
                    >
                      Cộng
                    </button>
                  </td>
                </tr>
              );
            });
          })}
        </table>
      </div>
    </div>
  );
};

export default Manage;
