from django.core.signing import TimestampSigner

signer = TimestampSigner()

def generate_token(email):
    return signer.sign(email)

def verify_token(token):
    try:
        return signer.unsign(token, max_age=3600) # token valide pendant une heure
    except:
        return None