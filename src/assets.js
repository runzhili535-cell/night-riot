// public/ 素材必须沿用 Vite 的部署基础路径，不能固定为域名根目录。
export const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
export const fallbackPoster = publicAsset('images/fallback.svg');
