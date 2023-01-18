import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

import { Icon, Input } from '~/componenets'

const validationSchema = yup.object().shape({
    name: yup.string().required('Preencha seu nome'),
    username: yup.string().required('Preencha seu nome de usuário'),
    email: yup.string().email('Informe um e-mail válido').required('Informe seu e-mail'),
    password: yup.string().required('Digite uma senha'),
})

export const Signup = () => {
    const [auth, setAuth] = useLocalStorage('auth', {})

    const formik = useFormik({
        onSubmit: async (values) => {    
            const res = await axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/users',
                data: values,
                //auth: {
                    //username: values.email,
                    //password: values.password
                //}
            })

            window.localStorage.setItem('auth', JSON.stringify(res.data))

        },
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: ''
        },
        validationSchema
    })

    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />
    }

    return (
        <div>
            <header className="p-4 border-b border-red-300">
                <div className="container max-w-2xl flex justify-center">
                    <img src="/assets/logo/logo-fundo-branco.svg" className="w-32 md:w-40"/>
                </div>
            </header>

            <main className="container max-w-2xl p-4">
                <div className="p-4 flex space-x-4 items-center">
                    <a href='/'>
                        <Icon name="back" className="h-7"/>
                    </a>
                    <h2 className="text-xl font-bold">Crie sua conta</h2>
                </div>

                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        label="Seu nome"
                        placeholder="Digite seu nome"
                        error={formik.touched.name && formik.errors.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input
                        type="text"
                        name="username"
                        label="Seu nome de usuário"
                        placeholder="Digite um nome de usuário"
                        error={formik.touched.username && formik.errors.username}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input
                        type="text"
                        name="email"
                        label="Seu e-mail"
                        placeholder="Digite seu e-mail"
                        error={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Sua senha"
                        placeholder="Digite uma senha"
                        error={formik.touched.password && formik.errors.password}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <button 
                        className="block w-full text-center text-white bg-red-500 px-6 py-3 rounded-xl disabled:opacity-50"
                        type='submit'
                        disabled={!formik.isValid || formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Carregando...' : 'Criar minha conta'}
                    </button>
                    <p className='text-center text-sm text-red-300'>Já tem conta? <a href='/login'>Faça login</a></p>
                </form>
            </main>
        </div>
    )
}