# Generated by Django 2.2.1 on 2019-06-05 11:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('incidents', '0005_auto_20190605_0934'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='incidentseverity',
            options={'ordering': ('id',), 'permissions': (('can_change_severity', 'Can directly change status'), ('can_approve_severity_change', 'Can approve a severity change request'), ('can_reject_severity_change', 'Can reject a severity change request'))},
        ),
        migrations.AlterModelOptions(
            name='incidentstatus',
            options={'ordering': ('id',), 'permissions': (('can_change_status', 'Can directly change status'), ('can_approve_status_change', 'Can approve a status change request'), ('can_reject_status_change', 'Can reject a status change request'))},
        ),
    ]