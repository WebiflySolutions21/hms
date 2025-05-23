import {AgentService} from './agent.service';
import { AuthenticationService } from "./authentication.service";
import {UserService} from "./user.service"
import {LoginService} from "./login.service"
import {FormService} from "./form.service"
import {DataService} from "./data.service"
import {DropdownStateService} from "./dropdown-state.service"
import {RegistrationService} from "./registration.service"
import {PatientService} from "./patient.service"
import {EventEmitterService} from "./event-emitter.service"
import {ChatService} from "./chat.service"
import { PrintService } from './print.service';
import {SignupService} from "./signup.service"
import { HospitalService } from './hospital.service';
import {LoaderService} from "./loader.service"

export * from "./event-emitter.service"
export * from './agent.service';
export * from "./authentication.service"
export * from "./user.service"
export * from "./login.service"
export * from "./form.service"
export * from "./data.service"
export * from "./dropdown-state.service"
export * from "./registration.service"
export * from "./patient.service"
export * from "./chat.service"
export * from "./print.service"
export * from "./signup.service"
export * from "./hospital.service"
export * from "./loader.service"


export const services=[
    AgentService,
    AuthenticationService,
    UserService,
    LoginService,
    FormService,
    DataService,
    DropdownStateService,
    RegistrationService,
    PatientService,
    EventEmitterService,
    ChatService,
    PrintService,
    SignupService,
    HospitalService,
    LoaderService
]