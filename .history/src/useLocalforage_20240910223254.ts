import localforage, { config, } from 'localforage';

export const useLocalforage = (options: LocalForageOptions ) => {

  // 配置 localForage
  localforage.config({
    ...config,
    ...options,
  });

  // 定义一个永不过期的标志
  const NEVER_EXPIRES_FLAG = -1;

  /**
   * 设置存储项
   * @param k 键名
   * @param v 值
   * @param expired 过期时间（分钟），默认永不过期
   * @returns Promise
   */
  const setItem = (k: string, v: any, expired: number = -1) => {
    const expiredKey = `${k}__expires__`;
    let exp = 0;

    if (expired === NEVER_EXPIRES_FLAG) {
      exp = NEVER_EXPIRES_FLAG;
    } else if (expired >= 0) {
      exp = Date.now() + 1000 * 60 * expired;
    }

    // 存储过期时间
    localforage.setItem(expiredKey, exp.toString()).catch((err) => {
      console.error('设置过期时间失败:', err);
    });

    // 存储实际数据
    return localforage.setItem(k, v);
  };

  /**
   * 获取存储项
   * @param k 键名
   * @returns Promise<any | null>
   */
  const getItem = async <T> (k: string) => {
    const expiredKey = `${k}__expires__`;

    try {
      const expiredValue = await localforage.getItem<string | null>(expiredKey);

      if (expiredValue === null) {
        // 未设置过期时间，视为不存在
        return null;
      }

      const expiredTime = parseInt(expiredValue, 10);

      if (expiredTime === NEVER_EXPIRES_FLAG) {
        // 永不过期
        return localforage.getItem(k) as T;
      }

      if (expiredTime > Date.now()) {
        // 未过期，返回数据
        return localforage.getItem(k);
      } else {
        // 已过期，删除数据
        removeItem(k);
        removeItem(expiredKey);
        return null;
      }
    } catch (err) {
      console.error('获取数据失败:', err);
      return null;
    }
  };

  /**
   * 删除存储项
   * @param k 键名
   * @returns Promise
   */
  const removeItem = (k: string) => {
    const expiredKey = `${k}__expires__`;
    localforage.removeItem(expiredKey).catch((err) => {
      console.error('删除过期时间失败:', err);
    });
    return localforage.removeItem(k);
  };

  return {
    getItem,
    setItem,
  }
}

export default useLocalforage;