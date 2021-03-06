from django.contrib import admin
from .models import SpeedTest, SpeedTestResult, SpeedTestTotalResult


class SpeedTestAdmin(admin.ModelAdmin):
    list_display = ('test_id', 'tester', 'file_size_mb')
    list_display_links = ('test_id',)
    search_fields = ('test_id', 'tester')


# class SpeedTestUnitAdmin(admin.ModelAdmin):
#     list_display = ('unit_id', 'test_id', 'begin_timestamp')
#     list_display_links = ('unit_id',)
#     search_fields = ('unit_id',)


class SpeedTestResultAdmin(admin.ModelAdmin):
    list_display = ('result_id', 'test_id', 'duration', 'speed')
    list_display_links = ('result_id',)
    search_fields = ('result_id',)


class SpeedTestTotalResultAdmin(admin.ModelAdmin):
    list_display = ('total_result_id', 'test_id', 'tester_id')
    list_display_links = ('total_result_id',)
    search_fields = ('total_result_id',)


admin.site.register(SpeedTest, SpeedTestAdmin)
# admin.site.register(SpeedTestUnit, SpeedTestUnitAdmin)
admin.site.register(SpeedTestResult, SpeedTestResultAdmin)
admin.site.register(SpeedTestTotalResult, SpeedTestTotalResultAdmin)
