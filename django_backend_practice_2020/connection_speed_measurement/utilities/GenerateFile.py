import random
from string import ascii_letters

from django_backend_practice_2020.local_configs import DEFAULT_SIZE_UNIT


def generate_big_random_letters(size):
    """
    :param size: the size in DEFAULT_SIZE_UNIT
    :return: str
    """

    chars = ''.join([random.choice(ascii_letters) for i in range(size * DEFAULT_SIZE_UNIT)])
    return chars
