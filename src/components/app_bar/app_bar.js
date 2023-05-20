import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingCart } from '@mui/icons-material';
import StorageUtil from '../../common/utils/storage';
import STORAGE_KEYS from '../../common/constants/storage_keys';
import { ROUTES } from '../../common/constants/routes';
import { useNavigate } from 'react-router';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar({ isAdmin, updateFilters, filters, setFilters }) {
    const userId = StorageUtil.localStorage.get(STORAGE_KEYS.USER_ID)
    const navigate = useNavigate()
    return (
        <Box >
            <AppBar position="static">
                <Toolbar>
                    <ShoppingCart sx={{ display: { md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Upgrad E-Shop
                    </Typography>
                    {updateFilters && setFilters ? <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => {
                                setFilters({ ...filters, keyword: e.target.value })
                                updateFilters({ ...filters, keyword: e.target.value })
                            }}
                        />
                    </Search> : <></>}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box >
                        {userId ? null : <>
                            <Button
                                size="large"
                                color="inherit"
                            >
                                <Typography variant="h6"
                                    noWrap
                                    component="a"
                                    href={ROUTES.SIGNIN}
                                    sx={{
                                        mr: 2,
                                        fontFamily: 'monospace',
                                        fontWeight: 500,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        textTransform: 'none'

                                    }}>Login</Typography>
                            </Button>
                            <Button
                                size="large"
                                color="inherit"
                            >
                                <Typography variant="h6"
                                    noWrap
                                    component="a"
                                    href={ROUTES.SIGNUP}
                                    sx={{
                                        mr: 2,
                                        fontFamily: 'monospace',
                                        fontWeight: 500,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        textTransform: 'none'

                                    }}>Sign Up</Typography>
                            </Button>
                        </>}
                        {userId ? <Button
                            size="large"
                            color="inherit"
                        >
                            <Typography variant="h6"
                                noWrap
                                component="a"
                                href={ROUTES.HOME}
                                sx={{
                                    mr: 2,
                                    fontFamily: 'monospace',
                                    fontWeight: 500,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    textTransform: 'none'

                                }}>Home</Typography>
                        </Button> : <></>}
                        {userId && isAdmin ? <Button
                            size="large"
                            color="inherit"
                        >
                            <Typography variant="h6"
                                noWrap
                                component="a"
                                href={ROUTES.ADD_PRODUCT.replace(':id', '')}
                                sx={{
                                    mr: 2,
                                    fontFamily: 'monospace',
                                    fontWeight: 500,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    textTransform: 'none'

                                }}>Add Product</Typography>
                        </Button> : <></>}
                        {userId ? <Button
                            size="large"
                            color="error"
                            variant="contained"
                            sx={{
                                background: 'red', textTransform: 'none'
                            }}
                            onClick={() => {
                                StorageUtil.localStorage.remove(STORAGE_KEYS.AUTH_TOKEN)
                                StorageUtil.localStorage.remove(STORAGE_KEYS.USER_ID)
                                navigate(ROUTES.LOGIN)
                            }}
                        >
                            <Typography variant="h6"
                                noWrap
                                component="a"
                                href={ROUTES.HOME}
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 500,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    textTransform: 'none'
                                }}>Logout</Typography>
                        </Button> : <></>}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}