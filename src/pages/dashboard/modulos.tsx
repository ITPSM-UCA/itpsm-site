import Layout from 'components/Layout/Layout';
import ModulesForm from 'components/Modules/ModulesForm';
import ModulesTable from 'components/Modules/ModulesTable';
import withAuth from 'HOC/withAuth';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRef, useState } from 'react';

const columns = [
    { field: 'id', hidden: true },
    { title: 'Código', field: 'code' },
    { title: 'Nombre', field: 'name' }
]
const initialData = { code: '', name: '' }

const Module: NextPage = () => {
    const modulesTableRef: any = useRef()
    const [currentModule, setCurrentModule] = useState<any>(initialData)
    const [showModulesForm, setShowModulesForm] = useState<boolean>(false)

    const fetchModules = async () => { return {rows: [], page: 1, records: 0} }
    const toggleModulesForm = () => { setShowModulesForm((prevState: boolean) => !prevState) }
    const editRowAction = async (event: any, rowData: any) => {}
    const refreshTableAction = () => { if (modulesTableRef.current) modulesTableRef.current.onQueryChange() }
    const clearData = () => { setCurrentModule(initialData) }

    return (
        <Layout>
            <Head>
                <title>Modulos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
                {showModulesForm ? 
                (
                    <ModulesForm
                        clearData={ clearData }
                        data={ currentModule }
                        toggleForm={ toggleModulesForm }/>
                ) 
                : 
                (
                    <ModulesTable
                        columns={ columns }
                        tableRef={ modulesTableRef }
                        fetchData={ fetchModules }
                        toggleForm={ toggleModulesForm }
                        editRowAction={ editRowAction }
                        refreshTableAction={ refreshTableAction }/>
                )}
            </div>
        </Layout>
    )
}

export default withAuth(Module);