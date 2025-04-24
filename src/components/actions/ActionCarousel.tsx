
import React, { useState, useRef, useEffect } from 'react';
import ActionCard, { ActionProps } from './ActionCard';

interface ActionCarouselProps {
  actions: ActionProps[];
  isLoading?: boolean;
}

const ActionCarousel = ({ actions, isLoading = false }: ActionCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 0;
      const newIndex = Math.round(scrollPosition / cardWidth);
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);

  if (isLoading) {
    return (
      <div>
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {[1, 2].map((i) => (
            <div 
              key={i}
              className="bg-gray-100 rounded-xl w-64 h-48 flex-shrink-0 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex justify-center space-x-1.5 pt-1">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-gray-300"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (actions.length === 0) {
    return (
      <div className="flex justify-center items-center h-24 bg-surface rounded-xl text-text-secondary">
        No smart actions available
      </div>
    );
  }

  return (
    <div>
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
      >
        {actions.map((action) => (
          <div key={action.id} className="snap-center">
            <ActionCard {...action} />
          </div>
        ))}
      </div>
      
      {/* Dot indicators */}
      <div className="flex justify-center space-x-1.5 pt-1">
        {actions.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === activeIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ActionCarousel;
