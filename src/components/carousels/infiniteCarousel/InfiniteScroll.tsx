import React, { useCallback, useEffect, useRef, useState } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "./InfiniteScrollBtns";

import "./styles/base.scss";

import "./styles/embla.scss";
import { UserTypes } from "@/types/types";
import User from "@/components/util/user/User";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryActionCreatorResult,
  QueryDefinition,
  RetryOptions,
} from "@reduxjs/toolkit/query";

type PropType = {
  slides: UserTypes[];
  options?: EmblaOptionsType;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      {
        limit?: number;
      },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {} & RetryOptions,
        {}
      >,
      "User",
      UserTypes[],
      "myApi"
    >
  >;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, slides: propSlides, refetch, setLimit } = props;

  const scrollListenerRef = useRef<() => void>(() => undefined);
  const listenForScrollRef = useRef(true);
  const hasMoreToLoadRef = useRef(true);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    ...options,
    ...options,
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine();

        emblaApi.reInit();
        const newEngine = emblaApi.internalEngine();
        // @ts-ignore
        const copyEngineModules: (keyof EngineType)[] = [
          "scrollBody",
          "location",
          "offsetLocation",
          "previousLocation",
          "target",
        ];
        copyEngineModules.forEach((engineModule) => {
          // @ts-ignore
          Object.assign(newEngine[engineModule], oldEngine[engineModule]);
        });

        newEngine.translate.to(oldEngine.location.get());
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();

        setLoadingMore(false);
        listenForScrollRef.current = true;
      };

      const reloadAfterPointerUp = (): void => {
        emblaApi.off("pointerUp", reloadAfterPointerUp);
        reloadEmbla();
      };

      const engine = emblaApi.internalEngine();

      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaApi.on("pointerUp", reloadAfterPointerUp);
      } else {
        reloadEmbla();
      }
    },
  });

  const {} = usePrevNextButtons(emblaApi);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    if (!listenForScrollRef.current) return;

    setLoadingMore((loadingMore) => {
      const lastSlide = emblaApi.slideNodes().length - 1;
      const lastSlideInView = emblaApi.slidesInView().includes(lastSlide);
      const loadMore = !loadingMore && lastSlideInView;

      if (loadMore) {
        setLimit((prev) => prev + 3);
        refetch();
      }

      return loadingMore || lastSlideInView;
    });
  }, []);

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaApi);
      emblaApi.on("scroll", scrollListenerRef.current);
    },
    [onScroll]
  );

  useEffect(() => {
    if (!emblaApi) return;
    addScrollListener(emblaApi);

    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    emblaApi.on("destroy", () =>
      window.removeEventListener("resize", onResize)
    );
  }, [emblaApi, addScrollListener]);

  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad;
  }, [hasMoreToLoad]);

  return (
    <div className="embla w-full h-75vh">
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className={`embla__container text-white max-h-[40rem] relative`}>
          {propSlides?.map((user, index) => (
            <div
              className="embla__slide rounded-lg border border-slate-800"
              key={index}
            >
              <User user={user} />
            </div>
          ))}

          {hasMoreToLoad && (
            <div
              className={"embla-infinite-scroll ".concat(
                loadingMore ? " embla-infinite-scroll--loading-more" : ""
              )}
            >
              <span className="embla-infinite-scroll__spinner border-slate-300 border" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
