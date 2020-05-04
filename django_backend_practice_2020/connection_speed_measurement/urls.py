from django.urls import include, path
#from .views import SpeedTestListView, SpeedTestUnitListView, SpeedTestResultListView, SpeedTestDetailView, SpeedTestUnitDetailView, SpeedTestResultDetailView
from .views import SpeedTestViewSet, SpeedTestUnitViewSet, SpeedTestResultViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('speed_test', SpeedTestViewSet, basename='speed_tests')
router.register('speed_test_unit', SpeedTestUnitViewSet, basename='speed_test_units')
router.register('speed_test_result', SpeedTestResultViewSet, basename='speed_test_results')

urlpatterns = router.urls
