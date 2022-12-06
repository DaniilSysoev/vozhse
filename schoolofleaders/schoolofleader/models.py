from django.db import models


class Member(models.Model):
    name = models.CharField(max_length=200, blank=True)
    birthday = models.CharField(max_length=200, blank=True)
    age = models.CharField(max_length=200, blank=True)
    faculty = models.CharField(max_length=200, blank=True)
    programm = models.CharField(max_length=200, blank=True)
    campus = models.CharField(max_length=200, blank=True)
    course = models.CharField(max_length=200, blank=True)
    number = models.CharField(max_length=200, blank=True)
    mail = models.CharField(max_length=200, blank=True)
    telegram = models.CharField(max_length=200, blank=True)
    vk = models.CharField(max_length=200, blank=True)
    ready_or_not = models.CharField(max_length=200, blank=True)
    question_1 = models.TextField(blank=True)
    question_2 = models.TextField(blank=True)
    question_3 = models.TextField(blank=True)
    question_4 = models.TextField(blank=True)
    question_5 = models.TextField(blank=True)
    question_6 = models.TextField(blank=True)
    question_7 = models.TextField(blank=True)
    question_8 = models.TextField(blank=True)
    question_9 = models.TextField(blank=True)
    question_10 = models.TextField(blank=True)
    question_11 = models.TextField(blank=True)
    question_12 = models.TextField(blank=True)
    question_13 = models.TextField(blank=True)
    question_14 = models.TextField(blank=True)
    question_15 = models.TextField(blank=True)
    file = models.FileField(blank=True)
    size = models.CharField(max_length=200, blank=True)
    checkbox = models.BooleanField(blank=True)

    def __str__(self):
        return self.name
    