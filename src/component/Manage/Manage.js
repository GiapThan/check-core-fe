import { useState } from "react";

const Manage = (props) => {
  return (
    <div>
      Quản lý bài {props.lesson} chương {props.chuong}
      <div></div>
    </div>
  );
};

export default Manage;
