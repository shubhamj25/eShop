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
import { CircularProgress, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const steps = ['Items', 'Select Address', 'Confirm Order'];

export default function Checkout(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const { checkoutSlice } = props || {}
    const { addresses, product, quantity, orderPlacedSuccessfully, error } = checkoutSlice || {}
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
        return <div className="product-details">
            <img
                src={imageUrl}
                alt={name}
                height={140}
            />
            <div className="product-name">{name}</div>
            <p>Rs.{price * quantity}</p>
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
            props.getAddresses()
        }

        return <Container>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Address</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={selectedAddress}
                    onChange={handleChange}
                    autoWidth
                    label="Address"
                >   <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {[...(addresses ?? [])].map((a, index) => <MenuItem key={a['id']} value={index} ><h5>{a.name + " " + a.street}</h5></MenuItem>)}
                </Select>
            </FormControl>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    </Box>
                </Box>
            </Container>
        </Container>
    }

    const _step3Component = () => {
        let { name, price, category, description } = product || {}

        return <div className='order-summary'>
            <h3>{name}</h3>
            <h5>Quantity : {quantity}</h5>
            <h5>Category : {category}</h5>
            <h5>{description}</h5>
            <h4>Total Price : Rs.{price * quantity}</h4>
        </div>
    }

    React.useEffect(() => {
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
    }, [orderPlacedSuccessfully])
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
        <Box sx={{ width: '100%' }}>
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
                    <CircularProgress sx={{ ml: 24, mt: 24 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
    );
}
