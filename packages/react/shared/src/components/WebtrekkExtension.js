import PropTypes from 'prop-types';
import WebtrekkReactComponent from './data/WebtrekkReactComponent';

class WebtrekkExtension extends WebtrekkReactComponent {
    constructor() {
        super('extension');
    }

    componentDidMount() {
        this.addExtension(this.props.name, this.props.action, this.props.config);
    }
}

WebtrekkExtension.propTypes = {
    name: PropTypes.string.isRequired,
    action: PropTypes.string,
    config: PropTypes.object
};

WebtrekkExtension.defaultProps = {
    name: null,
    action: null,
    config: null
};

export default WebtrekkExtension;
