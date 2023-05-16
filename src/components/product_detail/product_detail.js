import { useNavigate, useParams } from "react-router"
import ProductDetailActions from "./actions"
import { useEffect } from "react"
import { connect } from "react-redux"
import { Box, Button, Grid, TextField } from "@mui/material"
import { ROUTES } from "../../common/constants/routes"

const ProductDetail = (props) => {
    let {productDetailSlice} = props || {}
    let {product} = productDetailSlice || {}
    let { id, name, description, category, price, manufacturer, availableItems, imageUrl } = product || {}
    let params = useParams('id')
    let navigate = useNavigate()

    useEffect(()=>{
        if(product==null || params.id!=id){
            props.getProduct(params.id)
        }
    },[product])

    let handleSubmit = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        navigate(ROUTES.CHECKOUT.replace(':id',id).replace(':qty',data.get('quantity')))
    }

    return <div className="product-details">
        <img
            src={imageUrl}
            alt={name}
            height={140}
        />
        <div className="product-name">{name}</div>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid item xs={4}>
                <TextField
                    required
                    name="quantity"
                    label="Quantity"
                    type="number"
                    id="quantity"
                    sx={{ml:2}}
                />
            </Grid>
            <Button
                type="submit"
                
                variant="contained"
                sx={{ mt: 3, mb: 2,ml:2 }}
            >
                BUY
            </Button>
      
        </Box>
    </div>
}

export const mapStateToProps = state => {
    return {
      productDetailSlice: state.productDetailSlice,
    }
  }
  
  export const mapDispatchToProps = dispatch => {
    return {
      getProduct: (id) => {
        dispatch(ProductDetailActions.getProductById(id))
      },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)