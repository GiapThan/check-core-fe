import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { incDiem } from '../../api/diemApi';
import { getAllUserInfor } from '../../api/userApi';
import { UserContext } from '../../index';
import UserInforr from '../UserInfor/UserInfor';
import styles from './ClassRoom.module.scss';

const cx = classNames.bind(styles);

const ClassRoom = () => {
  const UserInfor = useContext(UserContext);
  const navigation = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    if (UserInfor.role !== '00') {
      alert('Bạn không có quyền truy cập vào trang này');
      navigation('/login');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getAllUserInfor(UserInfor.accessToken);
      if (res) {
        setDataUsers(res);
      }
    };
    fetchData();
  }, []);

  const handleIncStarForBaiTap = async (mssv) => {
    setIsLoading(true);

    let res = await incDiem({ mssv: mssv }, UserInfor.accessToken);
    if (res) {
      reLoadData();
    } else {
      setIsLoading(false);
      setTimeout(() => {
        setError('');
      }, 2000);
      return setError('Đã có lỗi, hãy tải lại');
    }
  };

  const reLoadData = async () => {
    setDataUsers([]);
    setIsLoading(true);
    let res = await getAllUserInfor(UserInfor.accessToken);
    if (res) {
      setIsLoading(false);
      setDataUsers(res);
      return;
    } else {
      setIsLoading(false);
      setTimeout(() => {
        setError('');
      }, 2000);
      return setError('Đã có lỗi, hãy tải lại');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('manage-wrapper-class')}>
        <strong style={{ color: 'red', fontSize: 24 }}>Quản lý lớp</strong>
        <div className={cx('option')}>
          <button
            onClick={reLoadData}
            className={cx('reload-btn')}
            disabled={isLoading}
          >
            Tải lại
          </button>
          <div
            style={{ marginTop: '0px', fontWeight: '600', fontSize: '14px' }}
            className="show-error"
          >
            {isLoading ? 'Đang tải...' : null}
            {error}
          </div>
        </div>

        <div>
          <table className={cx('table-dki')}>
            <tr>
              <th>STT</th>
              <th>MSSV</th>
              <th>Tên</th>
              <th>Số sao đã có</th>
              <th></th>
            </tr>
            {dataUsers.map((element, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{element.mssv}</td>
                  <td>
                    <b>{element.name}</b>
                  </td>
                  <td>{element.stars}</td>
                  <td>
                    <button
                      onClick={() => handleIncStarForBaiTap(element.mssv)}
                      className={cx('btn-inc-star')}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button onClick={() => {}} className={cx('btn-dec-star')}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>

      <UserInforr />
    </div>
  );
};

export default ClassRoom;
