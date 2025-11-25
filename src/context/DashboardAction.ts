import type { MachineData } from "../models/MachineData";
import type { Alert } from '../models/AlertModel'

export type MachineAction=
    |{type: 'LOAD_INITIAL_DATA'; payload:MachineData[]}
    |{type: 'UPDATE_REALTIME_DATA'; payload:MachineData[]}
    |{type: 'ADD_ALERT'; payload:Alert}
    |{type: 'TOGGLE_LOADING'; payload:boolean}
    |{type: 'SET_ERROR'; payload:string|null};