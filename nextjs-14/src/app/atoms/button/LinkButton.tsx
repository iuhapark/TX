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
        className="py-2 px-3 light:text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-decoration-line: none" aria-current="page">
            {title}
            </Link>
        </>)
  } 

  export const linkButtonTitles = [
    { id: '2', title: 'mypage', path: `${PG.USER}/detail/${1}` },
    { id: '4', title: 'logout', path: `${PG.POST}/list` },
    { id: '5', title: 'boards', path: `${PG.BOARD}/list` },
    { id: '6', title: 'posts', path: `${PG.POST}/list` }
]

    export const settings = ['Profile','Account','Dashboard','Logout']
  