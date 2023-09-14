import { client } from '../utils/fetchClient';

export const getDetailsByIdsArr = async <T>(
  itemIdArr: string[],
): Promise<T> => {
  const data = await client.post('/getProductsByIds/', { itemIds: itemIdArr });

  return data as T;
};

export const getRecommendations = async <T>(id: string, params: string) => {
  const data = await client.get(`/details/${id}/recommendations${params}`);

  return data as T;
};
