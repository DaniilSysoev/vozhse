import os
from django.shortcuts import render, redirect
from .forms import MemberForm
from .models import Member
from pydrive.auth import GoogleAuth, ServiceAccountCredentials
from pydrive.drive import GoogleDrive
import httplib2
from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import datetime


def upload_to_gdrive(file_from_request):
    data = file_from_request
    path = default_storage.save('../media/' + data.name, ContentFile(data.read()))
    gauth = GoogleAuth()
    scope = ["https://www.googleapis.com/auth/drive"]
    creds_json = os.path.dirname(__file__) + '/static/schoolofleader/credentials.json'
    gauth.credentials = ServiceAccountCredentials.from_json_keyfile_name(creds_json, scope)
    drive = GoogleDrive(gauth)
    file = drive.CreateFile({'parents': [{'id': ''}]})
    file['title'] = file_from_request.name
    file.SetContentFile(os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir)) + '/media/' + file_from_request.name)
    file.Upload()
    return file['alternateLink']


def get_service_sacc():
    creds_json = os.path.dirname(__file__) + '/static/schoolofleader/credentials.json'
    scopes = ['https://www.googleapis.com/auth/spreadsheets']
    creds_service = ServiceAccountCredentials.from_json_keyfile_name(creds_json, scopes).authorize(httplib2.Http())
    return build('sheets', 'v4', http=creds_service)


def push_django_form(saved_form):
    service = get_service_sacc()
    sheet = service.spreadsheets()
    sheet_id = ''
    resp = sheet.values().append(
        spreadsheetId=sheet_id,
        range='Регистрация!A2',
        valueInputOption='RAW',
        body={'values': [saved_form]}).execute()


def form(request):
    if request.method == "POST":
        form = MemberForm(request.POST, request.FILES)
        saved_form = [i[0] for i in list(dict(request.POST).values())[1::]]
        print(request.POST)
        print(saved_form)
        send_form = ['']*31
        print(send_form)
        if len(saved_form) == 15:
            send_form[0] = saved_form[4]
            send_form[1] = saved_form[5]
            send_form[2] = saved_form[6]
            send_form[3] = saved_form[7]
            send_form[4] = saved_form[8]
            send_form[5] = saved_form[9]
            send_form[6] = saved_form[10]
            send_form[7] = saved_form[11]
            send_form[8] = saved_form[12]
            send_form[9] = saved_form[13]
            send_form[10] = saved_form[14]
            send_form[-7] = saved_form[0]
            send_form[-6] = saved_form[1]
            send_form[-5] = saved_form[2]
            send_form[-2] = saved_form[3]
        else:
            send_form[0] = saved_form[0]
            send_form[1] = saved_form[1]
            send_form[2] = saved_form[2]
            send_form[3] = saved_form[3]
            send_form[4] = saved_form[4]
            send_form[5] = saved_form[5]
            send_form[6] = saved_form[6]
            send_form[7] = saved_form[7]
            send_form[8] = saved_form[8]
            send_form[9] = saved_form[9]
            send_form[10] = saved_form[10]
            send_form[11] = saved_form[12]
            send_form[12] = saved_form[12]
            send_form[13] = saved_form[13]
            send_form[14] = saved_form[14]
            send_form[15] = saved_form[15]
            send_form[16] = saved_form[16]
            send_form[17] = saved_form[17]
            send_form[18] = saved_form[18]
            send_form[19] = saved_form[19]
            send_form[20] = saved_form[20]
            send_form[21] = saved_form[21]
            send_form[22] = saved_form[22]
            send_form[23] = saved_form[23]
            send_form[-3] = saved_form[25]
            send_form[-2] = saved_form[24]
        if dict(request.FILES) != {}:
            link = upload_to_gdrive(request.FILES['file'])
            send_form[-4] = link
        send_form[-1] = str(datetime.datetime.now())
        push_django_form(send_form)

    form = MemberForm()
    context = {
        'form': form
    }
    return render(request, 'schoolofleader/form.html', context)


def index(request):
    return render(request, 'schoolofleader/index.html')
