import { useState, useContext, useEffect } from "react";

import { changeOpen, getBaiTapManage } from "../../api/examApi";
import { UserContext } from "../../index";
import "./Manage.css";

const Manage = (props) => {
  const UserInfor = useContext(UserContext);

  const [isOpenSignIn, setIsOpenSignIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getBaiTapManage(
        { lesson: props.lesson, chuong: props.chuong },
        UserInfor.accessToken
      );
      if (res) {
        console.log(res);
        setIsOpenSignIn(res.open);
      }
    };
    fetchData();
  }, []);

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

  const reLoadData = async () => {};

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
        <button onClick={reLoadData} className="btn-green">
          Tải lại
        </button>
      </div>
      <div>
        <table className="table-dki">
          <tr>
            <th>Câu</th>
            <th>MSSV</th>
            <th>Tên</th>
            <th>Số sao đã có</th>
            <th>Thời gian đăng ký</th>
          </tr>
          <tr>
            <td>1</td>
            <td>48.01.101.074</td>
            <td>Đặng Giáp Thân</td>
            <td>3</td>
            <td>12:12 22/11</td>
          </tr>
          <tr>
            <td>1</td>
            <td>48.01.101.074</td>
            <td>Nguyễn Đăng Hoàng Long</td>
            <td>3</td>
            <td>12:12 22/11</td>
          </tr>
          <tr>
            <td>1</td>
            <td>48.01.101.074</td>
            <td>Đặng Giáp Thân</td>
            <td>3</td>
            <td>12:12 22/11</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Manage;
