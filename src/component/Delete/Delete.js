import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { deleteForm, getAllForm } from '../../api/examApi';
import UserInforr from '../UserInfor/UserInfor';
import { UserContext } from '../../index';
import styles from './Delete.module.scss';

const cx = classNames.bind(styles);

const Delete = () => {
  const UserInfor = useContext(UserContext);
  const navigation = useNavigate();

  const [error, setError] = useState('');
  const [listForm, setListForm] = useState([]);

  useEffect(() => {
    if (UserInfor.role !== '00') {
      alert('Bạn không có quyền truy cập trang này');
      navigation('/login');
    }

    const fetchData = async () => {
      let res = await getAllForm(UserInfor.accessToken);
      if (res) {
        setListForm(res);
      } else {
        setTimeout(() => {
          setError('');
        }, 1500);
        setError('Đã có lỗi xảy ra. Hãy thử lại');
      }
    };
    fetchData();
  }, [UserInfor.role, navigation]);

  const handleDelete = async (payload) => {
    await deleteForm(payload, UserInfor.accessToken);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('q-title')}>
          <h4>Những form đã tạo</h4>
        </div>

        <div className={cx('create-question')}>
          <ul>
            {listForm.map((e, i) => {
              return (
                <li key={i}>
                  Chương: {e.chuong} Bài: {e.lesson}
                  <span
                    className={cx('delete-btn')}
                    onClick={() => handleDelete(e)}
                  >
                    Xóa
                  </span>
                </li>
              );
            })}
          </ul>

          <p>{error}</p>
        </div>
      </div>
      <UserInforr />
    </div>
  );
};

export default Delete;
