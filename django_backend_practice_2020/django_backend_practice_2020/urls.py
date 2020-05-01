from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/social/', include('authentication.urls')),
    path('api/v1/signup/', include('rest_auth.registration.urls')),
    path('api/v1/auth/', include('rest_auth.urls')),

    # path('api/v1/', include('api.urls')),
    # path('api/v1/auth/', include('rest_auth.urls')),
    # path('api/v1/auth/accounts/', include('allauth.urls')),  # for authentication with social networks
    #
    #  path('api/v1/users', include('accounts.urls')),
]
