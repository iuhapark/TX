"use client";

const SERVER = 'http://localhost:8080'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import { useDispatch } from 'react-redux';

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 rounded-b-2xl transition-all duration-300 p-3 w-full bg-white dark:bg-black">
      <div>
        <span
          className="text-xl font-semibold text-gray-800 dark:text-white cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          Lawmate
        </span>
      </div>
    </nav>
  );
}
export default Header;
