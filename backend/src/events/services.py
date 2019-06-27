"""Contains the domain model / business logic for events"""

from .models import Event, EventAction, AffectedAttribute
from ..incidents.models import IncidentStatus

def get_events_by_incident_id(incident_id: str):
    events = Event.objects.filter(incident_id=incident_id)

    return events


def create_event(event_action, initiator, incident, 
                 affected_attribute=None, 
                 refered_model=None,
                 description=None,
                 linked_event=None
                ):

    event = Event(
        action = event_action,
        refered_model=refered_model,
        initiator = initiator,
        incident = incident,
        affected_attribute = affected_attribute
    )

    event.save()

def create_incident_event(initiator, incident):
    create_event(
                    EventAction.CREATED,
                    initiator, 
                    incident
                )

def update_incident_event(initiator, incident):
    create_event(
                    EventAction.GENERIC_UPDATE,
                    initiator, 
                    incident
                )

def update_incident_status_event(initiator, incident, status, is_approved):
    if is_approved:
        create_event(
                        EventAction.ATTRIBUTE_CHANGED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.STATUS,
                        refered_model=status                    
                    )
    else:
        create_event(
                        EventAction.ATTRIBUTE_CHANGE_REQUESTED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.STATUS,
                        refered_model=status                    
                    )

def update_incident_severity_event(initiator, incident, severity, is_approved):
    if is_approved:
        create_event(
                        EventAction.ATTRIBUTE_CHANGED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.SEVERITY,
                        refered_model=severity                    
                    )
    else:
        create_event(
                        EventAction.ATTRIBUTE_CHANGE_REQUESTED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.SEVERITY,
                        refered_model=severity                    
                    )

def create_comment_event(initiator, incident, comment):
    create_event(
                    EventAction.COMMENTED,
                    initiator, 
                    incident, 
                    refered_model=comment
                )

def create_outcome_event(initiator, incident, comment):
    create_event(
                    EventAction.OUTCOME_ADDED,
                    initiator, 
                    incident, 
                    refered_model=comment
                )


