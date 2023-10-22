type Env = {
  api: {
    authorization: string;
    url: string;
  };
};

export const env: Env = {
  api: {
    authorization: import.meta.env.VITE_APP_AUTHORIZATION_API || "",
    url: import.meta.env.VITE_APP_URL_API || "",
  },
};
