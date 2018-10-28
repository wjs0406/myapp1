import React from 'react';
import PropTypes from 'prop-types';
import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import CommonUtils from '../../utils/CommonUtils';

export default class CommonTabView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowLeft: false,
      left: 0,
    };
  }

  componentDidMount() {
    this.renderUnderlineLeft();
  }

  renderUnderlineLeft = () => {
    const width = this.props.underLineWidth == null
    || this.props.underLineWidth === 0
      ? 0
      : this.props.underLineWidth;
    if (width !== 0) {
      this.setState({
        isShowLeft: true,
        left: this.props.containerWidth / this.props.children.length / 2 - width / 2
      });
    }
  };

  renderTabbar = () => {
    if (this.props.isShowMuti === false) {
      return (
        <DefaultTabBar
          ref={ref => {
            this.defaultTabbar = ref;
          }}
          style={{ height: 40, borderWidth: 0 }}
          underlineStyle={[
            {
              backgroundColor: 'rgb(255, 218, 0)',
            },
            this.state.isShowLeft ? { left: this.state.left, width: this.props.underLineWidth } : null,
            this.props.underLineStyle
          ]}
          tabStyle={{
            paddingBottom: 0,
            backgroundColor: 'transparent',
          }}
          textStyle={this.props.textStyle}
          containerWidth={this.props.containerWidth}
        />
      );
    }
    return (
      <ScrollableTabBar
        ref={ref => {
          this.defaultTabbar = ref;
        }}
        style={{ height: 40, borderWidth: 0 }}
        underlineStyle={[
          {
            backgroundColor: 'rgb(255, 218, 0)',
          },
          this.props.underLineStyle
        ]}
        tabStyle={{
          paddingBottom: 0,
          backgroundColor: 'transparent',
        }}
        textStyle={this.props.textStyle}
        containerWidth={this.props.containerWidth}
      />
    );
  }

  render() {
    return (
      <ScrollableTabView

        tabBarActiveTextColor={'rgb(1,13,45)'}
        tabBarInactiveTextColor={'rgba(1,13,45,0.4)'}
        renderTabBar={this.renderTabbar}
        style={[
          {
            width: CommonUtils.width,
            flex: 1,
            paddingBottom: 48,
            backgroundColor: 'white',
          },
          this.props.style,
        ]}
        onChangeTab={value => {
          this.props.onChangeTab(value.i);
        }}
      >
        {this.props.children}
      </ScrollableTabView>
    );
  }
}

CommonTabView.propTypes = {
  style: PropTypes.object,
  underLineWidth: PropTypes.number,
  underLineStyle: PropTypes.object,
  onChangeTab: PropTypes.func,
  containerWidth: PropTypes.number,
  textStyle: PropTypes.object,
  isShowMuti: PropTypes.bool,
};

CommonTabView.defaultProps = {
  style: {},
  underLineWidth: 0,
  onChangeTab: () => {
    // tab改变
  },
  underLineStyle: {}, // 方法内部不可以写宽度 underLineWidth字段写宽度
  containerWidth: CommonUtils.width,
  textStyle: {},
  isShowMuti: false,
};
