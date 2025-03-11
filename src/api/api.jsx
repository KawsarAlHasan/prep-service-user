import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const API = axios.create({
  baseURL: "http://localhost:7000/api/v1",
  // baseURL: "https://prep-service.onrender.com/api/v1",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// get me user
export const useUserProfile = () => {
  const getUser = async () => {
    const response = await API.get("/user/me");
    return response.data;
  };

  const {
    data: user = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { user, isLoading, isError, error, refetch };
};

export const useRateType = () => {
  const getRate = async () => {
    const response = await API.get("/rate/all");
    return response.data;
  };

  const {
    data: rateType = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["rateType"],
    queryFn: getRate,
  });

  return { rateType, isLoading, isError, error, refetch };
};
