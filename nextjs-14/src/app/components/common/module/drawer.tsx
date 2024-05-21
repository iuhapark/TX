import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import { PG } from "@/app/components/common/enums/PG";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { MenuBar } from "@/app/atoms/toggle/MenuBar";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = parseCookies().accessToken;

    const processToken = () => {
      if (!token) {
        console.log("Token is missing");
        return null;
      }

      let decoded: any;
      try {
        decoded = jwtDecode(token);
        console.log("User id in Profile:", decoded.id);
        return decoded.id;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    };

    const userIdFromToken = processToken();
    if (userIdFromToken) {
      setUserId(userIdFromToken);
    }
  }, []);

  if (open) {
    document.body.style.paddingLeft = "220px";
    document.body.style.transition = "padding-left 0.3s";
  } else {
    document.body.style.paddingLeft = "0";
  }

  const paymentUrl = userId ? `${PG.PAY}/${userId}` : `${PG.PAY}/undefined`;
  const itemUrl = userId ? `${PG.ITEM}/${userId}` : `${PG.ITEM}/undefined`;

  return (
    <div>
      <MenuBar bar={() => setOpen(!open)} />
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          onBackdropClick: toggleDrawer(false),
          style: { zIndex: 10 },
        }}
      >
        <Box
          sx={{
            width: 220,
            height: "100%",
            backgroundColor: "var(--background)",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <div className="p-6 mt-10 text-xl">
              <li className="m-2">
                <a href={paymentUrl}>결제</a>
              </li>
              <li className="m-2">
                <a href={itemUrl}>상품</a>
              </li>
            </div>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
