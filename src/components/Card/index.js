import React, { memo } from 'react';
import { node, string } from 'prop-types';
import './card.scss';

const Card = ({ icon, text, extra }) => (
  <div className="info-card" >
    <div>
      <span className="info-card__icon">
        {icon && icon}
      </span>
      {text}
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
  
