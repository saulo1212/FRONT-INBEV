import PropTypes from 'prop-types';
import { unixToDate } from 'src/utils/format-time';

import { Typography } from '@mui/material';

export default function PopUpCard({ gpsData, vehiclePlate, communicationUnix, nameClient }) {
  const firstLetterUpperCase = (value) => value[0].toUpperCase() + value.substring(1);

  return (
    <div style={{ width: '300px' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {vehiclePlate}
      </Typography>

      <div>
        <Typography sx={{ fontWeight: 'bold', marginBottom: '5px !important' }}>
          Ultima Comunicação / GPS:
        </Typography>

        <p style={{ marginTop: '2px' }}>{`${unixToDate(
          gpsData.unixTimestamp,
          'dd/MM/yyyy HH:mm:ss',
        )} / ${unixToDate(communicationUnix, 'dd/MM/yyyy HH:mm:ss')}`}</p>
      </div>

      <div>
        <Typography sx={{ fontWeight: 'bold', marginBottom: '5px !important' }}>
          Localização:
        </Typography>

        <p style={{ marginTop: '2px' }}>{firstLetterUpperCase(gpsData.address)}</p>
      </div>

      <div>
        <Typography sx={{ fontWeight: 'bold', marginBottom: '5px !important' }}>
          Cliente:
        </Typography>

        <p style={{ marginTop: '2px' }}>{nameClient}</p>
      </div>
    </div>
  );
}

PopUpCard.propTypes = {
  gpsData: PropTypes.object,
  nameClient: PropTypes.string,
  vehiclePlate: PropTypes.string,
  communicationUnix: PropTypes.number,
};
