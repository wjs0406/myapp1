import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import CommonUtils from '../../../../utils/CommonUtils';

const styles = StyleSheet.create({
  // 全部按钮背景
  totalButtonsBackStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: 'white',
  },

  // 按钮背景
  buttonBackStyle: {
    height: 40,
    marginBottom: 5,
    width: (CommonUtils.width - 30 - 16) / 3,
    borderWidth: 1,
    borderColor: 'rgb(105,114,137)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 按钮文字
  buttonTextStyle: {
    fontSize: 15,
    color: 'rgb(105,114,137)',
  },
});

export default class MixPassSearchButtosLayout extends Component {
  constructor(props) {
    super(props);
    const leagues = props.chooseLeagues.split(',');
    this.state = {
      chooseTitle: leagues,
    };
  }

  componentWillReceiveProps(props) {
    const leagues = props.chooseLeagues.split(',');
    this.state = {
      chooseTitle: leagues,
    };
  }

  renderButtons() {
    const viewsArr = [];
    const { titlesArr, clickButtonFunc, isMutiSelected, passChooseArrFunc } = this.props;
    const { chooseTitle } = this.state;
    for (let i = 0; i < titlesArr.length; i += 1) {
      let left = 8;
      if ((i % 3) === 0) {
        left = 0;
      }
      let textColor = 'rgb(105,114,137)';
      let backColor = 'transparent';
      let bw = 1;

      for (let j = 0; j < chooseTitle.length; j += 1) {
        const title = chooseTitle[j];
        if (title === titlesArr[i]) {
          textColor = 'white';
          backColor = CommonUtils.themeColor;
          bw = 0;
        }
      }

      viewsArr.push(
        <TouchableOpacity
          style={[
            styles.buttonBackStyle,
            {
              marginLeft: left,
              borderWidth: bw,
              backgroundColor: backColor,
            }]}
          activeOpacity={1}
          onPress={() => {
            let chooseTitles = chooseTitle;
            if (isMutiSelected === false) {
              chooseTitles = [];
              clickButtonFunc(titlesArr[i]);
              
              this.setState({
                chooseTitle: [titlesArr[i]],
              });
            } else {
              for (let k = 0; k < chooseTitles.length; k += 1) {
                const title = chooseTitles[k];
                if (titlesArr[i] === title) {
                  chooseTitles.splice(k, 1);
                  passChooseArrFunc(chooseTitles);
                  this.setState({
                    chooseTitle: chooseTitles,
                  });
                  return;
                }
              }
              chooseTitles.push(titlesArr[i]);
              passChooseArrFunc(chooseTitles);
              this.setState({
                chooseTitle: chooseTitles,
              });
            }
          }}
        >
          <Text style={[styles.buttonTextStyle, { color: textColor }]}>
            {titlesArr[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return viewsArr;
  }

  render() {
    return (
      <TouchableOpacity style={styles.totalButtonsBackStyle} activeOpacity={1}>
        {this.renderButtons()}
      </TouchableOpacity>
    );
  }
}

MixPassSearchButtosLayout.propTypes = {
  clickButtonFunc: PropTypes.func,
  titlesArr: PropTypes.arrayOf(PropTypes.string),
  // defaultChooseTitle: PropTypes.string,
  isMutiSelected: PropTypes.bool, // 是否多选
  passChooseArrFunc: PropTypes.arrayOf(PropTypes.string),
  chooseLeagues: PropTypes.string,
  isClearChooseTitle: PropTypes.bool,
};

MixPassSearchButtosLayout.defaultProps = {
  clickButtonFunc: () => {},
  titlesArr: [],
  // defaultChooseTitle: '',
  isMutiSelected: true,
  passChooseArrFunc: () => {},
  chooseLeagues: '',
  isClearChooseTitle: false,
};
