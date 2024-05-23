'use client'
import * as React from 'react';
import { PG } from '@/app/components/common/enums/PG'; 
import { Box, Link } from '@mui/material';

interface ILinkButton{
    id: number,
    title: string,
    path: string
}

  export default function LinkButton ({id, title, path}:ILinkButton) {
    return(<>
        <Link
         href={`${path}`}
        className="py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">
            {title}
            </Link>
        </>)
  } 

  export const linkButtonTitles = [
    { id: '2', title: 'LOGIN', path: `${PG.USER}/login` },
    { id: '4', title: 'POSTS', path: `${PG.POST}/list` },
    { id: '5', title: 'BOARDS', path: `${PG.BOARD}/list` },
    { id: '6', title: 'MyPage', path: `${PG.USER}/detail/${1}` }
]

    export const settings = ['Profile','Account','Dashboard','Logout']
  