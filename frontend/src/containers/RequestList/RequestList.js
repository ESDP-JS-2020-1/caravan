import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRequests} from "../../store/actions/requestsActions";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import RequestListItem from "./RequestListItem";

const RequestList = () => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.requests.list);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(getRequests());
    }, [dispatch]);

    const requestsList = requests.map((elem) => (
        <RequestListItem
            key={elem._id}
            id={elem._id}
            user={elem.user}
            userRoleInfo={user.role}
            date={elem.date}
        />
    ));
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell> <b>Пользователь</b> </TableCell>
                            <TableCell> <b>Дата</b>         </TableCell>
                            <TableCell>                     </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requestsList}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default RequestList;