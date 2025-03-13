import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const API = axios.create({
  // baseURL: "http://localhost:7000/api/v1",
  baseURL: "https://prep-service.onrender.com/api/v1",
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

export const useAllInventory = () => {
  const getInventory = async () => {
    const response = await API.get("/inventory");
    return response.data;
  };

  const {
    data: allInventory = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allInventory"],
    queryFn: getInventory,
  });

  return { allInventory, isLoading, isError, error, refetch };
};

// get all Inventories
export const useMyInventories = ({
  start_date,
  end_date,
  page = 1,
  limit = 10,
} = {}) => {
  const getMyInventories = async () => {
    const response = await API.get("/inventory", {
      params: { start_date, end_date, page, limit },
    });
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myInventories", start_date, end_date, page, limit],
    queryFn: getMyInventories,
  });

  const { data: myInventories = [], pagination = {} } = response;

  return { myInventories, pagination, isLoading, isError, error, refetch };
};

// get my returns products
export const useMyReturnProducts = ({
  start_date,
  end_date,
  page = 1,
  limit = 10,
} = {}) => {
  const getMyReturnProducts = async () => {
    const response = await API.get("/return", {
      params: { start_date, end_date, page, limit },
    });
    return response.data;
  };

  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myReturnProducts", start_date, end_date, page, limit],
    queryFn: getMyReturnProducts,
  });

  const { data: myReturnProducts = [], pagination = {} } = response;

  return { myReturnProducts, pagination, isLoading, isError, error, refetch };
};
