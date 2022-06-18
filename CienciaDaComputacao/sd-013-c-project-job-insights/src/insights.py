from src.jobs import read


def get_unique_job_types(path):
    file = read(path)
    job_types = set()

    for job in file:
        job_types.add(job["job_type"])

    return job_types


def filter_by_job_type(jobs, job_type):
    filtered_jobs = [
        job for job in jobs if job["job_type"] == job_type
    ]
    return filtered_jobs


def get_unique_industries(path):
    file = read(path)
    industries = set()

    for job in file:
        if job["industry"] != "":
            industries.add(job["industry"])

    return industries


def filter_by_industry(jobs, industry):
    filtered_jobs = [
        job for job in jobs if job["industry"] == industry
    ]
    return filtered_jobs


def get_max_salary(path):
    data = read(path)
    job_salary = [job["max_salary"] for job in data if job["max_salary"] != ""]

    max_salary = [int(salary) for salary in job_salary if salary != "invalid"]
    return max(max_salary)


def get_min_salary(path):
    data = read(path)
    job_salary = [job["min_salary"] for job in data if job["min_salary"] != ""]

    min_salary = [int(salary) for salary in job_salary if salary != "invalid"]
    return min(min_salary)


def matches_salary_range(job, salary):
    if "min_salary" not in job or "max_salary" not in job:
        raise ValueError()
    elif (type(job["min_salary"]) is not int) or (
            type(job["max_salary"]) is not int):
        raise ValueError()
    elif (job["min_salary"] > job["max_salary"]) or type(salary) is not int:
        raise ValueError()
    elif job["min_salary"] <= salary <= job["max_salary"]:
        return True
    else:
        return False


def filter_by_salary_range(jobs, salary):
    valid_jobs = []
    for job in jobs:
        try:
            if matches_salary_range(job, salary):
                valid_jobs.append(job)
        except ValueError:
            pass
    return valid_jobs
