"use client";

const SERVER = "http://localhost:8080";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { destroyCookie, parseCookies } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, logout } from "../../user/service/user-service";
import LogoutIcon from "@mui/icons-material/Logout";
import { getUserById } from "../../user/service/user-slice";
import { IUser } from "../../user/model/user";
import { PG } from "../enums/PG";
import { jwtDecode } from "jwt-decode";
import PaymentIcon from '@mui/icons-material/Payment';

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const user: IUser = useSelector(getUserById);
  const token = parseCookies().accessToken;

  useEffect(() => {
    if (parseCookies().accessToken !== "") {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  }, [parseCookies().accessToken]);

  const profileHandler = () => {
    const token = parseCookies().accessToken;
    console.log("Token in Profile:", token);
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("User id in Profile:", decoded.id);
        dispatch(findUserById(decoded.id));
        router.push(`${PG.USER}${PG.DETAIL}/${decoded.id}`);
      } catch (error) {
        console.error("Invalid token:", error);
        router.push(`${PG.AUTH}/callback`);
      }
    } else {
      router.push(`${PG.AUTH}/callback`);
    }
  };

  const logoutHandler = () => {
    console.log("Before logout:", parseCookies().accessToken);
    dispatch(logout())
      .then((res: any) => {
        destroyCookie(null, "accessToken");
        setShowProfile(false);
        router.push("/");
        console.log("After logout:", parseCookies().accessToken);
      })
      .catch((err: any) => {
        console.log("Error occurred when executing logout.: " + err);
      });
  };

  return (
    <nav className="fixed top-lg lg:py-[4rem] right-2">
      <div>
        {!showProfile && (
          <PermIdentityIcon
            type="button"
            className="h-8 w-8 var(--ash-black) cursor-pointer mr-4"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={profileHandler}
          />
        )}
        {showProfile && (
          <div className="flex items-center">
            <PermIdentityIcon
              onClick={profileHandler}
              className="mr-4 var(--ash-black) cursor-pointer"
            ></PermIdentityIcon>
            {/* <PaymentIcon 
              onClick={() => router.push(`${PG.PAY}/${user.id}`)}
              className="mr-4 text-black dark:text-white cursor-pointer"
            /> */}
            {token && (
              <LogoutIcon
                onClick={logoutHandler}
                className="h-8 w-8 var(--ash-black) cursor-pointer"
              >
                <span className="sr-only">Logout</span>
              </LogoutIcon>
              
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
