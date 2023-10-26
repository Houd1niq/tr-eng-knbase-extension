export type refreshResponse = {
  data?: {
    accessToken: string;
  };
  error?: {
    status: number;
    data: {
      statusCode: number;
      message: string;
    };
  };
};
