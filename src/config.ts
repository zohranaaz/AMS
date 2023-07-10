const config: IConfig = {
    port: Number.parseInt(process.env.PORT) || 4000,
    jwtSecretKey: process.env.jwtSecretKey,
    imageBaseUrl: process.env.imageBaseUrl
};

export default config;

export interface IConfig {
    port: number;
    jwtSecretKey: string,
    imageBaseUrl: string
}
