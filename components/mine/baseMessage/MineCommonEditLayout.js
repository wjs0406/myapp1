import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import LoginInputLayout from '../../login/LoginInputLayout';
import MineFooterLayout from '../MineFooterLayout';
import MineAccountSectionItem from '../MineAccountSectionItem';
import Toast from 'teaset/components/Toast/Toast';


const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    height: 70,
  },
});

export default class MineCommonEditLayout extends React.PureComponent {
  renderInput = (title, placeTitle, mTop, mainInputConfig) => (
    <LoginInputLayout
      {...{
        titleDefaultValue: title,
        inputPlaceHolderStr: placeTitle,
      }}
      style={[styles.inputStyle, { marginTop: mTop }]}
      {...mainInputConfig}
    />
  );

  renderFooter = title => (
    <MineFooterLayout details={title} style={{ marginTop: 10 }} />
  );

  renderItem = (title, details, zIndex) => (
    <MineAccountSectionItem
      style={{ height: 44, zIndex, }}
      time={title}
      spendingStirng={details}
      timeStyle={{ color: '#010D2D' }}
      viewStyle={{ width: 5 }}
    />
  );

  renderCheckItem = (title, zIndex, userInfo) => (
    <MineAccountSectionItem
      style={{ height: 44, zIndex, }}
      time={title}
      timeStyle={{ color: '#010D2D' }}
      viewStyle={{ width: 5 }}
      type={1}
      gender={userInfo.gender}
      passGenderFunc={(text) => {
        this.props.passGenderFunc(text);
      }}
    />
  );

  renderSelectItem = (title, zIndex, userInfo) => (
    <MineAccountSectionItem
      style={{ height: 44, zIndex, }}
      time={title}
      timeStyle={{ color: '#010D2D' }}
      viewStyle={{ width: 5 }}
      type={2}
      proDefault={global.dealEmptyWord(userInfo.province, '省份')}
      cityDefault={global.dealEmptyWord(userInfo.city, '城市')}
      passCityFunc={this.props.passCityFunc}
      passProvinceFunc={this.props.passProvinceFunc}
      provinceId={this.props.userInfo.provinceId}
    />
  );

  renderTestfy = (mainInputConfig) => (
    <LoginInputLayout
      {...{
        titleDefaultValue: '验证码',
        inputPlaceHolderStr: '短信验证码',
        isShowTestfy: true,
        verCodeType: 'update',
        mId: this.props.userInfo.id,
      }}
      style={styles.inputStyle}
      {...mainInputConfig}
    />
  );

  renderChild = () => {
    const arr = [];
    const { props } = this;
    if (this.props.type === '昵称') {
      arr.push(this.renderInput('昵称', '输入修改后的昵称', 10, props.mainInputConfig));
    } else if (this.props.type === '用户名') {
      arr.push(this.renderInput('用户名', '输入您的用户名', 10, props.mainInputConfig));
      arr.push(this.renderInput('密码', '输入您的密码', 10, props.secondInputConfig));
      arr.push(
        this.renderFooter(
          '注意：用户名只能设置一次，请谨慎填写。',
        ),
      );
    } else if (this.props.type === '密码') {
      arr.push(this.renderItem('用户名', this.props.loginName, 999));
      arr.push(this.renderInput('密码', '输入您的密码', 0, props.mainInputConfig));
      arr.push(this.renderInput('确认密码', '确认您的密码', 0, props.secondInputConfig));
      arr.push(
        this.renderFooter('注意：建议密码应用字母数字组合，混合大小写。'),
      );
    } else if (
      this.props.type === '手机号码' && this.props.footerType === '下一步') {
      arr.push(this.renderItem('原号码', this.props.mobile, 999));
      arr.push(this.renderTestfy(this.props.mainInputConfig));
      arr.push(this.renderFooter('注意：为了您的账户安全，请您验证身份。'));
    } else if (
      this.props.type === '手机号码' && this.props.footerType === '确认') {
      arr.push(this.renderInput('新号码', '请输入您的新手机号码', 10, this.props.mainInputConfig));
      arr.push(this.renderTestfy(this.props.secondInputConfig));
    } else if (this.props.type === '基本资料') {
      arr.push(this.renderItem('用户名', global.dealEmptyWord(props.userInfo.login_name, '暂无'), 998));
      arr.push(this.renderItem('手机号码', global.dealEmptyWord(props.userInfo.mobile, '暂无'), 997));
      arr.push(this.renderCheckItem('性别', 996, props.userInfo));
      arr.push(this.renderSelectItem('居住地', 995, props.userInfo));
      arr.push(this.renderInput('QQ号码', '请输入您的QQ', 5, props.mainInputConfig));
      arr.push(this.renderInput('邮箱', '请输入您的邮箱', 2, props.secondInputConfig));
    }
    return arr;
  };

  render() {
    return (
      <View>
        {this.renderChild()}
      </View>
    );
  }
}
MineCommonEditLayout.propTypes = {
  type: PropTypes.string,
  footerType: PropTypes.string,
  mainInputConfig: PropTypes.object,
  secondInputConfig: PropTypes.object,
  loginName: PropTypes.string,
  mobile: PropTypes.string,
  userInfo: PropTypes.object,
  passGenderFunc: PropTypes.func,
  passProvinceFunc: PropTypes.func,
  passCityFunc: PropTypes.func,
};

MineCommonEditLayout.defaultProps = {
  type: '', // 判别的类型: 昵称, 用户名, 修改密码, 修改手机号, 基本信息
  footerType: '',
  mainInputConfig: {},
  secondInputConfig: {},
  loginName: '',
  mobile: '',
  userInfo: {},
  passGenderFunc: () => {},
  passProvinceFunc: () => {},
  passCityFunc: () => {},

};
