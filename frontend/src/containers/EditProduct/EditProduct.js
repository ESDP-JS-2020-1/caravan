import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteProduct, getProductEdit, getProductSuccess, putEditProduct} from "../../store/actions/productsActions";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import FormElement from "../../components/UI/Form/FormElement";
import Modal from "../../components/UI/Modal/Modal";


const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    formBtn: {
        marginTop: '1%',
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    formButton: {
        fontWeight: 'bold',
        width: '49%',
        minHeight: '50px'
    },
    typography: {
        color: '#0d47a1',
        textAlign: 'center',
    },
    typographyText: {
        borderBottom: '2px solid #0d47a1',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: '3%',
    },
    phoneInput: {
        width: '100%',
    }
}));

const EditProduct = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const error = useSelector(state => state.products.error);
    const editProduct = useSelector(state => state.products.editProduct);

    const [comment, setComment] = React.useState('');

    useEffect(() => {
        dispatch(getProductEdit(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const fileChangeHandler = e => dispatch(getProductSuccess({...editProduct, [e.target.name]: e.target.files[0]}));
    const changeHandler = e => (dispatch(getProductSuccess({...editProduct, [e.target.name]: e.target.value})));
    const checkboxChangeHandler = () => (dispatch(getProductSuccess({...editProduct, isRefrigeratorRequired: !editProduct.isRefrigeratorRequired})));
    const changeCommentInput = e => {
        setComment(e.target.value)
    };

    const removeProduct = async () => {
        const remove = {
            comment: comment
        };
        await dispatch(deleteProduct(props.match.params.id, remove))
    };

    const onSubmit = e => {
        e.preventDefault();
        handleOpenAndClose();
        const formData = new FormData();
        Object.keys(editProduct).forEach(key => {
            formData.append(key, editProduct[key])
        });
        formData.append('comment', comment);
        dispatch(putEditProduct(props.match.params.id, formData))
    };

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenAndClose = () => (setOpen(!open));
    const handleOpenEdit = ()=>(setOpenEdit(!openEdit));

    return (
        <Container>
            <Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            Редактирования продукта
                        </Typography>
                    </Box>
                    <form>
                        {editProduct && <Grid container direction='column' spacing={1}>
                            <FormElement
                                propertyName={'name'}
                                title={'Название'}
                                onChange={changeHandler}
                                value={editProduct.name}
                            />
                            <FormElement
                                propertyName={'amount'}
                                title={'Кол-во'}
                                onChange={changeHandler}
                                value={editProduct.amount}
                            />
                            <FormElement
                                propertyName={'price'}
                                title={'Цена'}
                                onChange={changeHandler}
                                value={editProduct.price}
                            />
                            <FormElement
                                propertyName={'isRefrigeratorRequired'}
                                title={'Необхадим ли холодильник для перевозки?'}
                                onChange={checkboxChangeHandler}
                                value={editProduct.isRefrigeratorRequired}
                                type="checkbox"
                            />
                            <FormElement
                                propertyName={'isRefrigeratorRequired'}
                                title={'Картинка'}
                                onChange={fileChangeHandler}
                                value={editProduct.avatar}
                                type="file"
                            />
                            {error && <Grid item>
                                <Alert severity='error'>{error}</Alert>
                            </Grid>}
                            <Grid item>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        onClick={handleOpenEdit}
                                        aria-label="Edit"
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        onClick={handleOpenAndClose}
                                        aria-label="delete"
                                    >
                                        Удалить
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>}
                    </form>
                </Box>
            </Grid>
            <Modal onClose={handleOpenAndClose} open={open} title="Вы уверены что хотите удалить этот продукт?">
                <FormElement
                    propertyName={'comment'}
                    title={'Комментарий'}
                    onChange={changeCommentInput}
                />
                {error && <Box mb={1}>
                    <Alert severity="error">{error}</Alert>
                </Box>}
                <Grid container justify='flex-end' spacing={1}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenAndClose}
                        >нет</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={removeProduct}
                            id='yes'
                        >да</Button>
                    </Grid>
                </Grid>
            </Modal>
            <Modal onClose={handleOpenEdit} open={openEdit} title="Вы уверены что хотите отредактировать этот продукт?">
                <FormElement
                    propertyName={'comment'}
                    title={'Комментарий'}
                    onChange={changeCommentInput}
                />
                {error && <Box mb={1}>
                    <Alert severity="error">{error}</Alert>
                </Box>}
                <Grid container justify='flex-end' spacing={1}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenEdit}
                        >нет</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onSubmit}
                            id='yes'
                        >да</Button>
                    </Grid>
                </Grid>
            </Modal>
        </Container>
    );
};

export default EditProduct;