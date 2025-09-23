# quiniela_app/services/email_service.py
# Lógica para construir y enviar correos electrónicos.

from flask_mail import Message
from quiniela_app import mail

def send_email(subject, sender, recipients, body, html=None):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = body
    if html:
        msg.html = html
    mail.send(msg)
