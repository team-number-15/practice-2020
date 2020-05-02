from django.contrib import admin
from .models import SpeedTest, SpeedTestUnit, SpeedTestResult


class SpeedTestAdmin(admin.ModelAdmin):
    list_display = ('test_id', 'tester', 'file_size_mb')
    list_display_links = ('test_id',)
    search_fields = ('test_id', 'tester')


class SpeedTestUnitAdmin(admin.ModelAdmin):
    list_display = ('unit_id', 'test_id', 'begin_timestamp', 'packet_count', 'packet_number')
    list_display_links = ('unit_id',)
    search_fields = ('unit_id',)


class SpeedTestResultAdmin(admin.ModelAdmin):
    list_display = ('result_id', 'unit_id', 'duration', 'speed')
    list_display_links = ('result_id',)
    search_fields = ('result_id',)


admin.site.register(SpeedTest, SpeedTestAdmin)
admin.site.register(SpeedTestUnit, SpeedTestUnitAdmin)
admin.site.register(SpeedTestResult, SpeedTestResultAdmin)
