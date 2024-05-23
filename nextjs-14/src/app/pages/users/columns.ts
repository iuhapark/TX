import { GridColDef } from "@mui/x-data-grid";


export default function MuiDemoColumns(): GridColDef[] {
        return [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'username',
          headerName: 'Username',
          width: 150,
          editable: true,
        },
        {
          field: 'password',
          headerName: 'Password',
          width: 150,
          editable: true,
        },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          editable: true,
        },
        {
          field: 'phone',
          headerName: 'phone',
          width: 150,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: true,
        },
      ]

}