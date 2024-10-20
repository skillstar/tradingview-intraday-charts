import Head from 'next/head'
import Link from 'next/link'
import type { FC } from "react"
import Layout from '@/components/layout'

const About: FC = function () {
  return (
    <Layout>
      <>
        <Head>
          <title>about pages</title>
          <meta charSet='utf-8' />
        </Head>
        <div>About~~~</div>
        <Link href="/faq" target={"_blank"}>FAQ</Link>
      </>
    </Layout>

  )

}

export default About