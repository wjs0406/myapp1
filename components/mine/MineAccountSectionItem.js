import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Select } from 'teaset';
import MineCommonCheck from './MineCommonCheck';
import * as MineApi from '../../api/mine/MineApi';

const rightIcon = require('../../image/matchPoint/Home_ic_next.png');
const upIcon = require('../../image/mine/cityUp.png');
const dowxIcon = require('../../image/mine/cityDown.png');

export default class MineAccountSectionItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cityItems = []; // 根据选择的省变换
    this.genderStr = '女士';
    if (props.gender === 1) {
      this.genderStr = '男士';
    }
    this.provinceTodalData = [];
    this.state = {
      value: props.proDefault,
      provincesStatus: true, // 0合起来, 1展开
      cityValue: props.cityDefault,
      cityStatus: true, // // 0合起来, 1展开,
      provinceDataSource: [], // 省数据源
      cityDataSource: [], // 城市数据源
    };
  }

  componentDidMount() {
    if (this.props.type === 2) {
      this.getProvince();
      this.getCity(this.props.provinceId);
    }
  }

  // 获取省
  getProvince() {
    MineApi.getProvinceRequest()
      .then(response => {
        this.provinceTodalData = response;
        const proArr = [];
        for (let i = 0; i < response.length; i += 1) {
          proArr.push(response[i].areaName);
        }
        this.setState({
          provinceDataSource: proArr,
        });
      })
      .catch(() => {

      });
  }

  // 获取城市
  getCity(pId) {
    MineApi.getCityRequest(pId)
      .then(response => {
        const cityArr = [];
        for (let i = 0; i < response.length; i += 1) {
          cityArr.push(response[i].areaName);
        }
        this.setState({
          cityDataSource: cityArr
        });
      })
      .catch(() => {

      });
  }

  getTypeRenderRight = () => {
    if (this.props.type === 0) {
      return this.getRightComponent();
    }
    if (this.props.type === 1) {
      return this.getRightCheckComponent();
    }
    return this.getRightSelectComponent();
  };

  // 选择框
  getRightSelectComponent = () => (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        marginRight: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Select
        style={{ borderColor: '#00000000', width: 85 }}
        value={this.state.value}
        valueStyle={{ color: '#697289', fontSize: 15, textAlign: 'right' }}
        items={this.state.provinceDataSource}
        placeholder={this.props.proDefault}
        placeholderTextColor={'#697289'}
        pickerType="popover"
        onSelected={(item, index) => {
          const data = this.provinceTodalData[index];
          this.getCity(data.areaId);
          this.props.passProvinceFunc(item, this.provinceTodalData[index].areaId);
          this.setState({
            value: item,
            provincesStatus: true,
            cityValue: '城市',
          });
          this.props.passCityFunc('城市');
        }}
        icon={this.state.provincesStatus ? dowxIcon : upIcon}
        iconTintColor={'#FFDA00'}
      />
      <Select
        style={{ borderColor: '#00000000', width: 85 }}
        value={this.state.cityValue}
        valueStyle={{ color: '#697289', fontSize: 15, textAlign: 'right' }}
        items={this.state.cityDataSource}
        placeholder={this.props.cityDefault}
        placeholderTextColor={'#697289'}
        pickerType="popover"
        onSelected={(item, index) => {
          this.props.passCityFunc(item);
          this.setState({
            cityValue: item,
            cityStatus: true,
          });
        }}
        icon={this.state.cityStatus ? dowxIcon : upIcon}
        iconTintColor={'#FFDA00'}
      />
    </View>
  );

  // 单选框
  getRightCheckComponent() {
    const { genderStr } = this;
    let defaultStatus1 = false;
    let defaultStatus2 = false;
    if (genderStr === '男士') {
      defaultStatus1 = false;
      defaultStatus2 = true;
    } else {
      defaultStatus1 = true;
      defaultStatus2 = false;
    }


    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginRight: 30,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <MineCommonCheck
          ref={ref => {
            this.mineCommonCheckWM = ref;
          }}
          title={'女士'}
          onPress={() => {
            this.mineCommonCheckWM.setValueStatus(true);
            this.mineCommonCheck.setValueStatus(false);
            this.genderStr = '女士';
            this.props.passGenderFunc(this.genderStr);
          }}
          statusDefault={defaultStatus1}
        />
        <MineCommonCheck
          ref={ref => {
            this.mineCommonCheck = ref;
          }}
          title={'男士'}
          onPress={() => {
            this.mineCommonCheckWM.setValueStatus(false);
            this.mineCommonCheck.setValueStatus(true);
            this.genderStr = '男士';
            this.props.passGenderFunc(this.genderStr);
          }}
          statusDefault={defaultStatus2}
        />
      </View>
    );
  }

  getRightComponent = () => (
    this.props.statusString === '' ? this.renderText() : this.renderImage()
  )

  renderImage = () => (
    <View
      style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center' }}
    >
      {this.props.avatar === '' ? this.renderAvatarText() : this.renderAvatar()}
      <Image
        source={rightIcon}
        style={{
          width: 22,
          height: 22,
        }}
      />
    </View>
  );

  renderText = () => (
    <Text
      style={[
        { color: '#697289', fontSize: 13, marginRight: 30 },
        this.props.textStyle,
      ]}
    >
      {this.props.spendingStirng}
    </Text>
  );

  renderAvatar = () => (
    <Image
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'red',
      }}
      source={{ uri: this.props.avatar }}
      cache="force-cache"
    />
  );

  renderAvatarText = () => (
    <Text style={{ color: '#697289', fontSize: 15 }}>
      {this.props.statusString}
    </Text>
  );

  render() {
    return (
      <View
        style={[
          {
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#010D2D',
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 1 },
            elevation: 1,
            zIndex: 999
          },
          this.props.style,
        ]}
      >
        <View
          style={{
            flex: 1,
            height: 32,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={[
              {
                width: 4,
                height: 16,
                backgroundColor: '#010D2D',
                marginLeft: 15,
              },
              this.props.viewStyle,
            ]}
          />
          <Text
            style={[
              {
                fontSize: 15,
                color: '#697289',
                marginLeft: 21,
                alignItems: 'center',
                justifyContent: 'center',
              },
              this.props.timeStyle,
            ]}
          >
            {this.props.time}
            <Text style={this.props.timeDetailsStyle}>
              {this.props.timeDetailsString}
            </Text>
          </Text>
        </View>
        {this.getTypeRenderRight()}
      </View>
    );
  }
}

MineAccountSectionItem.propTypes = {
  style: PropTypes.object,
  viewStyle: PropTypes.object,
  timeStyle: PropTypes.object,
  textStyle: PropTypes.object,
  time: PropTypes.string,
  spendingStirng: PropTypes.string,
  statusString: PropTypes.string,
  timeDetailsString: PropTypes.string,
  timeDetailsStyle: PropTypes.object,
  avatar: PropTypes.string,
  type: PropTypes.number,
  proDefault: PropTypes.string,
  cityDefault: PropTypes.string,
  gender: PropTypes.string,
  passGenderFunc: PropTypes.func,
  passProvinceFunc: PropTypes.func,
  passCityFunc: PropTypes.func,
  provinceId: PropTypes.string,
};

MineAccountSectionItem.defaultProps = {
  style: {},
  viewStyle: {},
  timeStyle: {},
  textStyle: {},
  time: '',
  spendingStirng: '',
  statusString: '', // 状态为''标识右部视图不可点击
  timeDetailsString: '', // 由于现实title不一样颜色文字
  timeDetailsStyle: {},
  avatar: '', // 如有图片地址,显示图片
  type: 0, // 文字图片0, check1, 单选框2
  proDefault: '省份',
  cityDefault: '城市',
  gender: '女士',
  passGenderFunc: () => {},
  passProvinceFunc: () => {},
  passCityFunc: () => {},
  provinceId: '',

};
