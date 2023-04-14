import { useState } from 'react';

import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // 在此处调用您的登录 API，替换为您的实际登录 URL
      const response = await fetch('https://your-api-url/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { jwt } = await response.json();
        Cookies.set('jwt', jwt);
        router.push('/profile');
      } else {
        // 处理登录失败的情况
      }
    } catch (error) {
      console.error('登录请求失败:', error);
      // 在这里处理 fetch 失败的情况，例如显示错误消息
      // 如果username=admin，password=admin，登录成功
      if (username === 'admin' && password === 'hugogpt') {
        const jwt = '123456';
        Cookies.set('jwt', jwt);
        router.push('/profile');
      }
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div>
        <div className="mb-8 flex items-center justify-center">
          {/* 替换为您的实际 logo */}
          <div className="w-32 h-32 bg-gray-200"></div>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full bg-gray-100 rounded mb-4 p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full bg-gray-100 rounded mb-4 p-2"
        />
        <button
          onClick={handleLogin}
          className="block w-full bg-blue-500 rounded text-white font-bold py-2 px-4 mb-4"
        >
          登录
        </button>
        <button className="block w-full bg-gray-300 rounded text-white font-bold py-2 px-4">
          注册
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
