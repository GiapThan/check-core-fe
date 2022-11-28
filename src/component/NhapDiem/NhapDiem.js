import { useState } from 'react';
import { insertDiem } from '../../api/diemApi';

const NhapDiem = () => {
  const [mssv, setMssv] = useState('');
  const [diem, setDiem] = useState(0);
  const handleSubmit = async () => {
    if (mssv === '') {
      alert('MSSV phải nhập');
      return;
    }
    if (+diem < 0) {
      alert('Điểm phải không âm');
      return;
    }
    let res = await insertDiem({ mssv, diem });
    if (res) {
      setDiem(0);
      setMssv('');
    } else {
      alert('Đã có lỗi, Hãy nhập lại bản ghi này');
      setDiem(0);
    }
  };
  return (
    <div>
      Nhập Điểm đã có
      <div>
        <label>MSSV </label>
        <input
          style={{ fontWeight: 600 }}
          value={mssv}
          onChange={(e) => setMssv(e.target.value)}
        />
        <br />
        <label>Số sao đã có:</label>
        <input
          type="number"
          value={diem}
          onChange={(e) => setDiem(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default NhapDiem;
