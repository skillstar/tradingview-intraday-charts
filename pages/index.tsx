import { useEffect, useState } from 'react'
import Loading from '@/components/loading'
import Head from 'next/head'
export default function Home() {

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // 模拟加载数据的异步操作
    const fetchData = async () => {
      // 这里可以是真实的数据加载操作，比如使用 fetch 或者 axios
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 模拟加载时间 2 秒
      setLoading(false); // 加载完成后设置 loading 为 false
    };

    fetchData();
  }, []);
  return (
    <div>
      <Head>
        <title>home pages</title>
      </Head>
      {loading ? <Loading /> : "Hello world!"}
    </div>
  );
}
