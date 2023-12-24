import { fetchUtils } from "react-admin";

// import cookieCutter from 'cookie-cutter';

// const masterKey = cookieCutter.get('masterKey');

const serverURL = "/api" as string;

const httpClient = (url: string, options = {}) => {
  const headers = new Headers({
    // "X-Parse-Master-Key": masterKey,
    Accept: "application/json",
  });

  return fetchUtils.fetchJson(`${serverURL}/${url}`, {
    headers,
    ...options,
  });
};
export default httpClient;
