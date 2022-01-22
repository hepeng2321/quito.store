import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Typography} from "@mui/material";

function Location() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: '#eee', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 5,
          mb: 5,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 3 }}>
          Nuestra ubicación
        </Typography>
        <div>
          <iframe width="700" height="440"
                  title={"myLocation"}
                  src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=Praga%2C%2095%2C%20Checoslovaquia%20E9-72%2C%20Quito+(quito)&amp;ie=UTF8&amp;t=&amp;z=9&amp;iwloc=B&amp;output=embed"
                  frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" />
        </div>
      </Container>
    </Box>
  );
}

export default Location;
