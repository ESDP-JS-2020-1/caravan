// import React from 'react';
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import EditIcon from "@material-ui/icons/Edit";
// import CardActions from "@material-ui/core/CardActions";
// import {NavLink} from "react-router-dom";
// import Paper from "@material-ui/core/Paper";
//
// const ProductListItem = props => {
//     return (
//         <Paper elevation={3}>
//             <Card>
//                 <CardContent>
//                     <Typography variant='h4'>
//                         {props.title}
//                     </Typography>
//                     <Typography>
//                         {props.amount && <span><b>Количество: </b>{props.amount}</span>}
//                     </Typography>
//                     <Typography>
//                         {props.price && <span><b>цена: </b>{props.price}</span>}
//                     </Typography>
//                 </CardContent>
//                 <CardActions>
//                     <Button component={NavLink} to={'/product/edit/' + props.id} size="small">
//                         Edit
//                         <EditIcon/>
//                     </Button>
//                 </CardActions>
//             </Card>
//         </Paper>
//     );
// };
//
// export default ProductListItem;

import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import TableRow from "@material-ui/core/TableRow";

const UserListItem = props => {
    return (
        <TableRow>
            <TableCell> </TableCell>
            <TableCell>{props.title}</TableCell>
            <TableCell>{props.amount}</TableCell>
            <TableCell>{props.price}</TableCell>
            <TableCell>
                <IconButton
                    aria-label="edit"
                    component={NavLink}
                    to={`/product/edit/${props.id}`}
                    id={props.edit}
                    exact
                >
                    <EditIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default UserListItem;