from django.urls import include, path
from .views import SpeedTestListView, SpeedTestUnitListView, SpeedTestResultListView, SpeedTestDetailView, SpeedTestUnitDetailView, SpeedTestResultDetailView

urlpatterns = [
    path('speedtestlist/', SpeedTestListView.as_view(), name='test_list'),
    path('unitlist/', SpeedTestUnitListView.as_view(), name='test_units_list'),
    path('resultslist/', SpeedTestResultListView.as_view(), name='test_results_list'),
    path('speedtestlist/<int:pk>/', SpeedTestDetailView.as_view(), name='test_detail'),
    path('unitlist/<int:pk>/', SpeedTestUnitDetailView.as_view(), name='test_units_detail'),
    path('resultslist/<int:pk>/', SpeedTestResultDetailView.as_view(), name='test_results_detail'),
]