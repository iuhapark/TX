import { Link, Typography } from '@mui/material'
import { GridRowId, GridColDef } from '@mui/x-data-grid'
import { UserColumn } from '../model/user-column'
import { PG } from "../../common/enums/PG"
import {MyTypography} from '../../common/style/cell'

interface CellType{
    row : UserColumn
}

export default function UserColumns(): GridColDef[] {
    return([
        {
            flex : 0.04,
            minWidth : 30,
            sortable : false,
            field : 'id',
            headerName : 'No.',
            renderCell : ({row} : CellType) => MyTypography(row.id, "1.2rem")
            
        },
        {
            flex : 0.04,
            minWidth : 30,
            sortable : false,
            field : 'username',
            headerName : 'Username',
            renderCell : ({row} : CellType) =>
            <Typography textAlign="center" sx={{fontSize:"1.2rem"}}><Link href={`${PG.USER}/detail/${row.id}`} > 
             {row.username}
            </Link>
            </Typography>
        },
        {
            flex : 0.04,
            minWidth : 30,
            sortable : false,
            field : 'password',
            headerName : 'Password',
            renderCell : ({row} : CellType) => MyTypography(row.password, "1.2rem")
        },
        {
            flex : 0.04,
            minWidth : 30,
            sortable : false,
            field : 'email',
            headerName : 'Email',
            renderCell : ({row} : CellType) => MyTypography(row.email, "1.2rem")
        },
        {
            flex : 0.04,
            minWidth : 30,
            sortable : false,
            field : 'name',
            headerName : 'Name',
            renderCell : ({row} : CellType) => MyTypography(row.name, "1.2rem")
        },
        {
            flex : 0.04,
            minWidth : 30,
            sortable : false,
            field : 'phone',
            headerName : 'Phone',
            renderCell : ({row} : CellType) => MyTypography(row.phone, "1.2rem")
        },
        {
            flex : 0.04,
            minWidth : 30,
            sortable : false,
            field : 'job',
            headerName : 'Job',
            renderCell : ({row} : CellType) => MyTypography(row.job, "1.2rem")
        }

    ])
}