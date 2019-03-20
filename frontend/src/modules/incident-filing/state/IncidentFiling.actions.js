import {
    SUBMIT_INCIDENT,
    INCIDENT_BASIC_DATA_SUBMIT_REQUEST,
    INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
    INCIDENT_BASIC_DATA_SUBMIT_ERROR,
    INCIDENT_STEPPER_FORWARD,
    INCIDENT_STEPPER_BACKWARD,
    
    INCIDENT_BASIC_DATA_UPDATE_REQUEST,
    INCIDENT_BASIC_DATA_UPDATE_SUCCESS,
    INCIDENT_BASIC_DATA_UPDATE_ERROR,
    INCIDENT_REPORTER_UPDATE_REQUEST,
    INCIDENT_REPORTER_UPDATE_SUCCESS,
    INCIDENT_REPORTER_UPDATE_ERROR
} from './IncidentFiling.types'
import { createIncident, updateIncident, updateReporter } from '../../../api/incident';

// Form Submission

export function stepForwardIncidentStepper() {
    return {
        type: INCIDENT_STEPPER_FORWARD,
    }
}

export function stepBackwardIncidentStepper() {
    return {
        type: INCIDENT_STEPPER_BACKWARD,
    }
}

export function requestIncidentSubmit() {
    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_REQUEST,
    }
}

export function recieveIncidentSubmitSuccess(submitResponse) {
    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_SUCCESS,
        data: submitResponse,
        error: null
    }
}

export function recieveIncidentSubmitError(errorResponse) {
    return {
        type: INCIDENT_BASIC_DATA_SUBMIT_ERROR,
        data: null,
        error: errorResponse
    }
}

export function submitIncidentBasicData(incidentData) {
    return async function(dispatch) {
        dispatch(requestIncidentSubmit());
        try{
            const response = await createIncident(incidentData);
            await dispatch(recieveIncidentSubmitSuccess(response.data));
            await dispatch(stepForwardIncidentStepper());
        }catch(error){
            await dispatch(recieveIncidentSubmitError(error));
        }
    }
}

// Update incident

export function requestIncidentUpdate() {
    return {
        type: INCIDENT_BASIC_DATA_UPDATE_REQUEST,
    }
}

export function recieveIncidentUpdateSuccess(submitResponse) {
    return {
        type: INCIDENT_BASIC_DATA_UPDATE_SUCCESS,
        data: submitResponse,
        error: null
    }
}

export function recieveIncidentUpdateError(errorResponse) {
    return {
        type: INCIDENT_BASIC_DATA_UPDATE_ERROR,
        data: null,
        error: errorResponse
    }
}

export function fetchUpdateIncident(incidentId, incidentData) {
    return async function (dispatch) {
        dispatch(requestIncidentUpdate());
        try{
            const response = await updateIncident(incidentId, incidentData);
            await dispatch(recieveIncidentUpdateSuccess(response.data));
            await dispatch(stepForwardIncidentStepper());
        }catch(error){
            await dispatch(recieveIncidentUpdateError(error));
        }
    }
}

// Update reporter

export function requestReporterUpdate() {
    return {
        type: INCIDENT_REPORTER_UPDATE_REQUEST,
    }
}

export function recieveReporterUpdateSuccess(response) {
    return {
        type: INCIDENT_REPORTER_UPDATE_SUCCESS,
        data: response,
        error: null
    }
}

export function recieveReporterUpdateError(errorResponse) {
    return {
        type: INCIDENT_REPORTER_UPDATE_ERROR,
        data: null,
        error: errorResponse
    }
}

export function fetchUpdateReporter(reporterId, reporterData) {
    return async function (dispatch) {
        dispatch(requestReporterUpdate());
        try{
            const response = await updateReporter(reporterId, reporterData);
            await dispatch(recieveReporterUpdateSuccess(response.data));
            await dispatch(stepForwardIncidentStepper());
        }catch(error){
            await dispatch(recieveReporterUpdateError(error));
        }
    }
}
