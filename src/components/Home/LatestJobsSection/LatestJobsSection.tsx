'use client';

import JobCard, { JobData } from "@/src/components/Home/JobCard/JobCard";
import { Button } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

export default function LatestJobsSection() {
  const intl = useIntl();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const jobsData: JobData[] = [
    {
      title: intl.formatMessage({ id: 'jobs.position' }),
      location: intl.formatMessage({ id: 'jobs.location' }),
      salary: 65000,
      description: intl.formatMessage({ id: 'jobs.description' }),
      postedDate: "29/02/2021",
      technology: "python",
      action: () => console.log("View job"),
    },
    {
      title: intl.formatMessage({ id: 'jobs.position' }),
      location: intl.formatMessage({ id: 'jobs.location' }),
      salary: 66000,
      description: intl.formatMessage({ id: 'jobs.description' }),
      postedDate: "29/02/2021",
      technology: "python",
      action: () => console.log("View job"),
    },
    {
      title: intl.formatMessage({ id: 'jobs.position' }),
      location: intl.formatMessage({ id: 'jobs.location' }),
      salary: 67000,
      description: intl.formatMessage({ id: 'jobs.description' }),
      postedDate: "29/02/2021",
      technology: "python",
      action: () => console.log("View job"),
    },
    {
      title: intl.formatMessage({ id: 'jobs.position' }),
      location: intl.formatMessage({ id: 'jobs.location' }),
      salary: 68000,
      description: intl.formatMessage({ id: 'jobs.description' }),
      postedDate: "29/02/2021",
      technology: "python",
      action: () => console.log("View job"),
    },
    {
      title: intl.formatMessage({ id: 'jobs.position' }),
      location: intl.formatMessage({ id: 'jobs.location' }),
      salary: 69000,
      description: intl.formatMessage({ id: 'jobs.description' }),
      postedDate: "29/02/2021",
      technology: "python",
      action: () => console.log("View job"),
    },
    {
      title: intl.formatMessage({ id: 'jobs.position' }),
      location: intl.formatMessage({ id: 'jobs.location' }),
      salary: 70000,
      description: intl.formatMessage({ id: 'jobs.description' }),
      postedDate: "29/02/2021",
      technology: "python",
      action: () => console.log("View job"),
    }
  ];

  const handleViewMore = () => {
    console.log("View More Jobs");
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSlideDirection('left');
      setAnimationKey(prev => prev + 1);
      const step = isDesktop ? 3 : 1;
      setCurrentIndex((prev) => Math.max(0, prev - step));
    }
  };

  const handleNext = () => {
    if (currentIndex < jobsData.length - 1) {
      setSlideDirection('right');
      setAnimationKey(prev => prev + 1);
      const step = isDesktop ? 3 : 1;
      setCurrentIndex((prev) => Math.min(jobsData.length - 1, prev + step));
    }
  };

  // Get visible cards for desktop (3 cards at a time)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = currentIndex + i;
      if (index < jobsData.length) {
        cards.push(jobsData[index]);
      }
    }
    return cards;
  };

  const getPrevIndex = () => currentIndex - 1;
  const getNextIndex = () => currentIndex + 1;
  const hasPrevCard = currentIndex > 0;
  const hasNextCard = currentIndex < jobsData.length - 1;

  const isAtStart = currentIndex === 0;
  const isAtEnd = isDesktop ? currentIndex >= jobsData.length - 3 : currentIndex >= jobsData.length - 1;

  return (
    <section className="py-16 lightblue-bg">
      <div className="container-custom">
        <h2 className="xlarge-text font-bold text-center">
          {intl.formatMessage({ id: 'jobs.title' })}
        </h2>

        {/* Mobile: Stacked cards carousel */}
        <div className="md:hidden">
          <div className="overflow-x-hidden" style={{ marginLeft: '-1.5rem', marginRight: '-1.5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            <div className="mobile-carousel-container" key={`mobile-${animationKey}`}>
              {/* Previous card - stacked behind on left */}
              {hasPrevCard && (
                <div className="mobile-card-wrapper mobile-card-prev">
                  <JobCard data={jobsData[getPrevIndex()]} index={getPrevIndex()} />
                </div>
              )}

              {/* Current card - center and front */}
              <div className={`mobile-card-wrapper mobile-card-current ${slideDirection === 'left' ? 'slide-from-left' : slideDirection === 'right' ? 'slide-from-right' : ''}`}>
                <JobCard data={jobsData[currentIndex]} index={currentIndex} />
              </div>

              {/* Next card - stacked behind on right */}
              {hasNextCard && (
                <div className="mobile-card-wrapper mobile-card-next">
                  <JobCard data={jobsData[getNextIndex()]} index={getNextIndex()} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop: Carousel view with 3 cards and navigation */}
        <div className="hidden md:block mt-10">
          <div className="overflow-x-hidden" style={{ paddingTop: '20px', marginTop: '-20px' }}>
            <div
              key={`desktop-${animationKey}`}
              className={`grid grid-cols-3 gap-6 mb-6 carousel-container ${slideDirection ? `carousel-slide-${slideDirection}` : ''}`}
            >
              {getVisibleCards().map((job, index) => (
                <JobCard key={`${currentIndex}-${index}`} data={job} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="text"
              shape="circle"
              icon={<Image src={"/icons/blue-arrow-right.svg"} alt={"blue-arrow"} width={30} height={30} className={`rotate-180 ${!hasPrevCard && "opacity-30"}`} />}
              onClick={handlePrevious}
              disabled={isDesktop ? isAtStart : !hasPrevCard}
              size="large"
            />
            <Button
              type="text"
              shape="circle"
              icon={<Image src={"/icons/blue-arrow-right.svg"} alt={"blue-arrow"} width={30} height={30} className={`${isAtEnd && "opacity-30"}`} />}
              onClick={handleNext}
              disabled={isDesktop ? isAtEnd : !hasNextCard}
              size="large"
            />
            {!isDesktop && (
              <span className="text-sm text-gray-600 ml-2">
                {currentIndex + 1} / {jobsData.length}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <Button
              type="link"
              className="blue-text small-text font-medium p-0"
              onClick={handleViewMore}
            >
              {intl.formatMessage({ id: 'jobs.viewMore' })}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
