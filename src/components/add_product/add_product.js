import { useNavigate, useParams } from "react-router"
import StorageUtil from "../../common/utils/storage"
import STORAGE_KEYS from "../../common/constants/storage_keys"
import { useEffect, useState } from "react"
import CreatableSelect from 'react-select/creatable';
import { useCommonComponents } from "../../common/providers/common_components_provider";
import { SnackbarTypes } from "../snackbar";
import { Box, Button, Container, CssBaseline, Grid, TextField } from "@mui/material";
import './add-product.scss'
import { ROUTES } from "../../common/constants/routes";



const AddOrModifyProduct = (props) => {
    const params = useParams()
    const productId = params['id']
    const userId = StorageUtil.localStorage.get(STORAGE_KEYS.USER_ID)
    let { userDetailsSlice, productDetailSlice, homeDetailsSlice } = props || {}
    let { userDetails } = userDetailsSlice || {}
    let { product } = productDetailSlice || {}
    let { categories = [] } = homeDetailsSlice || {}
    let [isAdmin, setIsAdmin] = useState()
    let [category, setValue] = useState(product?.category)
    let [isLoading, setLoading] = useState(true)



    useEffect(() => {
        if (!userDetails) {
            props.getUserDetails(userId)
        }
        if (!isAdmin && userDetails != null) {
            setIsAdmin(userDetails.roles.filter(role => role.name == "ADMIN").length > 0)
        }
        props.getCategories();
    }, [userDetails])

    useEffect(() => {
        if (!productId) {
            setLoading(false)
        }
        else {
            if (productId && !product) {
                props.getProductById(productId)
            }
            else if (product != null && productId == product?.id) {
                setLoading(false)
            }
        }
    }, [product])

    const navigate = useNavigate()

    const { showSnackbar } = useCommonComponents();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const product = {
            name: data.get('name'),
            category: category.value,
            price: data.get('price'),
            description: data.get('description'),
            manufacturer: data.get('manufacturer'),
            availableItems: data.get('availableItems'),
            imageUrl: data.get('imageUrl')
        };
        if (productId) {
            props.updateProduct({ id: productId, ...product })
            showSnackbar({
                children: <h4>{"Product Modified Successfully!"}</h4>,
                type: SnackbarTypes.success,
            })
            navigate(ROUTES.HOME)
        }
        else {
            props.addProduct(product)
            showSnackbar({
                children: <h4>{"Product Added Successfully!"}</h4>,
                type: SnackbarTypes.success,
            })
            navigate(ROUTES.HOME)
        }
    }

    return <Container component="main" maxWidth="xs">
        <CssBaseline />
        {isLoading ? <h1>Loading...</h1> : <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h3>{productId ? "Modify Details" : "Add Product"}</h3>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ paddingBottom: '24px' }}>
                        <TextField
                            autoComplete="given-name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            defaultValue={product?.name}
                            autoFocus
                        />
                    </Grid>
                    <CreatableSelect isClearable required className="category-dropdown" options={categories.map(function (c) {
                        return {
                            value: c,
                            label: c
                        }
                    })} defaultValue={category} onChange={(newValue) => setValue(newValue)} />
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            name="price"
                            type="number"
                            defaultValue={product?.price}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            defaultValue={product?.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="manufacturer"
                            label="Manufacturer"
                            id="manufacturer"
                            defaultValue={product?.manufacturer}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="availableItems"
                            label="Available Items"
                            type="number"
                            id="availableItems"
                            defaultValue={product?.availableItems}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="imageUrl"
                            label="Image Url"
                            id="imageUrl"
                            defaultValue={product?.imageUrl}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save
                </Button>
            </Box>
        </Box>}
    </Container>

}

export default AddOrModifyProduct