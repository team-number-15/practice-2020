import random
import string

from django_backend_practice_2020.django_backend_practice_2020.local_configs import DEFAULT_SIZE_UNIT


# def generate_big_random_letters(filename,size):
def generate_big_random_letters(size):
    """
    :param size: the size in bytes
    :return: str
    """

    chars = ''.join([random.choice(string.ascii_letters) for i in range(size * DEFAULT_SIZE_UNIT)])
    return chars
