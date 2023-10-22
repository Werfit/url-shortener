class StorageService {
  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  deleteItem(key: string) {
    return localStorage.removeItem(key);
  }
}

const storage = new StorageService();
export default storage;
