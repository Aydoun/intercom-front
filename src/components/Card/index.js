import React, { memo } from 'react';
import { node, string } from 'prop-types';
import { Typography } from 'antd';
import './card.scss';

const { Text } = Typography;

const Card = ({ icon, text, extra }) => (
  <div className="info-card" >
    <div className="info-card__text">
      <span className="info-card__icon">
        {icon && icon}
      </span>
      <Text code>{text}</Text>
    </div>
    <div>
      {extra && extra }
    </div>
  </div>
);
    
Card.propTypes = {
  icon: node,
  text: string.isRequired,
  extra: node,
}
  
export default memo(Card);
  