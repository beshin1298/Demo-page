import axios from "axios";

export const responseAxios = async (method, urlApi, contentType) => {
  if (contentType === "") {
    contentType = "application/json";
  }
  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: urlApi,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const res = await axios(config);

  return res;
};
