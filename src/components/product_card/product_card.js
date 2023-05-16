import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../common/constants/routes';
import { Delete, Edit } from '@mui/icons-material';
import { Container } from '@mui/material';

export default function ProductCard({ props, isEditable, onDelete }) {
    let { id, name, description, category, price, manufacturer, availableItems, imageUrl } = props || {}
    const navigate = useNavigate()
    return (
        <Card key={id} sx={{ maxWidth: 345 }}>
            <img
                src={imageUrl}
                alt={name}
                className='center'
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Rs.{price}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small" variant='contained' fullWidth onClick={() => {
                    navigate(ROUTES.PRODUCT.replace(':id', id))
                }} >BUY</Button>
                {isEditable ? <Container sx={{ width: 'min-content', display: 'flex' }}>
                    <Edit sx={{ paddingRight: '12px', cursor: 'pointer' }} onClick={()=>navigate(ROUTES.ADD_PRODUCT.replace(':id',id))} />
                    <Delete sx={{ cursor: 'pointer' }} onClick={onDelete} />
                </Container> : <></>}
            </CardActions>
        </Card>
    );
}