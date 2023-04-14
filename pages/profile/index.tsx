import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [chargeAmount, setChargeAmount] = useState('');
  const [inputError, setInputError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 在此处调用您的获取用户数据的 API，替换为您的实际 API URL
        const response = await fetch('https://your-api-url/user-data', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setBalance(data.balance);
        } else {
          // 处理获取用户数据失败的情况
        }
      } catch (error) {
        console.error('获取用户数据请求失败:', error);
        // 在这里处理 fetch 失败的情况，例如显示错误消息
        setUsername('admin');
        setBalance(0);
      }
    };

    fetchUserData();
  }, []);

  const handleChargeClick = async () => {
    if (Number(chargeAmount) >= 10) {
      setInputError(false);

      const body = JSON.stringify({
        user_name: username,
        mount: chargeAmount,
      });

      router.push({
        pathname: '/charge',
        query: { data: body },
      });
    } else {
      setInputError(true);
    }
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">用户资料</h1>
      <div className="mb-8">
        <div className="font-bold">用户名</div>
        <div>{username}</div>
      </div>
      <div className="mb-8">
        <div className="font-bold">账户余额</div>
        <div>{balance} 元</div>
      </div>
      <div className="mb-4">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="充值金额"
          value={chargeAmount}
          onChange={(e) => setChargeAmount(e.target.value)}
          className={`w-full p-2 border ${
            inputError ? 'border-red-500' : 'border-gray-300'
          } rounded`}
        />
      </div>
      {inputError && (
        <div className="text-red-500 mb-4">充值金额必须大于等于10元</div>
      )}
      <button
        onClick={handleChargeClick}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        充值
      </button>
    </div>
  );
};

export default ProfilePage;
