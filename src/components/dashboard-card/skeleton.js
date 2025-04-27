import { Box, Card, Skeleton } from '@mui/material';

export function DashboardCardSkeleton() {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 3,
      }}
    >
      <Box>
        <Skeleton variant="rectangular" width={36} height={36} />
        <Skeleton variant="text" width={55} height={22} />
      </Box>

      <Box
        sx={{
          lineHeight: 0,
          display: 'flex',
          borderRadius: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Skeleton variant="circular" width={120} height={120} />
      </Box>
    </Card>
  );
}

export function AnalyticsPieSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ mb: 5, padding: '24px' }}>
        <Skeleton variant="text" width={150} height={32} />
      </Box>

      <Box
        sx={{
          lineHeight: 0,
          display: 'flex',
          borderRadius: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Skeleton variant="circular" width={265} height={265} />
      </Box>

      <Box
        sx={{
          bottom: 0,
          width: '100%',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          justifyContent: 'center',
          borderTop: 'dashed 1px rgba(145, 158, 171, 0.2)',
        }}
      >
        <Box sx={{ margin: '2px 8px', display: 'flex', alignItems: 'center' }}>
          <Skeleton variant="circular" width={12} height={12} sx={{ marginRight: '8px' }} />
          <Skeleton variant="text" width={70} height={28} />
        </Box>
        <Box sx={{ margin: '2px 8px', display: 'flex', alignItems: 'center' }}>
          <Skeleton variant="circular" width={12} height={12} sx={{ marginRight: '8px' }} />
          <Skeleton variant="text" width={70} height={28} />
        </Box>
      </Box>
    </Card>
  );
}
