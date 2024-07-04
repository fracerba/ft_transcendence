FROM python:3.8

#To avoid unnecessary writes to disk worth in containerized environment
ENV PYTHONDONTWRITEBYTECODE 1
#To enscure a faster output in possible error log
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY requirements.txt /code/
RUN pip install --upgrade pip \
	&& pip install -r requirements.txt

COPY . /code/
