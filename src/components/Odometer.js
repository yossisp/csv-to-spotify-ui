import dynamic from 'next/dynamic';

/**
 * Odometer component.
 */
const Odometer = dynamic(import('react-odometerjs'), {
  ssr: false,
});

export default Odometer;
