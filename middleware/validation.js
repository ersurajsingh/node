import * as yup from "yup";
import httpHandler from "../app/utils/httpHandler";


export default {
  validateUserLogin: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email(),
    });
    await validate(schema, req.query, res, next);
  },
};

const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    httpHandler.validationError(res, errors);
  }
};
