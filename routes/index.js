/**
 * Created by AyushK on 18/09/20.
 */
import ValidationManger from "../middleware/validation";
import TestModule from "../app/modules/testModule";
import {stringConstants} from "../app/common/constants";

export default (app) => {
    app.get('/', (_req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    app.get("/success-route", ValidationManger.validateUserLogin, new TestModule().successRoute);
    app.get("/failure-route",  new TestModule().failureRoute);
};
