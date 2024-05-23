'use client'
import { Button, Icon, IconButton } from "@mui/material"
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux'
import { handlePlus, handleMinus, getCount } from '@/app/components/counter/counter.slice'
export default function ReduxCounter() {
    const count = useSelector(getCount)
    const dispatch = useDispatch()

    return (<div className="text-center mt-500" style={{ marginTop: '100px' }}>
        <h1>Redux Counter : {count}</h1>
        <AddIcon onClick={() => dispatch(handlePlus())} /><br />
        <RemoveIcon onClick={() => dispatch(handleMinus())} /><br />
    </div>)
}