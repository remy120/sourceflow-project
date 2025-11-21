'use client';

import { DollarOutlined, EnvironmentFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import Image from "next/image";
import { useIntl } from "react-intl";
import './JobCard.css'

type CardVariant = 'yellow' | 'blue' | 'coral';

export interface JobData {
  title: string;
  location: string;
  salary: number;
  description: string;
  action: () => void;
  postedDate: string;
  technology?: string;
}

const getTechnologyIcon = (technology: string): string => {
  switch (technology.toLowerCase()) {
    case 'python':
      return '/images/python-logo.svg';
    default:
      return '/images/python-logo.svg';
  }
};

interface JobCardProps {
  data: JobData;
  index: number;
}

const variants: CardVariant[] = ['yellow', 'blue', 'coral'];

const cardStyles = {
  yellow: {
    bgColor: 'yellow-bg',
    textColor: 'blue-text',
  },
  blue: {
    bgColor: 'blue-bg',
    textColor: 'white-text',
  },
  coral: {
    bgColor: 'red-bg',
    textColor: 'black-text',
  }
};

export default function JobCard({ data, index }: JobCardProps) {
  const intl = useIntl();
  const variant = variants[index % variants.length];
  const styles = cardStyles[variant];

  return (
    <Card
      className={`job-card ${styles.bgColor} ${styles.textColor}`}
      hoverable
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {data.technology && (
        <div className="flex-center-gap mb-4">
          <Image
            src={getTechnologyIcon(data.technology)}
            alt={data.technology}
            width={70}
            height={40}
          />
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">
        {data.title}
      </h3>
      <div className="space-y-2 mb-4">
        <div className="flex-center-gap">
          <EnvironmentFilled style={{ fontSize: '14px' }} />
          <span>
            {data.location}
          </span>
        </div>
        <div className="flex-center-gap">
          <DollarOutlined style={{ fontSize: '12px' }} />
          <span>
            {intl.formatNumber(data.salary, {
              style: 'currency',
              currency: 'GBP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </span>
        </div>
      </div>
      <p className="text-sm mb-6">
        {data.description}
      </p>
      <Button
        size="large"
        className="btn-white medium-text blue-text job-card-button"
        onClick={data.action}
      >
        <span className="button-text">
          {intl.formatMessage({ id: "jobs.viewThisJob" })}
        </span>
        <span className="button-arrow">→</span>
      </Button>
      <p className="xsmall-text mt-4">
        Posted on: {data.postedDate}
      </p>
    </Card>
  );
}
