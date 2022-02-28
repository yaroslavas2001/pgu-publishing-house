/* eslint no-param-reassign: 0 */
const defaultOption = {
    useSaveFunction: true,
    useRetrieveFunction: true,
    onSave: value => JSON.stringify(value),
    onRetrieve: value => JSON.parse(value),
};
export default {
    install(Vue, option) {
        const baseOptions = {
            ...defaultOption,
            ...option,
        };
        Vue.prototype.$localStorage = generateStorageObject(
            window.localStorage,
            baseOptions,
        ); // We will add later this code
        Vue.prototype.$sessionStorage = generateStorageObject(
            window.localStorage,
            baseOptions,
        ); // We will add later this code
    },
};