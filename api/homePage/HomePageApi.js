import api from '../base';

// 首页
export function homePageRequest() {
  return api.get('/index.php/lottery/index/index');
}

// 是否中奖
export function isGetRewardRequest(member_id) {
  return api.post('/index.php/lottery/index/getWinning', {
    member_id,
  });
}

// 足球赛事
export function soccerLotteryRerquest(lottery_id, play, play_flg) {
  return api.post('/index.php/lottery/lotteryType/competitive', {
    lottery_id,
    play,
    play_flg
  });
}

// 支付宝支付接口
export function aliPayRequest(out_trade_no, total_amount) {
  return api.post('/index.php/lottery/Pay/index', {
    out_trade_no,
    total_amount
  });
}

// 赛事筛选
export function searchSocceryLotteryRequest(lottery_type_id, odds, match_type_name, play, play_flg) {
  return api.post('/index.php/lottery/lotteryType/match_search', {
    lottery_type_id,
    odds,
    match_type_name,
    play,
    play_flg
  });
}

// 篮球彩票
export function basketBallLotteryRequest(lottery_id, play) {
  return api.post('/index.php/lottery/lotteryType/competitive', {
    lottery_id,
    play
  });
}

// 足球购彩下单
export function buySoccerLotteryRequest(
  member_id,
  rlottery_type_id,
  money,
  multiple,
  orderInfor,
  play_flg,
  num_note,
  num_term
) {
  return api.post('/index.php/lottery/order/order_buy', {
    member_id,
    rlottery_type_id,
    money,
    multiple,
    orderInfor,
    play_flg,
    num_note,
    num_term
  });
}

// 胜负彩/任选9
export function chooseNineRequest(lottery_id) {
  return api.post('/index.php/lottery/lotteryType/competitive', {
    lottery_id
  });
}

// 计算注数
export function getBuyLotteryNumRequest(rlottery_type_id, orderInfor, play_flg) {
  // alert(`代码走到调用接口了，传的参数分别是：${rlottery_type_id},${orderInfor},${play_flg}`);
  return api.post('/index.php/lottery/calculateOrder/split', {
    rlottery_type_id,
    orderInfor,
    play_flg,
  });
}

