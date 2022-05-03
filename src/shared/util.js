class Util {
  static findInMap(map = new Map(), predicate) {
    const values = map.values();
    let current = values.next();
    while (!current.done) {
      if (predicate(current.value)) {
        return current.value;
      }

      current = values.next();
    }

    return null;
  }

  static catchError(callback) {
    return async (req, res, next) => {
      try {
        await callback(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }
}

module.exports = Util;
