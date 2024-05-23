import { styled } from "@mui/material";

export const Context = (data:any, size:string) => <div style={{marginLeft: "20px", textAlign: "start"}} >  {data}</div>

export const Container = styled('div')(({ theme }) => ({
    margin: '20px',
    width: 'auto',
    color: 'black'
  }));

export const Content = styled('div')(({ theme }) => ({
    margin: '60px',
    width: 'auto',
    color: 'black',
    textDecorationColor: 'black',
    textDecorationLine: 'none',
    justifyContent: 'center'
  }));