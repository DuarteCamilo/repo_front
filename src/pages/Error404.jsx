import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-6xl font-bold'>404</h1>
                <h2 className='text-3xl mt-4'>Página no encontrada</h2>
                <p className='mt-2'>Lo sentimos, no pudimos encontrar la página que buscas.</p>
                <p className='mt-4'>¿Quizás intentabas buscar algo más relacionado con nuestra clínica dental?</p>

                <div className='my-12'>
                    <Link to='/' className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition'>Volver a la página principal</Link>
                </div>
            </div>
        </div>
    )
}

export default Error404
