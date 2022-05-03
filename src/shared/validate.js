const merge = require('lodash.merge');
const ValidationException = require('./exceptions/validation-exception');

const formatJoiError = (errorDetails) => {
  const errors = Array.isArray(errorDetails) ? errorDetails : [];

  return errors.reduce((acc, cur) => {
    let temp = {};
    cur.path.reverse().forEach((path, i) => {
      if (i === 0) {
        temp[path] = cur.message.replace(/".*"/gi, path);
        return;
      }

      temp = { [`${path}`]: temp };
    });

    return merge(acc, temp);
  }, {});
};

module.exports = (schemas) => async (req, _res, next) => {
  const keys = Object.keys(schemas);
  let hasErrored = false;
  const validations = keys.map(async (key) => {
    if (!hasErrored) {
      try {
        const payload = req[key];
        const schema = schemas[key];

        await schema.validateAsync(payload, { abortEarly: false });
      } catch (error) {
        if (!hasErrored) {
          next(new ValidationException(formatJoiError(error.details)));
          hasErrored = true;
        }
      }
    }
  });

  Promise.all(validations).finally(next);
};
