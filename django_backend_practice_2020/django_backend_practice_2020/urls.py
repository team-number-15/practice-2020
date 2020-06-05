from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from connection_speed_measurement.views import index

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/token/', obtain_jwt_token),
    path('api/v1/token/verify/', verify_jwt_token),
    path('api/v1/token/refresh/', refresh_jwt_token),

    path('api/v1/auth/', include('authentication.urls')),
    path('api/v1/signup/', include('rest_auth.registration.urls')),

    path('api/v1/speedtest/', include('connection_speed_measurement.urls')),
    re_path(r'^(?P<path>.*)/$', index, name='index')
]
