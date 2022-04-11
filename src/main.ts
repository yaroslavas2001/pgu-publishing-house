import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import UiModalWindow from "@views/components/ui-modal-window/ui-modal-window.vue";

//rio-psy
import ContentComponent from "@/views/components/rio-psy/content.vue"
import FileInput from "@/views/components/rio-psy/ui-file-input/file-input.vue"
import LableInput from "@/views/components/rio-psy/label-input.vue"
import AutocompleteMultiselectComponent from "@/views/components/rio-psy/autocomplete-multiselect.vue"
import ToggleSwitcherComponent from "@/views/components/rio-psy/toggle-switcher.vue"
import SelectAutocompleteComponent from "@/views/components/rio-psy/select-autocomplete.vue"


import UiTable from "@views/components/ui-table/ui-table.vue";
import UiPagination from "@components/ui-table/ui-pagination.vue";
import UiTableHeaderItem from "@views/components/ui-table/ui-table-header-item.vue";
import UiTableBodyItem from "@views/components/ui-table/ui-table-body-item.vue";
import UiButton from "@components/ui-button.vue";
import UiLoading from "@components/ui-loading.vue";
import UiImagePreview from "@components/ui-crop-image/ui-image-preview.vue";
import UiCropImage from "@components/ui-crop-image/ui-crop-image.vue";
import UiFileInput from "@components/ui-file-input/ui-file-input.vue";
import UiCheckbox from "@components/ui-checkbox.vue";
import UiDatePicker from "@components/ui-date-picker/ui-date-picker.vue";
import ControlValidatorGroup from "@views/components/control-validator-group.vue";
import UiGroupValidator from "@views/components/ui-group-validator.vue";
import ContentTable from "@/views/components/content-table.vue";
import UiUpdateEntityModal from "@/views/components/ui-update-entity-modal.vue";
import UiTextEditorComponent from "@views/components/ui-text-editor/ui-text-editor.vue";

import UiBoxMenuComponent from "@views/components/ui-box-menu.vue";
import ErrorHandler from "./plugins/errorHandler";
import UiTableInput from "@views/components/ui-table/ui-table-input.vue";
import UiSelect from "@views/components/ui-select.vue";

import PageTemplate from "@views/components/page-template.vue";
import UiToggleSwitcherComponent from "@views/components/ui-toggle-switcher.vue";
import UiSelectSearchComponent from "@/views/components/ui-select-saerch.vue";

import Dialog from "./plugins/dialog/plugin.dialog"
import InitService from "@/init-service/plugin.init-service"
import UITabsComponent from "@views/components/ui-tabs/ui-tabs.vue"
import UITabItemComponent from "@views/components/ui-tabs/ui-tab-item.vue"
import ControlTimeComponent from "@views/components/ui-date-picker/control-time.vue"
import UiLableInput from "@views/components/ui-label-input.vue"
import UiSchedule from "@views/components/ui-schedule.vue"
import ClickOutside from "@/directive/click-outside"
import UiSelectAutocompleteComponent from "@/views/components/ui-select-autocomplete.vue"
import UiMultiselectComponent from "@views/components/ui-multiselect.vue"
import uiSelectOptionLang from "@/views/components/ui-select-option-lang.vue"
import UiDatetimeRangePicker from "@/views/components/ui-datetime-range-picker/ui-datetime-range-picker.vue"
import UiDateRangeSelector from "@/views/components/ui-date-range-selector/ui-date-range-selector.vue"
import UiTimeRangeSelector from "@views/components/ui-time-range-selector/ui-time-range-selector.vue"
import UiSelectLabelComponent from "@/views/components/ui-select-label.vue"
import UiDatetimePicker from "@/views/components/ui-datetime-picker/ui-datetime-picker.vue"
import UiDateSelector from "@/views/components/ui-date-selector/ui-date-selector.vue"
import UiAutocompleteMultiselectComponent from "@/views/components/ui-autocomplete-multiselect.vue"
import UiAutocompleteComponent from "@/views/components/ui-autocomplete.vue"
import UiQuickViewComponent from "@/views/components/ui-quick-view.vue"
// пикер на 1 дату с часами
import UiOneDatetimePicker from "@/views/components/ui-one-date-picker/ui-one-datatime-picker.vue"
import UiOneDateSelector from "@/views/components/ui-one-date-picker/data/ui-one-date-selector.vue"
import UiOneDaySelector from "@/views/components/ui-one-date-picker/data/ui-one-day-selector.vue"
import UiOneMonthSelector from "@/views/components/ui-one-date-picker/data/ui-one-month-selector.vue"
import UiOneHourSelector from "@/views/components/ui-one-date-picker/time/ui-one-hour-selector.vue"
import UiOneMinuteSelector from "@/views/components/ui-one-date-picker/time/ui-one-minute-selector.vue"
import UiOneTimeSelector from "@/views/components/ui-one-date-picker/time/ui-one-time-selector.vue"
import UiOneYears from "@/views/components/ui-one-date-picker/data/ui-one-year-selector.vue"
// import RunPayUiHeaderComponent from "@/views/components/run-pay/run-pay-ui-header.vue"
import UiReadonlyComponent from "@/views/components/ui-readonly.vue"
import UiTitleInfo from "@/views/components/ui-title-info.vue"
import FilterService from "@/filters/plugin.filter-service"
import VueClickAway from "vue3-click-away";
// import vClickOutside from "click-outside-vue3"
// import ClickOutside from 'vue-click-outside'
const app = createApp(App);
// регистрируем Middleware для роутов
import MiddlewareProcessor from "./middlewares/middlewareProcessor";
import Tabs from 'vue3-tabs';
app.use(MiddlewareProcessor, router);

app.use(ErrorHandler, {
  handler: (err: Error) => {
    console.error('Err: ', err);

    // app.config.globalProperties.$notification.error(err);
  },
});

import AdminApi from './api/apiDataSource.plugin';

app.use(AdminApi, { url: "http://31.31.24.200:5051/" });

import Store from "@/store"

app.use(Store);
app.use(Dialog, {});
app.use(InitService, {});
app.use(FilterService, {});
app.use(router);
// app.use(ClickOutside)
import AuthMiddleware from "@/authMiddleware";
app.use(AuthMiddleware, { router })

app.use(Tabs);
app.use(VueClickAway)
app.directive("click-outside", ClickOutside);

app.component("ui-modal-window", UiModalWindow);
app.component("ui-group-validator", UiGroupValidator);


app.component("ui-table-header-item", UiTableHeaderItem);
app.component("ui-pagination", UiPagination);
app.component("ui-table-body-item", UiTableBodyItem);
app.component("ui-table", UiTable);
app.component("ui-table-input", UiTableInput);
app.component("ui-button", UiButton);
app.component("ui-checkbox", UiCheckbox);
app.component("ui-select", UiSelect);
app.component("page-template", PageTemplate);
app.component("ui-loading", UiLoading);
app.component("ui-image-preview", UiImagePreview);
app.component("ui-crop-image", UiCropImage);
app.component("ui-file-input", UiFileInput);
app.component("ui-date-picker", UiDatePicker);
app.component("control-validation-group", ControlValidatorGroup);
app.component("ui-toggle-switcher", UiToggleSwitcherComponent);
app.component("ui-box-menu", UiBoxMenuComponent);
app.component("ui-tabs", UITabsComponent);
app.component("ui-tabs-item", UITabItemComponent);
app.component("content-table", ContentTable);
app.component("ui-update-entity-modal", UiUpdateEntityModal);
app.component("ui-select-saerch", UiSelectSearchComponent);
app.component("control-time", ControlTimeComponent);
app.component("ui-label-input", UiLableInput);
app.component("ui-schedule", UiSchedule);
app.component("ui-text-editor", UiTextEditorComponent);
app.component("ui-select-autocomplete", UiSelectAutocompleteComponent);
app.component("ui-multiselect", UiMultiselectComponent);
app.component("ui-select-option-lang", uiSelectOptionLang);
app.component("ui-datetime-range-picker", UiDatetimeRangePicker);
// app.component("ui-day-range",UiDaySelector);
app.component("ui-date-range-selector", UiDateRangeSelector);
app.component("ui-time-range-selector", UiTimeRangeSelector);
app.component("ui-select-label", UiSelectLabelComponent);
app.component("ui-datetime-picker", UiDatetimePicker);
app.component("ui-date-selector", UiDateSelector)
app.component("ui-autocomplete-multiselect", UiAutocompleteMultiselectComponent)
app.component("ui-autocomplete", UiAutocompleteComponent);
app.component("ui-quick-view", UiQuickViewComponent);
//пикер на 1 дату
app.component("ui-one-datatime-picker", UiOneDatetimePicker);
app.component("ui-one-date-selector", UiOneDateSelector);
app.component("ui-one-day-selector", UiOneDaySelector);
app.component("ui-one-month-selector", UiOneMonthSelector);
app.component("ui-one-hour-selector", UiOneHourSelector);
app.component("ui-one-minute-selector", UiOneMinuteSelector);
app.component("ui-one-time-selector", UiOneTimeSelector);
app.component("ui-one-year-selector", UiOneYears)
// app.component("run-pay-ui-header",RunPayUiHeaderComponent)
app.component("ui-readonly", UiReadonlyComponent)
app.component("ui-title-info", UiTitleInfo)
//rio psy
app.component("content", ContentComponent)
app.component("file-input", FileInput)
app.component("label-input", LableInput)
app.component("autocomplete-multiselect", AutocompleteMultiselectComponent)
app.component("toggle-switcher", ToggleSwitcherComponent)
app.component("select-autocomplete", SelectAutocompleteComponent)

app.mount("#app");
