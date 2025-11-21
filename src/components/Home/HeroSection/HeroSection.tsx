'use client';

import Image from "next/image";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";

export default function HeroSection() {
  const intl = useIntl();

  const handleSearch = () => {
    console.log("search");
  };

  return (
    <section className="relative blue-bg overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 red-bg rounded-full -translate-x-1/2 -translate-y-1/2 opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 yellow-bg rounded-full translate-x-1/3 translate-y-1/3 opacity-80"></div>

      <div className="container-custom py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="white-text medium-text mb-4">
              {intl.formatMessage({ id: 'hero.tagline' })}
            </p>
            <h1 className="text-5xl font-bold white-text mb-8">
              {intl.formatMessage({ id: 'hero.title' })}
            </h1>
            <div className="flex flex-row bg-white items-stretch" style={{ borderRadius: '30px' }}>
              <Input
                placeholder={intl.formatMessage({ id: 'hero.searchPlaceholder' })}
                prefix={<SearchOutlined className="text-gray-400" />}
                size="large"
                variant="borderless"
                style={{ padding: '12px 16px' }}
              />
              <Button
                size="large"
                className="btn-yellow font-semibold"
                onClick={handleSearch}
                style={{
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '0',
                  borderTopRightRadius: '30px',
                  borderBottomRightRadius: '30px',
                  height: 'auto',
                  padding: '0 30px'
                }}
              >
                {intl.formatMessage({ id: 'hero.searchButton' })}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto">
              <Image
                src="/images/homecareer.jpg"
                alt="Professional woman"
                width={400}
                height={500}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
