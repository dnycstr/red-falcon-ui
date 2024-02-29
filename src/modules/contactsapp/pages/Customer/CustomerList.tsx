/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { PrimaryModal } from "../../../../core/components/Modal"

import {
    Pagination,
    Table,
    TableContainer,
    TableDataCenter,
    TableDataLeft,
    TableDataRight,
    TableHeaderCenter,
    TableHeaderLeft,
    TableHeaderRight,
    TableSearchHead,
} from '@components/Table';
import { CustomerCreate } from "./CustomerCreate";


export const CustomerList: React.FC = () => {
    return (
        <>
            <PrimaryModal modal_name="Add">
                <CustomerCreate />
            </PrimaryModal>
            <TableContainer>
                <Table>
                    <thead className="bg-white">
                        <tr>
                            <TableHeaderLeft>Customer ID</TableHeaderLeft>
                            <TableHeaderCenter>Customer Name</TableHeaderCenter>
                        </tr>
                    </thead>
                </Table>
            </TableContainer>
        </>

    )

}