from django.contrib import admin
from django.urls import include, path
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/token/', obtain_jwt_token),
    path('api/v1/token/verify/', verify_jwt_token),
    path('api/v1/token/refresh/', refresh_jwt_token),
    path('api/v1/auth/social/', include('authentication.urls')),
    path('api/v1/signup/', include('rest_auth.registration.urls')),
    path('api/v1/auth/', include('rest_auth.urls')),

    # path('api/v1/', include('api.urls')),
    # path('api/v1/auth/', include('rest_auth.urls')),
    # path('api/v1/auth/accounts/', include('allauth.urls')),  # for authentication with social networks
    #
    #  path('api/v1/users', include('accounts.urls')),
]
