import { useState, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Modal from '../Modal/Modal';
import {
  changeOpen,
  getBaiTapManage,
  reLoadDataManage,
} from '../../api/examApi';
import { incDiem } from '../../api/diemApi';
import { UserContext } from '../../index';
import styles from './Manage.module.scss';

const cx = classNames.bind(styles);

const Manage = (props) => {
  const UserInfor = useContext(UserContext);

  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataSignIn, setDataSignIn] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getBaiTapManage(
        { lesson: props.lesson, chuong: props.chuong },
        UserInfor.accessToken,
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
      UserInfor.accessToken,
    );
    if (res) {
      setIsOpenSignIn(!isOpenSignIn);
    }
  };

  const handleIncStarForBaiTap = async (mssv, cauhoi) => {
    setIsLoading(true);
    setIsOpenModal(false);
    let res = await incDiem(
      {
        mssv: mssv,
        cauhoi: cauhoi,
        chuong: props.chuong,
        lesson: props.lesson,
      },
      UserInfor.accessToken,
    );
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
    setDataSignIn([]);
    setIsLoading(true);
    let res = await reLoadDataManage(
      { chuong: props.chuong, lesson: props.lesson },
      UserInfor.accessToken,
    );
    if (res) {
      setIsLoading(false);
      setDataSignIn(res);
      return;
    } else {
      setIsLoading(false);
      setTimeout(() => {
        setError('');
      }, 2000);
      return setError('Đã có lỗi, hãy tải lại');
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div className={cx('manage-wrapper')}>
        Quản lý bài {props.lesson} chương {props.chuong}
        <div className={cx('option')}>
          <button
            onClick={handleChangeIsOpen}
            className={!isOpenSignIn ? cx('btn-green') : cx('btn-red')}
          >
            {!isOpenSignIn ? 'Mở' : 'Đóng'} đăng ký
          </button>
          <button
            onClick={reLoadData}
            className={isLoading ? cx('btn-green', 'loading') : cx('btn-green')}
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
        <div className={cx('wrapper-table-dki')}>
          <table className={cx('table-dki')}>
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
                    <td style={{ fontWeight: '600' }}>{cauhoi}</td>
                    <td>{element.mssv}</td>
                    <td>{element.name}</td>
                    <td>{element.stars}</td>
                    <td>{`${
                      date.toTimeString().split(' ')[0]
                    } ${date.toLocaleDateString()}`}</td>
                    <td>
                      <button
                        onClick={() => {
                          setIsOpenModal({ mssv: element.mssv, cauhoi });
                        }}
                        className={cx('btn-inc-star')}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </td>
                  </tr>
                );
              });
            })}
          </table>
        </div>
      </div>

      <Modal
        isOpenModal={isOpenModal}
        onRequestClose={handleCloseModal}
        containerId="xac-nhan"
      >
        <div>
          <h3>Bạn có chắc muốn cộng điểm không ?</h3>
          <button
            className={cx('btn-inc-star')}
            onClick={() => {
              handleIncStarForBaiTap(isOpenModal.mssv, isOpenModal.cauhoi);
            }}
          >
            Xác nhận
          </button>
          <button className={cx('btn-cancel')} onClick={handleCloseModal}>
            Hủy
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Manage;
