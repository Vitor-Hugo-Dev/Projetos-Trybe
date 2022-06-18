def study_schedule(permanence_period, target_time):
    if target_time is None:
        return None
    else:
        students = 0

        for period in permanence_period:
            if type(period[0]) != int or type(period[1]) != int:
                return None
            elif period[0] <= target_time <= period[1]:
                students += 1
        return students
