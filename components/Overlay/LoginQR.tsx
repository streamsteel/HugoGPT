import { FC } from 'react';

import Cookies from 'js-cookie';

interface Props {
  qrCodeUrl: string;
}

const LoginQR: FC<Props> = ({ qrCodeUrl }) => {
  // 检查是否存在access_token
  let access_token = Cookies.get('access_token');
  if (access_token) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <img src={qrCodeUrl} style={{ maxWidth: '80%' }} alt="login QR code" />
    </div>
  );
};

export default LoginQR;
