import PropTypes from 'prop-types';

import Label from 'src/components/label';

export default function TableLabels({ row, disableTheft = true }) {
  const hardware = row.bodyPosition.hardware ?? {};

  return (
    <div>
      <Label
        variant="filled"
        sx={{ marginLeft: '2px', marginRight: '2px', marginTop: '2px' }}
        color={hardware.ios && hardware.ios.ignition === 1 ? 'success' : 'error'}
      >
        Ignição
      </Label>

      <Label
        variant="filled"
        color={!hardware.sleepMode ? 'default' : 'success'}
        sx={{ marginLeft: '2px', marginRight: '2px', marginTop: '2px' }}
      >
        Sleep
      </Label>

      <Label
        variant="filled"
        color={hardware.extBatteryFailure === 0 ? 'default' : 'error'}
        sx={{ marginLeft: '2px', marginRight: '2px', marginTop: '2px' }}
      >
        Bateria
      </Label>

      {disableTheft && (
        <Label
          variant="filled"
          color={hardware.antiTheftAlarm === 0 ? 'default' : 'error'}
          sx={{ marginLeft: '2px', marginRight: '2px', marginTop: '2px' }}
        >
          Furto/Roubo
        </Label>
      )}
    </div>
  );
}

TableLabels.propTypes = {
  row: PropTypes.object,
  disableTheft: PropTypes.bool,
};
