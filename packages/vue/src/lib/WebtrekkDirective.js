import {generalHandler} from './handlerFunctions';

const webtrekkDirective = {
    name: 'webtrekk',
    mounted: function(element, binding) {
        const dataValue = binding.value;
        const mode = binding.modifiers;
        const keyValues = typeof dataValue === 'object' ? Object.keys(dataValue) : [];

        /**
         * @param {Object} data
         * @param {Object} modeObj
         */
        const modHandler = (data, modeObj) => {
            // generates a keylist and data object for general handler to use
            // based on active mods and the data given
            const modes = Object.keys(modeObj);
            const generalData = {};

            modes.forEach(m => {
                generalData[m] = data;
            });

            generalHandler(generalData, modes, element);
        };

        if (Object.entries(mode).length === 0) {
            generalHandler(dataValue, keyValues, element);
        }
        else {
            modHandler(dataValue, mode);
        }
    }
};
webtrekkDirective.inserted = webtrekkDirective.mounted;

export default webtrekkDirective;
