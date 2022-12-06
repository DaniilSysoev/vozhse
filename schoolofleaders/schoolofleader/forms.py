from .models import Member
from django import forms


class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ["name", 'birthday', 'age', "faculty", "programm", "campus", "course", "number", "mail", "telegram", "vk", "ready_or_not", "question_1",
                  "question_2", "question_3", "question_4", "question_5", "question_6", "question_7", "question_8", "question_9",
                  "question_10", "question_11", "question_12", "question_13", "question_14", "question_15", "file", "size", "checkbox"]