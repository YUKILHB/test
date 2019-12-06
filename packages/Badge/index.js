import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BadgeWrap = styled.span`
  position: relative;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
`;

const BadgeSup = styled.sup`
  top: auto;
  display: block;
  position: relative;
  height: 20px;
  border-radius: 10px;
  min-width: 20px;
  background: #f04134;
  color: #fff;
  line-height: 20px;
  text-align: center;
  padding: 0 6px;
  font-size: 12px;
  white-space: nowrap;
  font-family: tahoma;
  box-sizing: border-box;
`;

export const Dot = styled.i`
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  background-color: ${props => props.color ? props.color : '#f04134'};
`;

const Badge = ({ count, style, dot }) => {
  if (dot) {
    return (
      <BadgeWrap>
        <Dot />
      </BadgeWrap>  
    )
  }
  const text = count >= 100 ? '99+' : count;
  return (
    <BadgeWrap>
      <BadgeSup style={style}>{text}</BadgeSup>
    </BadgeWrap>
  )
}

Badge.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object, // eslint-disable-line
  dot: PropTypes.bool,
};

Badge.defaultProps = {
  count: '',
  style: {},
  dot: false,
};


export default Badge;
