import { useEffect, useState } from "react"
import StorageUtil from "../../common/utils/storage"
import STORAGE_KEYS from "../../common/constants/storage_keys"
import ProductCard from "../product_card/product_card"
import { Button, ButtonGroup, Grid } from "@mui/material"
import './home.scss'

const Home = (props) => {
    let { userDetailsSlice, homeDetailsSlice } = props || {}
    let { userDetails } = userDetailsSlice || {}
    let { products , categories  } = homeDetailsSlice || {}
    let [selectedCategory, setSelectedCategory] = useState()
    let [isAdmin,setIsAdmin] = useState()
    useEffect(() => {
        if (!userDetails) {
            props.getUserDetails(StorageUtil.localStorage.get(STORAGE_KEYS.USER_ID))
        }
        if(!isAdmin && userDetails!=null){
            setIsAdmin(userDetails.roles.filter(role=>role.name == "ADMIN").length > 0)
        }
    }, [userDetails])



    useEffect(()=>{
        props.getProducts();
        props.getCategories();
    },[])


    useEffect(() => {
        if(!products){
            props.getProducts()
        }
        if(!categories){
            props.getCategories();
        }
    }, [])

  

    return <div className="home">
        <ButtonGroup variant="outlined" size="large" aria-label="outlined primary button group">
            {
                ["ALL", ...categories].map((c,index) => <Button  key={index} onClick={() => setSelectedCategory(c)}>{c}</Button>)
            }
        </ButtonGroup>
        <div className="grid">
            <Grid container spacing={2}>
                {
                    ([...products]).map(function (p) {
                        let { id, category } = p || {}
                        return (selectedCategory && selectedCategory == category) ? <Grid key={"grid-"+id} item xs={4}>
                            <ProductCard props={p} isEditable={isAdmin} onDelete={()=>{
                                props.deleteProduct(id)}} /></Grid> : 
                        (!selectedCategory || selectedCategory == 'ALL') ? <Grid key={"grid-"+id}  item xs={4}>
                            <ProductCard props={p} isEditable={isAdmin} onDelete={()=>props.deleteProduct(id)}/></Grid> 
                        : <div key={id}></div>
                    })
                }
            </Grid>
        </div>

    </div>
}

export default Home