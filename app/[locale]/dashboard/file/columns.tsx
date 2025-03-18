'use client'

import { TFile } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { ActionCell, CreatedAtCell, StatusCell } from "./_components/columns-cells";
import { formatFileSize } from "@/lib/file-helpers";


export const columns : ColumnDef<TFile>[] = [
    {
        accessorKey: "filename",
        header: "filename",
    },
    {
        accessorKey: "type",
        header: "type",
    },
    {
        accessorKey: "size",
        header: "size",
        cell({row}) {
            const file = row.original;
            return <div className='max-w-32 text-xs lg:text-sm lg:max-w-5/6 truncate'>{formatFileSize(file.size)}</div>
        }
    },
    {
        accessorKey: "status",
        header: "status",
        cell({row}) {
            const file = row.original;
            return <StatusCell file={file} />
        }
    },
    {
        accessorKey: "createdAt",
        header: "createdAt",
        cell({row}){
            const file = row.original;
            return <CreatedAtCell file={file} />
        }
    },
    {
        accessorKey: "action",
        header: "action",
        cell({row}) {
            const file = row.original;
            return <ActionCell file={file} />
        }
    },
]