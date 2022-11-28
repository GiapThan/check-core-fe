import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfor } from '../../api/userApi';

import { UserContext } from '../../index';
import './UserInfor.css';

const UserInforr = () => {
  const UserInfor = useContext(UserContext);
  const navigation = useNavigate();

  const [stars, setStars] = useState(UserInfor.stars);

  const reLoadUserInfor = async () => {
    let res = await getUserInfor(
      { mssv: UserInfor.mssv },
      UserInfor.accessToken,
    );
    if (res) {
      UserInfor.stars = res.stars;
      setStars(res.stars);
    }
  };

  return (
    <div className="user-infor">
      <h4 style={{ color: 'red' }}>{UserInfor.name}</h4>
      <h6>{UserInfor.mssv}</h6>
      {UserInfor.role === '00' && (
        <>
          <button
            onClick={() => {
              navigation('/dstt/create');
            }}
            className="create-exam"
          >
            Tạo form đăng ký
          </button>
          <button className="create-exam">Chỉnh sửa form</button>
          <button className="create-exam">Xóa form</button>
          <button
            onClick={() => {
              navigation('/dstt/class');
            }}
            className="create-exam"
          >
            Quản lý lớp
          </button>
        </>
      )}
      <div className="stars">
        <span>Số sao đã có:</span>
        <button className="reload-stars" onClick={reLoadUserInfor}>
          Tải lại
        </button>
        <div>
          {Object.keys(stars).map((key) => {
            return (
              <p key={key}>
                {key === 'pre' ? 'Trước đây' : `Ngày ${key}`}:{' '}
                <span>{stars[key] === '' ? 0 : stars[key]}</span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserInforr;
