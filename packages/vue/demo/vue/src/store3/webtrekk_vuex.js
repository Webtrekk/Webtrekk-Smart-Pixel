import app from '../main3';

const webtrekkVuexPlugin = store => {
    store.subscribe((mutation, state) => {
        if (mutation.type === 'REMOVE_CLICK') {
            app.config.globalProperties.$webtrekk.action({name: 'removed click', parameter: {1: 'Overall clicks: ' + state.clicks}});
            app.config.globalProperties.$webtrekk.track();
        }
    });
};

export default webtrekkVuexPlugin;
