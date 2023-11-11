import { Box } from '@mui/material';
import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ValuationMeter (props) {
    const { currentValue, fairValue } = props;

    if (Number(fairValue) >= Number(currentValue)) {
        const now = 100 * currentValue / fairValue;
        const remain = 100 - now;

        return (
            <Box
                style={{
                    width: '100%',
                    margin: '3px',
                    height: '30px'
                }}
            >
                <ProgressBar
                    style={{
                        height: '100%'
                    }}
                >
                    <ProgressBar
                        style={{
                            backgroundColor: '#bababa'
                        }}
                        now={now}
                        key={1}
                    />
                    <ProgressBar
                        striped
                        style={{
                            backgroundColor: '#2a8c43'
                        }}
                        now={remain}
                        key={2}
                        label={`${Math.round(remain)}%`}
                    />
                </ProgressBar>
            </Box>
        );
    } else {
        const now = 100 * fairValue / currentValue;
        const remain = 100 - now;
        return (
            <Box
                style={{
                    width: '100%',
                    margin: '3px',
                    height: '30px'
                }}
            >
                <ProgressBar
                    style={{
                        height: '100%'
                    }}>
                    <ProgressBar
                        style={{
                            backgroundColor: '#bababa'
                        }}
                        now={now}
                        key={1}
                    />
                    <ProgressBar
                        style={{
                            backgroundColor: '#ba463d'
                        }}
                        striped
                        now={remain}
                        key={2}
                        label={`${Math.round(remain)}%`} />
                </ProgressBar>
            </Box>
        );
    }
}

export default ValuationMeter;
