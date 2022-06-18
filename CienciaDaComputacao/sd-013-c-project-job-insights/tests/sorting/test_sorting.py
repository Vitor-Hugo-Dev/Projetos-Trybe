from src.jobs import read
from src.sorting import sort_by

jobs = read('./src/jobs.csv')


def test_sort_by_criteria():
    sort_by(jobs, 'min_salary')
    first = jobs[0]['min_salary']
    last = jobs[len(jobs) - 1]['min_salary']

    assert (first < last) or last == ''

    sort_by(jobs, 'max_salary')
    first = jobs[0]['max_salary']
    last = jobs[len(jobs) - 1]['max_salary']

    assert (first > last)

    sort_by(jobs, 'date_posted')
    first = jobs[0]['date_posted']
    last = jobs[len(jobs) - 1]['date_posted']

    assert (first > last)
