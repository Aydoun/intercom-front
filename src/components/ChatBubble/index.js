import React, { memo } from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';
import './bubble.scss';

const getClasss = right => classnames('chat-bubble', { 'chat-bubble--right': right });

const Bubble = ({ time, text, right }) => {
  return (
    <div className={getClasss(right)} >
      <div className="chat-bubble__container">
        <span className="chat-bubble__container--text">{text}</span>
        <span className="chat-bubble__container--timestamp">{time}</span>
      </div>
    </div>
  );
};

Bubble.propTypes = {
  right: bool,
  text: string.isRequired,
  time: string,
}

Bubble.defaultProps = {
  right: false,
}

export default memo(Bubble);
