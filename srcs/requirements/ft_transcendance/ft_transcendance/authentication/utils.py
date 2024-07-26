from django.core.signing import TimestampSigner
from PIL import Image

signer = TimestampSigner()


def generate_token(email):
    return signer.sign(email)


def verify_token(token):
    try:
        return signer.unsign(token, max_age=3600) # token valide pendant une heure
    except:
        return None
    

def resize_image(image, size=(300, 300)):
    img = image.resize(size, Image.ANTIALIAS)
    return img


def crop_to_square(image):
    width, height = image.size
    min_side = min(width, height)

    left = (width - min_side) / 2
    top = (height - min_side) / 2
    right = (width + min_side) / 2
    bottom = (height + min_side) / 2

    return image.crop((left, top, right, bottom))