import { useEffect, useState } from "react"
import StorageUtil from "../../common/utils/storage"
import STORAGE_KEYS from "../../common/constants/storage_keys"
import ProductCard from "../product_card/product_card"
import { Box, Button, ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import './home.scss'
import PrimarySearchAppBar from "../app_bar/app_bar"

const Home = (props) => {
    let { userDetailsSlice, homeDetailsSlice } = props || {}
    let { userDetails } = userDetailsSlice || {}
    let { products, categories } = homeDetailsSlice || {}
    let [selectedCategory, setSelectedCategory] = useState("ALL")
    let [isAdmin, setIsAdmin] = useState()
    useEffect(() => {
        if (!userDetails) {
            props.getUserDetails(StorageUtil.localStorage.get(STORAGE_KEYS.USER_ID))
        }
        if (!isAdmin && userDetails != null) {
            setIsAdmin(userDetails.roles.filter(role => role.name == "ADMIN").length > 0)
        }
    }, [userDetails])
    const [filters, setFilters] = useState({
        keyword: '',
        value: ''
    });

    const handleSortProductsDropdown = (event) => {
        setFilters({ ...filters, value: event.target.value })
    }

    const SortProductsDropdown = () => {

        return (
            <Box sx={{ minWidth: 120, mt: 4, mb: 4 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filters.value}
                        label="Sort By"
                        onChange={handleSortProductsDropdown}
                    >
                        <MenuItem value={0}>Price: High to Low</MenuItem>
                        <MenuItem value={1}>Price: Low to High</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }



    useEffect(() => {
        props.getProducts();
        props.getCategories();
    }, [])


    useEffect(() => {
        if (!products) {
            props.getProducts()
        }
        if (!categories) {
            props.getCategories();
        }
    }, [])

    useEffect(() => {
        if (products) {
            props.filterProducts(filters)
        }

    }, [filters])

    return <>
        <PrimarySearchAppBar isAdmin={isAdmin} updateFilters={props.filterProducts} filters={filters} setFilters={setFilters} />
        <div className="home">
            <ButtonGroup variant="outlined" size="large" aria-label="outlined primary button group">
                {
                    ["ALL", ...categories].map((c, index) => <Button key={index} variant={c == selectedCategory ? 'contained' : 'outlined'} onClick={() => setSelectedCategory(c)}>{c}</Button>)
                }
            </ButtonGroup>
            <SortProductsDropdown />
            <div className="grid">
                <Grid container spacing={2}>
                    {
                        ([...(products ?? [])]).map(function (p) {
                            let { id, category } = p || {}
                            return (selectedCategory && selectedCategory == category) ? <Grid key={"grid-" + id} item xs={4}>
                                <ProductCard props={p} isEditable={isAdmin} onDelete={() => {
                                    props.deleteProduct(id)
                                }} /></Grid> :
                                (!selectedCategory || selectedCategory == 'ALL') ? <Grid key={"grid-" + id} item xs={4}>
                                    <ProductCard props={p} isEditable={isAdmin} onDelete={() => props.deleteProduct(id)} /></Grid>
                                    : <div key={id}></div>
                        })
                    }
                </Grid>
            </div>

        </div>
    </>

}

export default Home