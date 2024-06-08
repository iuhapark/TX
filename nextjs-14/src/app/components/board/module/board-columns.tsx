import { Link, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { BoardColumn } from '../model/board-column'
import { PG } from '../../common/enums/PG'

interface CellType {
    row: BoardColumn
}

export default function BoardColumns(): GridColDef[] {
    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id',
            headerName: 'No.',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.id}</Typography>
        }
        ,
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'title',
            headerName: 'Title',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>
                <Link href={`${PG.BOARD}/detail/${row.id}`} > {row.title}</Link>
            </Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'description',
            headerName: 'Description',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.description}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'regDate',
            headerName: 'Register Date',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.id}</Typography>
        },
    ]
}