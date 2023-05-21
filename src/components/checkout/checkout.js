import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router';
import StorageUtil from '../../common/utils/storage';
import STORAGE_KEYS from '../../common/constants/storage_keys';
import { SnackbarTypes } from '../snackbar';
import { useCommonComponents } from '../../common/providers/common_components_provider';
import { Card, CircularProgress, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, Skeleton, TextField } from '@mui/material';
import PrimarySearchAppBar from '../app_bar/app_bar';
import './checkout.scss'

const steps = ['Items', 'Select Address', 'Confirm Order'];

export default function Checkout(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const { checkoutSlice } = props || {}
    const { addresses, product, quantity, orderPlacedSuccessfully, error } = checkoutSlice || {}
    const [initialCount, setAddressCount] = React.useState()
    const [childComponents, setChildren] = React.useState([])
    const { showSnackbar } = useCommonComponents()


    let params = useParams()
    const productId = params['id']
    const qty = Number.parseInt(params['qty'])


    const isStepOptional = (step) => {
        return step === -1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };


    const [selectedAddress, setSelectedAddress] = React.useState('');


    const _step1Component = () => {
        let { id, name, description, category, price, manufacturer, availableItems, imageUrl } = product || {}
        return <div className="product-detail">
            <img
                src={imageUrl}
                alt={name}
                height={140}
            />
            <div className='details'>
                <div className="product-name">{name}</div>
                <div className="product-category">Category : <b>{category}</b></div>
                <div className="product-description">{description}</div>
                <h2>Rs.{price * quantity}</h2>
            </div>

        </div>
    }

    const _step2Component = () => {

        const handleChange = (event) => {
            event.preventDefault()
            setSelectedAddress(event.target.value)
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const address = {
                name: data.get('name'),
                contactNumber: data.get('contact'),
                city: data.get('city'),
                street: data.get('street'),
                state: data.get('state'),
                landmark: data.get('landmark'),
                zipcode: data.get('zipcode'),
                user: StorageUtil.localStorage.get(STORAGE_KEYS.USER_ID)
            };
            props.addAddress(address)
        }

        return <Container>
            {(addresses ?? []).length > 0 ? <FormControl sx={{ width: '100%', mt: 4 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Address</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={selectedAddress}
                    onChange={handleChange}
                    fullWidth
                    sx={{ fontWeight: '500' }}
                    label="Address"
                >   <MenuItem value="">
                        None
                    </MenuItem>
                    {[...(addresses ?? [])].map((a, index) => <MenuItem key={a['id']} value={index} ><p>{a.street}<br />{a.city + ", " + a.state + "-" + a.zipcode}</p></MenuItem>)}
                </Select>
            </FormControl> : <Typography variant="h1"><Skeleton /></Typography>}
            <Container component="main" maxWidth="xm">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {selectedAddress === '' ? <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <h3 style={{ display: 'flex', justifyContent: 'center' }}>Add Address</h3>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="contact"
                                    label="Contact Number"
                                    name="contact"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="street"
                                    label="Street"
                                    name="street"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="city"
                                    label="City"
                                    id="city"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="state"
                                    label="State"
                                    type="state"
                                    id="state"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="landmark"
                                    label="Landmark"
                                    id="landmark"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="zipcode"
                                    label="Zipcode"
                                    id="zipcode"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save Address
                        </Button>
                    </Box> : ''}
                </Box>
            </Container>
        </Container>
    }

    const _step3Component = () => {
        let { name, price, category, description, imageUrl } = product || {}
        let { name: addressName, street, city, state, landmark, zipcode } = addresses && selectedAddress !== '' ? addresses[selectedAddress] : {}
        return <Card elevation={3} sx={{ borderRadius: '12px' }}>
            <Grid container spacing={2} sx={{ width: '100%' }}>
                <Grid item xs={6}>
                    <div className='product-summary'>
                        <img
                            src={imageUrl}
                            alt={name}
                            height={50}
                        />
                        <div className='details'>
                            <div className='product-name'>{name}</div>
                            <div className='product-quantity'>Quantity : {quantity}</div>
                            <div className='product-category'>Category : {category}</div>
                            <div className='product-description'> {description}</div>
                            <div className='product-price'>Total Price : Rs.{price * quantity}</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className='address-details'>
                        <div className='title'>Address Details:</div>
                        <div className='name'>{addressName}</div>
                        <div className='address'>
                            <div className='street'>{`${street}, ${city}, ${state}-${zipcode}`}</div>
                            <div className='landmark'>{landmark}</div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Card>

    }

    React.useEffect(() => {
        if (addresses) {
            if (!initialCount) {
                setAddressCount(addresses.length)
            }
            else if (addresses.length > initialCount) {
                showSnackbar({
                    children: <h4>Address added successfully !</h4>,
                    type: SnackbarTypes.success
                })
                setAddressCount(addresses.length)
            }
        }
        if (!product || productId != product.id) {
            props.setProduct(productId)
        }
        if (!quantity || qty != quantity) {
            props.setProductQuantity(qty)
        }
        if (!addresses) {
            props.getAddresses()
        }
        setChildren([
            _step1Component(),
            _step2Component(),
            _step3Component()
        ])
    }, [checkoutSlice, selectedAddress])

    const handleNext = () => {
        let newSkipped = skipped;
        if (activeStep == 1 && (selectedAddress === null || selectedAddress === '')) {
            console.log(selectedAddress)
            showSnackbar({
                children: <h4>Please select an address !</h4>,
                type: SnackbarTypes.error,
            })
            return
        }
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        if (activeStep === steps.length - 1) {
            props.placeOrder({
                quantity: quantity,
                user: StorageUtil.localStorage.get(STORAGE_KEYS.USER_ID),
                product: productId,
                address: addresses[selectedAddress].id
            })
        }
    };

    let navigate = useNavigate()
    React.useEffect(() => {
        if (orderPlacedSuccessfully == true) {
            showSnackbar({
                children: <h4>Order placed successfully!</h4>,
                type: SnackbarTypes.success,
            })
            navigate('/')
        }
        else if (error) {
            showSnackbar({
                children: <h4>{error}</h4>,
                type: SnackbarTypes.error,
            })
        }
    }, [orderPlacedSuccessfully, selectedAddress])
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div >
            <PrimarySearchAppBar />
            <div className='checkout'>
                <Box>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 4 }}>
                                <CircularProgress size={24} sx={{ ml: '8px' }} />
                                <div style={{ marginLeft: '20px' }}>Please wait while we confirm your order !</div>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Retry</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <div>
                            <Container sx={{ mt: 2, mb: 1 }}>{childComponents[activeStep]}</Container>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}

                                <Button variant='contained' onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                                </Button>
                            </Box>
                        </div>
                    )}
                </Box>
            </div>

        </div>

    );
}
