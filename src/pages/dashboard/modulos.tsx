import Layout from 'components/Layout/Layout';
import withAuth from 'HOC/withAuth';
import type { NextPage } from 'next';
import Head from 'next/head';

const Module: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Modulos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </Layout>
    )
}

export default withAuth(Module);