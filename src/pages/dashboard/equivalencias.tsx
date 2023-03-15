import Layout from 'components/Layout/Layout';

import withAuth from 'HOC/withAuth';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRef, useState } from 'react';
import getModules from 'services/Modules/getModules';
import EquivalenceForm from 'components/Equivalence/EquivalenceForm';

const columns = [
    { field: 'id', hidden: true },
    { title: 'Código', field: 'code' },
    { title: 'Nombre', field: 'name' }
]
const initialData = { code: '', name: '' }

const Equivalence: NextPage = () => {
    const modulesTableRef: any = useRef()
    const [currentModule, setCurrentModule] = useState<any>(initialData)
    const [showModulesForm, setShowModulesForm] = useState<boolean>(false)

    const fetchModules = async (materialTableQuery: any) => { 
        return { ...await getModules(materialTableQuery) }
    }
    
    const toggleModulesForm = () => { setShowModulesForm((prevState: boolean) => !prevState) }
    
    const editRowAction = async (event: any, rowData: any) => {
        event.stopPropagation()
        setCurrentModule(rowData)
        setShowModulesForm(true)
    }
    
    const refreshTableAction = () => { if (modulesTableRef.current) modulesTableRef.current.onQueryChange() }
    
    const clearData = () => { setCurrentModule(initialData) }

    return (
        <Layout>
            <Head>
                <title>Equivalencias</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
                <EquivalenceForm></EquivalenceForm>
            </div>
        </Layout>
    )
}

export default withAuth(Equivalence);