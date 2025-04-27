import PropTypes from 'prop-types';

import { Button, Grid } from '@mui/material';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

export default function ReportButtons({ handleGenerateFile }) {
  return (
    <Grid container spacing={1}>
      <Grid item md={6} xs={12}>
        <Button
          color="error"
          variant="contained"
          onClick={() => handleGenerateFile('PDF')}
          startIcon={<Iconify icon="bxs:file-pdf" />}
        >
          PDF
        </Button>
      </Grid>

      <Grid item md={6} xs={12}>
        <Button
          color="warning"
          variant="contained"
          sx={{ color: 'white' }}
          onClick={() => handleGenerateFile('EXCEL')}
          startIcon={<Iconify icon="uiw:file-excel" />}
        >
          EXCEL
        </Button>
      </Grid>
    </Grid>
  );
}

ReportButtons.propTypes = {
  handleGenerateFile: PropTypes.func,
};
