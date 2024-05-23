import { styled } from "@mui/material";

export const Button = styled('div')(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 'bold',
  marginRight: '20px',
  backgroundColor: 'white',
  color: 'black',
  cursor: 'pointer',
  textAlign: 'center',
  width: '80px', 
  padding: '8px',
  fontFamily: 'Arial, sans-serif',
  border: '2.4px solid black',
  borderRadius:'5px'
}));

export const Input = styled('div')(({ theme }) => ({
  color: 'gray',
  border: 'none',
  borderBottom: '1px solid black',
  height: '25px',
  width: '300px',
  fontSize: '15px'
}));