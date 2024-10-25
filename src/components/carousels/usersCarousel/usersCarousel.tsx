import React from "react";
import { EmblaOptionsType } from "embla-carousel";

import useEmblaCarousel from "embla-carousel-react";
import { UserTypes } from "@/types/types";

import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

type PropType = {
  slides: UserTypes[] | undefined;
  options?: EmblaOptionsType;
};

import "./style/embla.scss";

const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

const UserCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = fallbackImage; // Set the fallback image
  };

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla flex-shrink relative">
      <div className="embla__viewport ml-2" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((item, index) => (
            <div
              className="embla__slide p-0 text-center flex-center flex-col overflow-hidden"
              key={index}
            >
              <img
                className="max-w-16 max-h-16 rounded-full p-1 border-2 border-[#685DFF]"
                src={item.photo || fallbackImage}
                onError={handleImageError}
                alt={`avatar`}
              />
              <div className="relative story__info w-full">
                <p className="text-sm overflow-hidden mt-3">{item.username}</p>
              </div>
            </div>
          ))}
        </div>
        <PrevButton
          className={`absolute left-0 top-[50%] translate-y-[-50%] max-w-6 w-6 h-6 bg-[#1D1D22] text-[#877EFF] rounded-full flex-center ${
            prevBtnDisabled && "hidden"
          }`}
          onClick={onPrevButtonClick}
        />
        <NextButton
          className={`absolute right-[-4%] top-[50%] translate-y-[-50%] max-w-6 w-6 h-6 bg-[#1D1D22] text-[#877EFF] rounded-full flex-center ${
            nextBtnDisabled && "hidden"
          }`}
          onClick={onNextButtonClick}
        />
      </div>
    </section>
  );
};

export default UserCarousel;
