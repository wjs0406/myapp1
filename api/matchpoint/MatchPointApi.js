import api from '../base';

// 足球比分列表
export function matchPointListRequest(score_type) {
  return api.post('/index.php/lottery/lotteryType/match_score_foot', {
    score_type
  });
}

// 篮球比分列表
export function basketBallPointListRequest(score_type) {
  return api.post('/index.php/lottery/lotteryType/match_score_basket', {
    score_type
  });
}

// 彩票事件技术统计
export function matchEventRequest(match_id) {
  return api.post('/index.php/lottery/lotteryType/match_statistics', {
    match_id
  });
}
