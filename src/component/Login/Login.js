import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { UserLogin } from '../../api/userApi';
import { UserContext } from '../../index';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
  const UserInfor = useContext(UserContext);
  const navigation = useNavigate();

  const [mssv, setMssv] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isShowFormInputName, setIsShowFormInputName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitName = async () => {
    if (!name) {
      return setError('Chưa nhập họ và tên');
    }
    setIsLoading(true);
    if (name.trim() === '') return setError('Họ và tên không được để trống');
    let res = await UserLogin({ name: name, mssv: mssv }, 'name');
    if (res) {
      UserInfor.name = name.trim();
      UserInfor.accessToken = res.accessToken;
      UserInfor.role = res.role;
      navigation(-1);
    } else {
      setIsLoading(false);
      setError('Máy chủ đang bận. Hãy thử lại');
    }
  };

  const handleSubmit = async () => {
    if (!mssv) {
      return setError('Chưa nhập MSSV');
    }
    if (mssv.includes(' ')) {
      return setError('MSSV không chứa khoảng trắng');
    }
    if (!password) {
      return setError('Mật khẩu không được bỏ trống');
    }
    setIsLoading(true);
    let res = await UserLogin({ mssv: mssv.trim(), password: password });
    if (res) {
      UserInfor.name = res.name;
      UserInfor.mssv = res.mssv;
      UserInfor.stars = res.stars;
      UserInfor.accessToken = res.accessToken;
      UserInfor.role = res.role;
      if (res.name === '' || !res.name) {
        setIsLoading(false);
        return setIsShowFormInputName(true);
      } else {
        navigation(-1);
      }
    } else {
      setIsLoading(false);
      setError('Đăng nhập thất bại. Hãy thử lại');
    }
  };

  return (
    <>
      <div className={cx('form-input')}>
        <div className={cx('title')}>Đăng Nhập</div>
        {!isShowFormInputName && (
          <>
            <div className={cx('form-control')}>
              <input
                placeholder="MSSV"
                value={mssv}
                onClick={() => setError('')}
                onChange={(e) => setMssv(e.target.value)}
              />
            </div>

            <div className={cx('form-control')}>
              <input
                placeholder="Nếu lần đầu đăng nhập, hãy nhập mật khẩu mới"
                type={'password'}
                value={password}
                onClick={() => setError('')}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit();
                }}
              />
            </div>

            <div className="show-error">{error}</div>
            <button
              className={
                isLoading ? cx('submit-btn', 'loading') : cx('submit-btn')
              }
              onClick={handleSubmit}
            >
              Đăng Nhập
            </button>
          </>
        )}
        {isShowFormInputName && (
          <>
            <div className={cx('form-control')}>
              <input
                placeholder="Nhập tên của bạn"
                value={name}
                onClick={() => setError('')}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmitName();
                }}
                style={{ fontWeight: 600 }}
              />
            </div>
            <div className={cx('show-error')}>{error}</div>
            <button
              className={
                isLoading ? cx('submit-btn', 'loading') : cx('submit-btn')
              }
              onClick={handleSubmitName}
            >
              Đăng Nhập
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
