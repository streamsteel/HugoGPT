import React, { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

function ChargePage() {
  const [isWeChatQR, setIsWeChatQR] = useState(true);
  const router = useRouter();
  const { data } = router.query;

  // 解析 JSON 数据
  const postData = data
    ? JSON.parse(data as string)
    : { user_name: '', mount: '20' };

  const toggleQRCode = () => {
    setIsWeChatQR(!isWeChatQR);
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>二维码支付示例</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <div className="relative w-64 h-64 mb-8">
          {isWeChatQR ? (
            <Image
              src="/wx_pay.png"
              alt="微信收款二维码"
              width={256}
              height={256}
              className="w-full h-full object-contain"
            />
          ) : (
            <Image
              src="/ali_pay.png"
              alt="支付宝收款二维码"
              width={256}
              height={256}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <div>
          <span>用户名: </span>
          <span className="text-xl font-bold">{postData.user_name}</span>
        </div>
        <div className="mb-4">
          <span>充值金额: </span>
          <span className="text-xl font-bold">${postData.mount}</span>
        </div>

        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={toggleQRCode}
        >
          {isWeChatQR ? '支付宝支付' : '微信支付'}
        </button>
      </main>
    </div>
  );
}

export default ChargePage;
