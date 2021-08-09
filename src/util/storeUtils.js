import store from 'store';

const opStorage = {
   user: null,
   set(key, value) {
      // localStorage.setItem(key, JSON.stringify(value))
      store.set(key, value);
   },
   get(key) {
      // return JSON.parse(localStorage.getItem(key) || '{}')
      return store.get(key);
   },
   remove(key) {
      // localStorage.removeItem(key)
      store.remove(key);
   },
   clearAll() {
      store.clearAll();
   },
};

export default opStorage