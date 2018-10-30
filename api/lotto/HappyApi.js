import api from '../base';

// 大乐透获取注数
export function happybetnum(q_data,h_data) {
  return api.post('/index.php/lottery/lotto/getDLTNote', {
    "q_data": q_data,
    "h_data": h_data
  });
}

// 大乐透下单
export function happybuy(member_id, rlottery_type_id, num_note, multiple, money, num_term, play_name, is_bool_append, orderInfor) {

  return api.post('/index.php/lottery/lotto/order_buy_DLT', {
    "member_id": member_id,//会员id global.userId
    "rlottery_type_id": rlottery_type_id,
    "num_note": num_note,
    "multiple": multiple,
    "money": money,
    "num_term": num_term,
    "play_name": play_name,
    "is_bool_append": is_bool_append, //1-不追加，2-追加
    "orderInfor": orderInfor
  });
}


// 七星彩获取注数
export function sevenbetnum(one_data) {
  return api.post('/index.php/lottery/lotto/getQXCNote', {
    "orderInfor": one_data
  });
}


// 七星彩下单
export function sevenbuy(member_id, rlottery_type_id, num_note,money, num_term, play_name, multiple, orderInfor) {
return api.post('/index.php/lottery/lotto/order_buy_QXC', {
  "member_id": member_id,//会员id global.userId
  "rlottery_type_id": rlottery_type_id,
  "num_note": num_note,
  "money": money,
  "num_term": num_term,
  "play_name": play_name,
  "multiple": multiple,
  "orderInfor": orderInfor
});
}

// 七星彩获取期号和截止时间
export function termTime(lottery_id) {
  return api.post('/index.php/lottery/lotto/getLatestIssue', {
    "lottery_id": lottery_id
  });
}
