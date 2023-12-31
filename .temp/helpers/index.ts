import { HelperHttpService } from "./helper-http.service";
import { EaHelperConfirmationService } from "./helper-confirmation.service";
import { HelperPhoneService } from "./helper-phone.service";
import { HelperStateManagerService } from "./helper.state-manager.service";

export const helpersProviders = [
    HelperHttpService,
    HelperStateManagerService,
    HelperPhoneService, // toreview
    EaHelperConfirmationService,
];