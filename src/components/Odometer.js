import dynamic from 'next/dynamic';

const Odometer = dynamic(import('react-odometerjs'), {
  ssr: false,
});

export default Odometer;
