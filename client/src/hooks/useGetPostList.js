import axios from 'axios';
import { useState, useEffect } from 'react';
// import { postListDummy } from '../constants/dummyData';

/**
 *
 * @param {string} category
 * @param {string} page
 * @returns {postList[], postPageInfo{}, boolean, boolean}
 */
const useGetPostList = (category, page) => {
  const [postList, setPostList] = useState([]);
  const [postPageInfo, setPostPageInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const URL = `categories/${category}/series?page=${page}&size=10`;
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(URL)
      .then(res => {
        const { data, pageInfo } = res.data;
        setPostList(data);
        setPostPageInfo(pageInfo);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setIsLoadingError(true);
      });
  }, [category, page]);

  return { postList, postPageInfo, isLoading, isLoadingError };
};

export default useGetPostList;
