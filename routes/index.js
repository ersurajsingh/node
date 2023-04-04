/**
 * Created by Developer on 04/04/23.
 */
import ValidationManger from '../middleware/validation';
import Template from '../app/modules/template';
import { stringConstants } from '../app/common/constants';

export default (app) => {
  app.get('/', (_req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

  /**
   * route definition
   */
  app.get(
    '/success-route',
    ValidationManger.validateUserLogin,
    new Template().successRoute
  );
  app.get('/failure-route', new Template().failureRoute);
};
