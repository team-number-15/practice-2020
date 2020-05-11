def evaluate_speed(begin, end, data_size):
    """
    :param begin: begin datetime
    :param end: end datetime
    :param data_size: the size in megabits
    :return: float, float
    """

    duration = (end - begin).total_seconds()
    speed = data_size / duration

    return duration, speed


if __name__ == '__main__':
    from datetime import datetime

    begin = datetime(2020, 11, 21, 11, 9, 13)
    end = datetime(2020, 11, 23, 23, 12, 4)

    data_size = 16

    print(evaluate_speed(begin, end, data_size))
