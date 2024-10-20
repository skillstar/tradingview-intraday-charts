import Head from 'next/head'
import type { FC } from "react"


const Faq: FC = function () {
  return (
    <>
      <Head>
        <title>FAQ pages</title>
      </Head>
      <div>Faq</div>
      <a
        href="/about"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        about
      </a>
    </>
  )
}

export default Faq