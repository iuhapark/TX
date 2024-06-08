import { Link, Typography } from '@mui/material'
import { GridColDef } from "@mui/x-data-grid";
import { PostColumn } from '../model/post-column'
import { PG } from "../../common/enums/PG"
import {MyTypography} from '../../common/style/cell'

interface CellType{
    row : PostColumn
}

export default function PostColumns (): GridColDef[] {
    return[
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id',
            headerName: 'No.',
            renderCell : ({row} : CellType) => MyTypography(row.id, "1.2rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'title',
            headerName: 'Title',
            renderCell: ({row}:CellType) => 
            <Typography textAlign="center" sx={{fontSize:"1.2rem"}}><Link href={`${PG.POST}/detail/${row.id}`} > 
            {row.title}
           </Link>
           </Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'content',
            headerName: 'Content',
            renderCell: ({row}:CellType) => MyTypography(row.content, "1.2rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'regDate',
            headerName: 'Register Date',
            renderCell: ({row}:CellType) => MyTypography(row.regDate, "1.2rem")
        },
                {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'modDate',
            headerName: 'Modify Date',
            renderCell: ({row}:CellType) => MyTypography(row.modDate, "1.2rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'delete',
            headerName: '삭제',
            renderCell: ({ row }: CellType) => <Link href={""}> {<Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.id}</Typography>}</Link>
        }
    ]
}