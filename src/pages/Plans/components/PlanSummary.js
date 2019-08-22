import React, { memo } from 'react';
import { object } from 'prop-types';
import { Avatar, Descriptions, Badge, Upload } from 'antd';
import { readableDate } from 'utils';

const PlanSummary = props => {
  const { plan } = props;

  return (
    <div className="plans__overview">
      <Upload className="plans__avatar-uploader">
        <Avatar size={128} src={plan.avatar} icon="project" />
      </Upload>
      <Descriptions title={`Plan: ${plan.title}`} bordered className="plans__details">
        <Descriptions.Item label="Title">{plan.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{plan.description}</Descriptions.Item>
        <Descriptions.Item label="Created at">{readableDate(plan.createdAt)}</Descriptions.Item>
        <Descriptions.Item label="Last Update">
          {readableDate(plan.updatedAt)}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge status="success" text={plan.status} />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

PlanSummary.propTypes = {
  plan: object,
};

export default memo(PlanSummary);
