import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { createBaiTap } from '../../api/examApi';
import UserInforr from '../UserInfor/UserInfor';
import { UserContext } from '../../index';
import styles from './UpDate.module.scss';
import { insertDiem } from '../../api/diemApi';

const cx = classNames.bind(styles);

const UpDate = () => {
  const UserInfor = useContext(UserContext);

  const [mssv, setMssv] = useState('48.01.101.');
  const [diem, setDiem] = useState('');

  const handle = async () => {
    let res = await insertDiem({ mssv, diem });
    if (res) {
      console.log('okk');
    } else {
      console.log('nooo');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <input
        onChange={(e) => {
          setMssv(e.target.value);
        }}
        value={mssv}
      />
      <input
        onChange={(e) => {
          setDiem(e.target.value);
        }}
        value={diem}
        type="number"
      />
      <button onClick={handle}>guiwr</button>
    </div>
  );
};

export default UpDate;
