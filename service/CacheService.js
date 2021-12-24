class CacheService {
  constructor() {
    this.store = new Map();
  }
  getData(key) {
    if (!key) {
      return '';
    }
    return this.store.get(key);
  }
  setData(key, data) {
    this.store.set(key, data);
  }
}

module.exports = CacheService;
