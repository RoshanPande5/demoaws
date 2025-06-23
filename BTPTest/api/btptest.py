from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.db import connection
from django.contrib.auth.decorators import login_required
import json


@csrf_exempt
def insert_usermasters(request):
    if request.method == "POST":
        try:
            # Parse JSON from request
            data = json.loads(request.body)
            user_data = data.get("detailsjson")  # expecting a list of users
            # tenant_id = data.get("tenant_id")
            created_by_userid = data.get("loginuserid")

            if not user_data or not isinstance(user_data, list):
                return JsonResponse({"message": "Invalid or missing user_data"}, status=400)

            # Call the PostgreSQL function
            cursor = connection.cursor()
            json_data = json.dumps(user_data)  # Convert Python list to JSON string
            cursor.callproc("btp.fn_usermaster_insert", [created_by_userid,  json_data])
            result = cursor.fetchall()
            cursor.close()

            # Check result
            if result and result[0][0].get('Message') == 'Success':
                return JsonResponse({"data": result[0][0], "message": "Ok"}, status=200)
            else:
                return JsonResponse({"data": result[0][0], "message": "Insert Failed"}, status=500)

        except Exception as e:
            return JsonResponse({"message": "Error occurred", "error": str(e)}, status=500)

    else:
        return JsonResponse({"message": "Invalid Method. Use POST."}, status=405)



@csrf_exempt
def usermaster_get(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            userid = data.get("userid", 0)  # 0 to fetch all users as per function design

            search_criteria = data.get("search_criteria", '')  # 0 to fetch all users as per function design

            if userid is None:
                return JsonResponse({"message": "Missing 'userid' in request"}, status=400)

            cursor = connection.cursor()
            cursor.execute("SELECT btp.fn_usermaster_get(%s,%s)", [userid,search_criteria])
            result = cursor.fetchall()
            cursor.close()

            return JsonResponse({"data": result[0][0], "message": "Ok"}, status=200)

        except Exception as e:
            return JsonResponse({"message": "Error occurred", "error": str(e)}, status=500)

    else:
        return JsonResponse({"message": "Invalid Call. Please use POST Method"}, status=405)

