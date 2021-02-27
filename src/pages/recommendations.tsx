import React, { useContext, useEffect } from 'react';
import { Grid, Card, H1 } from 'theme';
import { Link, AppContext, Loader, RecommendationForm } from 'components';
import { WsMessageTypes } from 'types';

const Recommendations = () => {
  return (
    <>
      <H1 fontSize={22} bold pb={16}>
        Recommendations
      </H1>
      <RecommendationForm />
    </>
  );
};

export default Recommendations;
