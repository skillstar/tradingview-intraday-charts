import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [postResponse, setPostResponse] = useState(null);

  useEffect(() => {
    // 调用 Cloudflare Workers API
    async function fetchData() {
      const res = await fetch('https://dawn-leaf-67fa.angelboy008.workers.dev/api/data');
      const result = await res.json();
      setData(result);
    }

    fetchData();
  }, []);

  const sendData = async () => {
    const res = await fetch('https://dawn-leaf-67fa.angelboy008.workers.dev/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Next.js User' }),
    });
    const result = await res.json();
    console.log("post:",result)
    setPostResponse(result);
  };

  return (
    <div>
      <h1>Cloudflare Workers API Example</h1>
      <h2>GET Request Data:</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}

      <h2>POST Request Example:</h2>
      <button onClick={sendData}>Send POST Request</button>
      {postResponse && <pre>{JSON.stringify(postResponse, null, 2)}</pre>}
    </div>
  );
}
