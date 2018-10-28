import React from 'react';
import { Toast } from 'teaset';
import { FlatList, View, TouchableOpacity, Alert, NativeModules } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-crop-picker';
import BaseToolbarLayout from '../../../components/base/BaseToolbarLayout';
import MineAccountSectionItem from '../../../components/mine/MineAccountSectionItem';
import CommonUtils from '../../../utils/CommonUtils';
import CommonButtonLayout from '../../../components/base/CommonButtonLayout';
import MineBottomModel from '../../../components/mine/baseMessage/MineBottomModel';
import * as MineApi from '../../../api/mine/MineApi';
import CommonProgressLayout from '../../../components/base/CommonProgressLayout';

export default class MineBaseMessagePage extends React.PureComponent {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);
    this.userinfo = props.navigation.state.params.userInfo;
    this.state = {
      data: this.updateDate(this.userinfo),
      photo: this.userinfo.photo_url,
    };
  }

  renderProgress() {
    return (
      <CommonProgressLayout
        ref={ref => {
          this.commonProgress = ref;
        }}
      />
    );
  }

  updateDate(userInfo) {
    let data = [];
    if (userInfo.login_name == null || userInfo.login_name === '') {
      data = [
        { title: '昵称', details: global.dealEmptyWord(userInfo.nike_name, '暂无') },
        { title: '用户名', details: '设置' },
        { title: '基本资料', details: '修改' },
        { title: '手机号码', details: global.dealEmptyWord(userInfo.mobile, '暂无') },
        { title: '修改密码', details: '修改' },
        { title: '版本更新', details: CommonUtils.version },
      ];
    } else {
      data = [
        { title: '昵称', details: global.dealEmptyWord(userInfo.nike_name, '暂无') },
        { title: '基本资料', details: '修改' },
        { title: '手机号码', details: global.dealEmptyWord(userInfo.mobile, '暂无') },
        { title: '修改密码', details: '修改' },
        { title: '版本更新', details: CommonUtils.version },
      ];
    }
    return data;
  }

  // 更新用户头像
  updateAvtar(avatar) {
    MineApi.updateUserAvatarRequest(this.userinfo.id, avatar)
      .then(response => {
        this.commonProgress.hidden();
        this.userinfo.photo_url = avatar;
        this.setState({
          photo: this.userinfo.photo_url,
        });
      })
      .catch((error) => {
        this.commonProgress.hidden();
      });
  }

  // 检查更新
  checkUpDate() {
    MineApi.checkUpdate()
      .then(response => {
        if (CommonUtils.version !== response.value) {
          Alert.alert(
            '提示',
            '程序有新版本,是否更新?',
            [
              {
                text: '取消',
                style: 'cancel'
              },
              {
                text: '确定',
                onPress: () => {
                  Toast.info('程序下载中, 请稍后');
                  // 下载程序
                  NativeModules.upgrade.upgrade('http://lottery.xiaohuaikeji.cn/edition/app-release.apk');
                }
              }
            ]);
        }
      })
      .catch(error => {

      });
  }

  // 上传图片
  uploadImage() {
    this.modelBottom.setState({
      modalVisible: false,
    });
    setTimeout(() => {
      this.commonProgress.show();
      MineApi.uploadImageRequest(this.uriPath)
        .then(response => {
          this.updateAvtar(response);
        })
        .catch(error => {
          this.commonProgress.hidden();
        });
    }, 500);
  }

  renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.item.title === '版本更新') {
            // 检查更新
            if (CommonUtils.Platform !== 'IOS') {
              this.checkUpDate();
            }
          } else {
            this.props.navigation.navigate('MineEditMessagePage', {
              title: item.item.title === '修改密码' ? '密码' : item.item.title,
              type: item.item.title === '手机号码' ? '下一步' : '确认',
              id: this.userinfo.id,
              login_name: global.dealEmptyWord(this.userinfo.login_name, ''),
              mobile: this.userinfo.mobile,
              userInfo: this.userinfo,
              callBack: (text) => {
                let { data } = this.state;
                if (item.item.title === '昵称') {
                  this.userinfo.nike_name = text;
                } else if (item.item.title === '用户名') {
                  this.userinfo.login_name = text;
                } else if (item.item.title === '手机号码') {
                  this.userinfo.mobile = text;
                }
                data = this.updateDate(this.userinfo);
                this.setState({
                  data
                });
              },
              userDetailCallBack: (gender, province, city, qq, email, provinceId) => {
                let { data } = this.state;
                this.userinfo.gender = gender;
                this.userinfo.province = province;
                this.userinfo.city = city;
                this.userinfo.qq = qq;
                this.userinfo.email = email;
                this.userinfo.provinceId = provinceId;
                data = this.updateDate(this.userinfo);
                this.setState({
                  data
                });
              }
            });
          }
        }}
      >
        <MineAccountSectionItem
          time={item.item.title}
          statusString={item.item.details}
          timeStyle={{ color: '#010D2D' }}
          style={{ zIndex: 999 - item.index, height: 44 }}
        />
      </TouchableOpacity>
    );
  };

  renderSeparato = () => (
    <View style={{ height: 2, backgroundColor: '#FAFAFb' }} />
  );

  renderHeader = (photo) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        this.modelBottom.setModalVisible(true);
      }}
    >
      <MineAccountSectionItem
        time={'头像'}
        timeStyle={{ color: '#010D2D' }}
        statusString={'111'}
        style={{ height: 88, marginTop: 10, marginBottom: 5, elevation: 0 }}
        avatar={`http://${global.dealEmptyWord(photo, '7xrfe5.com1.z0.glb.clouddn.com/0.jpg')}`}
      />
    </TouchableOpacity>
  );

  renderFooter = () => (
    <CommonButtonLayout
      style={{ marginTop: 100, marginBottom: 10 }}
      contextString={'退出登录'}
      onPress={() => {
        global.storage.remove({
          key: global.loginKey
        });
        const { navigation } = this.props;
        const reserAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'LoginPage' })]
        });
        navigation.dispatch(reserAction);
      }}
    />
  );

  // 照片选择弹窗
  showModel() {
    return (
      <MineBottomModel
        ref={ref => {
          this.modelBottom = ref;
        }}
        photoOnPress={() => {
          ImagePicker.openCamera({
            cropping: true,
            compressImageQuality: 0.01,
          }).then(image => {
            this.uriPath = image.path;
            if (this.uriPath != null) {
              this.uploadImage();
            }
          });
        }}
        cameraOnPress={() => {
          ImagePicker.openPicker({
            multiple: false,
            cropping: true,
            compressImageQuality: 0.1,
            mediaType: 'photo',
          }).then(image => {
            this.uriPath = image.path;
            if (this.uriPath != null) {
              this.uploadImage();
            }
          });
        }}
      />
    );
  }

  render() {
    const { photo } = this.state;
    return (
      <BaseToolbarLayout
        navigation={this.props.navigation}
        toolbarConfig={{
          title: '个人信息',
          hasLeft: true,
          leftTitle: '我的',
        }}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index + item + ''}
          ItemSeparatorComponent={this.renderSeparato}
          ListHeaderComponent={this.renderHeader(photo)}
          ListFooterComponent={this.renderFooter}
        />
        {this.showModel()}
        {this.renderProgress()}
      </BaseToolbarLayout>
    );
  }
}
