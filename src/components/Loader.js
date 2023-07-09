import React, { useContext } from 'react'
import styled from "./Loader.module.css"
import Main from '../store/ctx'

export const Loader = () => {
    const loading = useContext(Main)
    
    return (
        <div className={styled.loader}>
            <progress value={loading.valueI} max="100"></progress>
            <p className={styled.p}>Loading... {loading.valueI}%</p>
        </div>
    )
}
