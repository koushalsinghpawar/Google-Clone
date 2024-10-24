import axios from "axios";
const BASE_URL = "https://www.googleapis.com/customsearch/v1"
const params = {
  key: "AIzaSyDhCiPdPgp_MHmqDhhQ9sWumBr2c79yC3w",
  cx: "f3baf61fcd63a474a",
}
export const fetchDataFromApi = async (payload) => {
  const { data } = await axios.get(BASE_URL, {
    params: { ...params, ...payload, }
  })
  return data
};
