let id = 0;
const hasIds = {};
class Trigger {
  constructor () {
    this.subs = [];
  }

  on (eventName, fn) {
    fn.id = fn.id || id++;
    if (!hasIds[fn.id]) {
      (this.subs[eventName] || (this.subs[eventName] = [])).push(fn);
      hasIds[fn.id] = true;
    }
    return this;
  }

  off (eventName, fn) {
    if (!this.subs[eventName]) {
      return this;
    }
    if (!fn) {
      this.subs[eventName] = null;
      return this;
    }
    this.subs[eventName].splice(this.subs[eventName].indexOf(fn) >>> 0, 1);
    return this;
  }

  emit (eventName, ...args) {
    (this.subs[eventName] || []).forEach(cb => {
      cb.apply(null, args);
    });
    return this;
  }
}
export default new Trigger();
