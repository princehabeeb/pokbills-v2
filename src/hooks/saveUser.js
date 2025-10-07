import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreData } from '../constants/storage';
import { GetUserDetails } from '../store/apis/user';
import { loginUser } from '../store/globalState';

const useSaveUser = () => {
  const { token } = useSelector((state) => state.globalState);
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    const response = await GetUserDetails({ token });

    if (response?.status !== 'success') {
      return;
    }

    const newUser = {
      token,
      data: response?.response,
    };

    await StoreData('user', newUser);
    dispatch(loginUser(newUser));
  };

  return { getUserInfo };
};

export default useSaveUser;
