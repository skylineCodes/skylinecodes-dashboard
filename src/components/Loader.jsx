import * as React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader = ({ style, color }) => {
    return (
        <Box sx={style}>
            <CircularProgress sx={{
                color
            }} />
        </Box>
    );
}

export default Loader;
