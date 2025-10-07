import { StoreData } from '../../constants/storage';
import { GetUserDetails } from '../../store/apis/user';

export const performSuccessfulLogin = async ({ response }) => {
  const userData = await GetUserDetails({
    token: response?.token,
  });
  const newUser = {
    token: response?.token,
    data: userData?.response,
  };
  await StoreData('user', newUser);
  return newUser;
};
