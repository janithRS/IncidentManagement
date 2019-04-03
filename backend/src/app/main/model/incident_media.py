from .. import db
import time

class IncidentMedia(db.Model):
    """ IncidentMedia Model for storing task related details """
    __tablename__ = "incident_media"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file_name = db.Column(db.String(1024))
    original_name = db.Column(db.String(1024))
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    uploader_id = db.Column(db.String(1024))
    created_date = db.Column(db.Integer, default=int(time.time()))
    updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))

    def __repr__(self):
        return "<IncidentMedia '{}'>".format(self.name)
