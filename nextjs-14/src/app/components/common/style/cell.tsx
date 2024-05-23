import { useTheme, Typography } from "@mui/material";

export const MyTypography = (data:any, size:string) =>{
const theme = useTheme();
const textColor = theme.palette.mode === 'dark' ? 'white' : 'white' ;

return (<Typography textAlign="center" sx={{fontSize: size, color: textColor}}>  {data}</Typography>)
}
