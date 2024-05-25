'use client';
import { Link } from '@mui/material';
import { PG } from '@/app/components/common/enums/PG';

export function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li><Link href={`${PG.USER}/login`}>signin</Link></li>
        <li><Link href={`${PG.USER}/join`}>signup</Link></li>
        <li><Link href={`${PG.USER}/detail/${1}`}>mypage</Link></li>
      </ul>
    </nav>
  );
}
