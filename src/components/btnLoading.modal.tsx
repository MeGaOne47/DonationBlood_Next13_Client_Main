import React, { CSSProperties } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '@/styles/hoidanit.css'
const btnLoadingStyle: CSSProperties = {
  display: 'flex', // Sửa lỗi cú pháp ở đây
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Sửa lỗi cú pháp ở đây
  opacity: 1, // Thiết lập opacity mặc định
  transition: 'opacity 0.5s ease-in-out', // Thêm hiệu ứng chuyển động
};

function ButtonLoading() {
  return (
    <div style={btnLoadingStyle}>
      <div className="loader"></div>
      <Spinner 
        animation="border" 
        variant="primary"
       />
       Loading...
    </div>
  );
}

export default ButtonLoading;
