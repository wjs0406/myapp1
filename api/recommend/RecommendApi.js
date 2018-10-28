import api from '../base';

// 推荐列表
export function RecommendListRequest(pageNum, size, member_id, word_key) {
  return api.post('/index.php/lottery/recommend/recommend_list', {
    pageNum,
    size,
    member_id,
    word_key
  });
}

// 推荐一键下单
export function buyRecommendRequest(
  member_id,
  recommend_id,
  money,
  multiple,
  orderInfor
) {
  return api.post('/index.php/lottery/order/order_buy', {
    member_id,
    recommend_id,
    money,
    multiple,
    orderInfor
  });
}
