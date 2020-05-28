import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

import {deleteProduct, getProductEdit, getProductSuccess, putEditProduct} from "../../store/actions/productsActions";
import FormElement from "../../components/UI/Form/FormElement";
import Modal from "../../components/UI/Modal/Modal";
import {wordList} from "../../wordList";



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
    },
    gridItem: {
        margin: '0 auto',
        marginTop: '5%'
    }
}));

const EditProduct = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const error = useSelector(state => state.products.error);
    const editProduct = useSelector(state => state.products.editProduct);
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getProductEdit(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const fileChangeHandler = e => dispatch(getProductSuccess({...editProduct, [e.target.name]: e.target.files[0]}));
    const changeHandler = e => (dispatch(getProductSuccess({...editProduct, [e.target.name]: e.target.value})));
    const checkboxChangeHandler = () => (dispatch(getProductSuccess({...editProduct, isRefrigeratorRequired: !editProduct.isRefrigeratorRequired})));

    const removeProduct = async () => {
        await dispatch(deleteProduct(props.match.params.id))
    };

    const onSubmit = e => {
        e.preventDefault();
        handleOpenAndClose();
        const formData = new FormData();
        Object.keys(editProduct).forEach(key => {
            formData.append(key, editProduct[key])
        });
        dispatch(putEditProduct(props.match.params.id, formData))
    };

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenAndClose = () => (setOpen(!open));
    const handleOpenEdit = ()=>(setOpenEdit(!openEdit));

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            {wordList[language].editProduct.editProductTitle}
                        </Typography>
                    </Box>
                    <form>
                        {editProduct && <Grid container direction='column' spacing={1}>
                            <FormElement
                                propertyName={'name'}
                                title={wordList[language].editProduct.inputTitle}
                                onChange={changeHandler}
                                value={editProduct.name}
                            />
                            <span style={{padding: '10px 0 20px', fontSize: '20px'}} >
                                <b>На складе есть: </b> {editProduct.amount}
                            </span>
                            <FormElement
                                type='number'
                                propertyName={'addProduct'}
                                title={wordList[language].editProduct.inputQty}
                                onChange={changeHandler}
                                value={editProduct.addProduct}
                            />
                            <FormElement
                                propertyName={'price'}
                                title={wordList[language].editProduct.inputPrice}
                                onChange={changeHandler}
                                value={editProduct.price}
                            />
                            <FormElement
                                propertyName={'isRefrigeratorRequired'}
                                title={wordList[language].editProduct.inputRefrigerator}
                                onChange={checkboxChangeHandler}
                                value={editProduct.isRefrigeratorRequired}
                                type="checkbox"
                            />
                            <FormElement
                                propertyName='file'
                                title={wordList[language].editProduct.inputImg}
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
                                        {wordList[language].editProduct.editProductBtn}
                                    </Button>
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='secondary'
                                        onClick={handleOpenAndClose}
                                        aria-label="delete"
                                    >
                                        {wordList[language].editProduct.deleteProductBtn}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>}
                    </form>
                </Box>
            </Grid>
            <Modal onClose={handleOpenAndClose} open={open} title={wordList[language].editProduct.modalDeleteTitle}>
                {error && <Box mb={1}>
                    <Alert severity="error">{error}</Alert>
                </Box>}
                <Grid container justify='flex-end' spacing={1}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenAndClose}
                        >{wordList[language].editProduct.modalBtnNeg}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={removeProduct}
                            id='yes'
                        >{wordList[language].editProduct.modalBtnPos}</Button>
                    </Grid>
                </Grid>
            </Modal>
            <Modal onClose={handleOpenEdit} open={openEdit} title={wordList[language].editProduct.modalEditTitle}>
                {error && <Box mb={1}>
                    <Alert severity="error">{error}</Alert>
                </Box>}
                <Grid container justify='flex-end' spacing={1}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenEdit}
                        >{wordList[language].editProduct.modalBtnNeg}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onSubmit}
                            id='yes'
                        >{wordList[language].editProduct.modalBtnPos}</Button>
                    </Grid>
                </Grid>
            </Modal>
        </Container>
    );
};

export default EditProduct;