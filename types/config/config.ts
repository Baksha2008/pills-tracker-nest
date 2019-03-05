export interface IConfig {
  appConfig: {
    port: number;
  };
  expireTime: {
    time: number;
  };
  jwtConf: {
    secret: string;
  };
}
