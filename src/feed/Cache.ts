export class Cache {

  public static newCacheEntry(key: string, val: string, ttl: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + ttl);
    this.storeWithExpiry(key, val, expires);
  }

  public static getCacheEntry(key: string): string | undefined {
    return this.retrieveAndCheckExpiry(key)
  }

  public static deleteCacheEntry(key: string) {
    localStorage.removeItem(key);
  }

  public static clearCache() {
    localStorage.clear()
  }

  private static storeWithExpiry(key: string, value: string, expires: Date) {
    const item = {
      value: value,
      expiry: expires.getTime(),
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  private static retrieveAndCheckExpiry(key: string): string | undefined {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return undefined;
    }
    const item = JSON.parse(itemStr);

    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return undefined;
    }
    return item.value;
  }
}
