import * as _ from 'lodash-es';

class MutableProp {

  constructor() {
    this.__chartProperties = [];
  }

  addProp(name, type) {
    if (this[name]) {
      throw new Error(`property ${name} already exists`);
    }
    if (name === '_chartProperties') {
      throw new Error('name _chartProperties is protected');
    }
    if (!type || type === 'simple') {
      this[name] = (val) => {
        if (!_.isUndefined(val)) {
          this[`_${name}`] = val;
          return this;
        }
        return this[`_${name}`];
      };
    } else if (type === 'path') {
      this[name] = (val) => {
        if (!_.isUndefined(val)) {
          this[`_${name}`] = typeof val === 'string' ? function(d) { return _.at(d, val)[0]; } : val;
          return this;
        }
        return this[`_${name}`];
      };
    } else if (typeof type === 'object') {
      this[name] = (val) => {
        if (!_.isUndefined(val)) {
          type.set(val);
          return this;
        }
        return type.get();
      };
    }
    this.__chartProperties.push(name);
  }

  props() {
    return this.__chartProperties;
  }

  extend(def, defaults) {
    let keysToApply;
    if (_.isArray(def)) {
      keysToApply = def;
      _.each(def, (name) => {
        this.addProp(name);
      });
    } else {
      keysToApply = Object.keys(def);
      _.each(def, (type, name) => {
        this.addProp(name, type);
      });
    }

    keysToApply.forEach((key) => {
      this[key](defaults[key]);
    });
  }

}

export default MutableProp;
