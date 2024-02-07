import React, { useEffect } from 'react'
import '../../../asset/css/error.css'
import { useDispatch } from 'react-redux'

const ErrorPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.clear();
        dispatch({ type: 'RESET_ALL' })
    }, [])
    return (
        <div className='d-flex align-items-center justify-content-center error-page'>
            <div className="section">
                <h1 className="error">404</h1>
                <div className="page">Ooops!!! The page you are looking for is not found</div>
                {/* <a className="back-home" href="http://www.mcrm.taxfile.co.in">Back to home</a> */}
            </div>
        </div>
    )
}

export default ErrorPage