import CandlestickChart from "@/components/CandlestickChart";
import Head from "next/head";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Candlestick Chart</title>
      </Head>
      <h1>Candlestick Chart</h1>
      <CandlestickChart></CandlestickChart>
    </div>
  );
}
