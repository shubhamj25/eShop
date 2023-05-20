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
        <Card key={id} sx={{ maxWidth: '345px', borderRadius: '12px' }} elevation={2}>
            <img
                src={imageUrl}
                alt={name}
                style={{ maxHeight: '345px' }}
                className='center'
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                    {description}
                </Typography>
                <Typography variant="p" color="text.secondary" sx={{ mt: 2, fontSize: '18px', fontWeight: '600' }}>
                    Rs.{price}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small" variant='contained' sx={{ borderRadius: '8px', textTransform: 'none' }} fullWidth onClick={() => {
                    navigate(ROUTES.PRODUCT.replace(':id', id))
                }} >Buy</Button>
                {isEditable ? <Container sx={{ width: 'min-content', display: 'flex' }}>
                    <Edit sx={{ paddingRight: '12px', cursor: 'pointer' }} onClick={() => navigate(ROUTES.MODIFY_PRODUCT.replace(':id', id))} />
                    <Delete sx={{ cursor: 'pointer' }} onClick={onDelete} />
                </Container> : <></>}
            </CardActions>
        </Card >
    );
}