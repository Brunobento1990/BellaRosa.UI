import { useState } from 'react';
import { MobileStepper, Button, useTheme, Box, useMediaQuery } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { themeCores } from 'src/theme/colors';

export default function ({ promocoes }) {

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <Box
                component="img"
                sx={{
                    height: 350,
                    maxHeight: lgUp ? 350 : 200,
                    display: 'block',
                    overflow: 'hidden',
                    width: '100%',
                    borderRadius: 2,
                }}
                src={promocoes[activeStep]?.imgPath}
            />
            <MobileStepper
                variant="dots"
                steps={promocoes?.length}
                position="static"
                activeStep={activeStep}
                sx={{ flexGrow: 1 }}
                nextButton={
                    <Button size="small"
                        onClick={handleNext}
                        disabled={activeStep === promocoes?.length - 1}
                        style={{ color: themeCores.rosa }}
                    >
                        Próximo
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        style={{ color: themeCores.rosa }}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Voltar
                    </Button>
                }
            />
        </>
    )
}