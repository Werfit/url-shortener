import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import http from "@/service/http/http.service.ts";
import { env } from "@/common/env/env.ts";
import { useAppSelector } from "@/libs/redux/hooks.ts";
import { Routes } from "@/common/constants/routes.enum.ts";

type HashParams = {
  hash: string;
};

const loadUrl = async (hash: string, token: string) => {
  return await http.get(`${env.api.url}?hash=${hash}`, {
    authorization: `Bearer ${token}`,
  });
};

let startedFetching = false;

export const Redirect: React.FC = () => {
  const params = useParams<HashParams>();
  const token = useAppSelector((state) => state.authentication.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.hash || !token || startedFetching) {
      return;
    }

    startedFetching = true;
    loadUrl(params.hash, token)
      .then((result) => {
        window.location.href = result.url;
      })
      .catch(() =>
        navigate(Routes.HOME, {
          relative: "path",
        }),
      );
  }, [params, token, navigate]);

  return <h1>Loading...</h1>;
};
