export interface IEffect {
  payload: any;
  type: string;
}

export interface IApiResponse {
  docs: any[];
  total: number;
}
