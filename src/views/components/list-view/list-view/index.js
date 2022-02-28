import Vue from 'vue'

import uiListViewItemCheck from './src/ui-list-view-item-check.vue';
import uiListViewItem from './src/ui-list-view-item.vue';
import uiListViewTabs from './src/ui-list-view-tabs.vue';
import uiListView from './src/ui-list-view.vue';
import ListViewItem from './src/listviewitem'

var components = [
  uiListViewItemCheck,
  uiListViewItem,
  uiListViewTabs,
  uiListView
]

components.forEach(function(component) {
  Vue.component(component.extendOptions.name, component);
})

export default components;
export {
  ListViewItem
}
