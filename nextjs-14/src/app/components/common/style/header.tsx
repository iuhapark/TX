import { styled } from "@mui/material";

export const ODD_OPACITY = 0.2;

export const Home = styled('div')(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginRight: '30px',
  paddingTop: '16px',
}));

export const AppBar = styled('div')(({ theme }) => ({
  position: "static",
  backgroundColor: 'black',
  fontSize: '1rem',
  color: 'white',
}));

export const Setting = styled('div')(({ theme }) => ({
  color: 'black',
}));
