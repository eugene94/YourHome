import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import * as CommonUtil from '../../util/commonUtil';

const TableList = styled.div`
  overflow: auto;
  color: black;

  /* Scroll Custom */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 0px;
  }
`;

const OrderListTableList = ({ orderList }) => (
  <TableList className={classNames('tbody')}>
    {orderList instanceof Array
      && orderList.map((order, index) => (
        <div key={`${order._id}_${index}`} className="tbodyTr">
          <div className={classNames('tbodyTd')}>{order.itemName}</div>
          <div className={classNames('tbodyTd', 'text-center')}>{order.itemCount}</div>
          <div className={classNames('tbodyTd', 'text-center')}>
            {`￦ ${CommonUtil.setCostFormat(order.itemCost)}`}
          </div>
          <div className={classNames('tbodyTd', 'text-center')}>
            {`￦ ${CommonUtil.setCostFormat(order.itemCost)}`}
          </div>
          <div className={classNames('tbodyTd', 'text-center')}>
            {`￦ ${CommonUtil.setCostFormat(order.itemCost)}`}
          </div>
        </div>
      ))}
  </TableList>
);

export default OrderListTableList;
