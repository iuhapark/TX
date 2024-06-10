import { Link, Typography } from '@mui/material'
import { GridColDef } from "@mui/x-data-grid";
import { ProductColumn } from '../model/product-column'
import { PG } from "../../common/enums/PG"
import {MyTypography} from '../../common/style/cell'

interface CellType{
    row : ProductColumn
}

export default function ProductColumns (): GridColDef[] {
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
            field: 'name',
            headerName: 'Name',
            renderCell: ({row}:CellType) => 
            <Typography textAlign="center" sx={{fontSize:"1.2rem"}}><Link href={`${PG.ITEM}/detail/${row.id}`} > 
            {row.item_name}
           </Link>
           </Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'duration',
            headerName: 'Duration',
            renderCell: ({row}:CellType) => MyTypography(row.duration, "1.2rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'price',
            headerName: 'Price',
            renderCell: ({row}:CellType) => MyTypography(row.price, "1.2rem")
        }
    ]
}