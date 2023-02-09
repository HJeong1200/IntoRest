import axios from 'axios';
import { useState, useEffect } from 'react';
import { seriesListDummy } from '../constants/dummyData';
import getSeriesList from '../functions/getSeriesList';

/**
 *
 * @param {string} category
 * @param {number} page
 * @returns {seriesList[], seriesPageInfo{}, boolean, boolean}
 */
const useGetSeriesList = (category, page = 1) => {
  const [seriesList, setSeriesList] = useState([]);
  const [seriesPageInfo, setSeriesPageInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const URL = getSeriesList(category, page);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(URL)
      .then(res => {
        const { data, pageInfo } = res.data;
        setSeriesList(data);
        setSeriesPageInfo(pageInfo);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setIsLoadingError(true);
      })
      .finally(() => {
        setSeriesList(seriesListDummy.data);
        setSeriesPageInfo(seriesListDummy.pageInfo);
      });
  }, [category, page]);

  // 아직은 seriesList에 seriesListDummy의 값을 넣음
  return { seriesList, seriesPageInfo, isLoading, isLoadingError };
};

export default useGetSeriesList;
