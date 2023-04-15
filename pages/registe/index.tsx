import { useState } from 'react';

import { useRouter } from 'next/router';

const RegistePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [informMessage, setInformMessage] = useState('');
  const router = useRouter();

  const showInformMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleSendVerificationCode = async () => {
    if (!/^1\d{10}$/.test(username)) {
      showError('请输入有效的11位手机号码');
      return;
    }

    // 调用阿里云发送验证码 API
    // ...

    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const handleUserRegiste = async () => {
    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      showError('密码必须是8位以上的字母和数字组成');
      return;
    }

    // 调用阿里云验证服务
    // ...

    // 调用注册 API

    // 注册成功后，跳转到登录页面
    showInformMessage(
      '内测阶段暂时不支持注册，如果需要账号，请联系管理员，3秒后跳转到登录界面',
    );
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      {errorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white font-bold py-2 px-4 rounded">
          {errorMessage}
        </div>
      )}
      <div className="absolute top-4 left-4">
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          返回
        </button>
      </div>
      <div>
        <div className="mb-8 flex items-center justify-center">
          {/* 替换为您的实际 logo */}
          <div className="w-32 h-32 bg-gray-200"></div>
        </div>
        <input
          type="text"
          placeholder="手机号"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full bg-gray-100 rounded mb-4 p-2"
        />

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="验证码"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="block w-2/3 bg-gray-100 rounded p-2"
          />
          <button
            onClick={handleSendVerificationCode}
            disabled={countdown > 0}
            className={`block w-1/3 bg-blue-500 rounded text-white font-bold py-2 px-4 ml-2 ${
              countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {countdown > 0 ? `${countdown}秒后重试` : '发送验证码'}
          </button>
        </div>

        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full bg-gray-100 rounded mb-4 p-2"
        />
        <button
          onClick={handleUserRegiste}
          className="block w-full bg-green-500 rounded text-white font-bold py-2 px-4"
        >
          注册
        </button>
      </div>
    </div>
  );
};
export default RegistePage;
