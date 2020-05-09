from .views import SpeedTestViewSet, SpeedTestUnitViewSet, SpeedTestResultViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('speed_test_list', SpeedTestViewSet, basename='speed_tests')
router.register('speed_test_unit_list', SpeedTestUnitViewSet, basename='speed_test_units')
router.register('speed_test_result_list', SpeedTestResultViewSet, basename='speed_test_results')

urlpatterns = router.urls
