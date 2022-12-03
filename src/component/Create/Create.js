import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { createBaiTap } from '../../api/examApi';
import UserInforr from '../UserInfor/UserInfor';
import { UserContext } from '../../index';
import styles from './Create.module.scss';

const cx = classNames.bind(styles);

const Create = () => {
  const UserInfor = useContext(UserContext);

  const [chuong, setChuong] = useState('');
  const [lesson, setLesson] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [listQuestion, setListQuestion] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    if (UserInfor.role !== '00') {
      alert('Bạn không có quyền truy cập trang này');
      navigation('/login');
    }
  }, [UserInfor.role, navigation]);

  const pushQuestion = () => {
    if (listQuestion.includes(question) || question.trim() === '') return;
    setListQuestion([...listQuestion, question]);
    setQuestion('');
  };

  const handleDelete = (index) => {
    let newArr = listQuestion;
    delete newArr[index];
    newArr = newArr.filter((e) => e != null);
    setListQuestion(newArr);
  };

  const submit = async () => {
    if (!chuong || chuong.trim() === '') {
      return setError('Chưa nhập Chương');
    }
    if (!lesson || lesson.trim() === '') {
      return setError('Chưa nhập Bài học');
    }
    if (listQuestion.length < 1) {
      return setError('Tối thiểu 1 câu bài tập.');
    }
    let res = await createBaiTap(
      { chuong: chuong.trim(), lesson: lesson.trim(), listQuestion },
      UserInfor.accessToken,
    );
    if (res && res !== -2) {
      navigation(`/dstt/${chuong.trim()}/${lesson.trim()}`);
    } else if (res === -2) {
      setError(`Chương ${chuong.trim()} Bài ${lesson.trim()} đã tạo`);
    } else setError('Máy chủ đang bận. Thử lại');
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('q-title')}>
          Câu hỏi bài tập Chương
          <input
            type={'text'}
            value={chuong}
            onChange={(e) => setChuong(e.target.value)}
            onClick={() => setError('')}
          />{' '}
          Bài
          <input
            type={'text'}
            value={lesson}
            onClick={() => setError('')}
            onChange={(e) => setLesson(e.target.value)}
          />
        </div>

        <div className={cx('create-question')}>
          <ul>
            {listQuestion.map((e, i) => {
              return (
                <li key={e}>
                  {e}
                  <span
                    className={cx('delete-btn')}
                    onClick={() => handleDelete(i)}
                  >
                    Xóa
                  </span>
                </li>
              );
            })}
          </ul>
          <input
            placeholder="Tên bài tập. Vd: 1a"
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            onKeyDown={(e) => {
              if (e.key === 'Enter') pushQuestion();
            }}
            onClick={() => setError('')}
          />
          <button onClick={pushQuestion}>Thêm</button>
          <button onClick={submit}>Tải lên</button>
          <p>{error}</p>
        </div>
      </div>
      <UserInforr />
    </div>
  );
};

export default Create;
