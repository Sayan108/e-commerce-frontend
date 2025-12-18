export enum Environment {
  LOCAL = "LOCAL",
  STAGING = "STAGING",
  PROD = "PROD",
}

export const Env = Environment.STAGING;

export const BaseUrl = {
  [Environment.LOCAL]: {
    baseUrl: "http://localhost:3000/api/",
  },
  [Environment.STAGING]: {
    baseUrl: "https://e-commerce-backend-8mse.onrender.com/api/",
  },
  [Environment.PROD]: {
    baseUrl: "",
  },
};

