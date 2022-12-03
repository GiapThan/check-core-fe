import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import { getUserInfor } from '../../api/userApi';
import { UserContext } from '../../index';
import styles from './UserInfor.module.scss';

const cx = classNames.bind(styles);

const UserInforr = () => {
  const UserInfor = useContext(UserContext);
  const navigation = useNavigate();

  const [stars, setStars] = useState(UserInfor.stars);
  const [isLoading, setIsLoading] = useState(false);

  const reLoadUserInfor = async () => {
    setIsLoading(true);
    let res = await getUserInfor(
      { mssv: UserInfor.mssv },
      UserInfor.accessToken,
    );
    if (res) {
      UserInfor.stars = res.stars;
      setStars(res.stars);
    }
    setIsLoading(false);
  };

  return (
    <div className={cx('user-infor')}>
      <h4 style={{ color: 'red' }}>{UserInfor.name}</h4>
      <h6>{UserInfor.mssv}</h6>
      {UserInfor.role === '00' && (
        <>
          <button
            onClick={() => {
              navigation('/dstt/create');
            }}
            className={cx('create-exam')}
          >
            Tạo form đăng ký
          </button>
          <button className={cx('create-exam')}>Chỉnh sửa form</button>
          <button className={cx('create-exam')}>Xóa form</button>
          <button
            onClick={() => {
              navigation('/dstt/class');
            }}
            className={cx('create-exam')}
          >
            Quản lý lớp
          </button>
        </>
      )}
      <div className={cx('stars')}>
        <span>Số sao đã có:</span>
        <button
          className={cx('reload-stars')}
          disabled={isLoading}
          onClick={reLoadUserInfor}
        >
          <FontAwesomeIcon
            icon={faRotateRight}
            className={isLoading ? cx('loading') : ''}
          />
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
