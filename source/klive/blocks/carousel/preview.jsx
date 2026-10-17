"use client"
import {useEffect, useRef, useState} from 'react';
import {tss} from '../../../components/common/theme';
import IconButton from '../../../components/common/iconography';
import {aspectRatioValue} from './config';
import Asset from '../shared/asset';
import Caption from '../shared/caption';

const useStyles = tss.create(({theme, aspectRatio}) => ({
    figure: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    frame: {
        position: "relative",
        overflow: "hidden"
    },
    track: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        aspectRatio
    },
    slide: {
        position: "relative",
        height: "100%"
    },
    media: {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    arrow: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 3,
        "&:disabled": {
            opacity: 0.3,
            cursor: "default"
        }
    },
    previous: {
        left: "10px"
    },
    next: {
        right: "10px"
    },
    dots: {
        position: "absolute",
        bottom: "10px",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: "6px",
        zIndex: 3
    },
    dot: {
        width: "8px",
        height: "8px",
        padding: 0,
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        backgroundColor: theme.secondary.accent.hex()
    }
}));

export default function CarouselPreview({attrs, config, assetsById}) {
    const assets = (attrs.asset_ids?? []).map(id => assetsById.get(id)).filter(Boolean);
    const [index, setIndex] = useState(0);
    const touchStartX = useRef(null);
    const {classes, cx} = useStyles({aspectRatio: aspectRatioValue(config.aspect_ratio)});
    const count = assets.length;
    const loop = config.loop?? true;
    const skip = Math.max(1, config.skip_count?? 1);

    const goTo = i => {
        if(count === 0) return;
        setIndex(loop? ((i % count) + count) % count : Math.max(0, Math.min(count - 1, i)));
    };
    const next = () => goTo(index + skip);
    const previous = () => goTo(index - skip);

    useEffect(() => {
        if(!config.autoplay || count < 2) return;
        const timer = setInterval(() => {
            setIndex(i => {
                if(loop) return (i + skip) % count;
                const nextIndex = Math.min(count - 1, i + skip);
                // Non-looping autoplay stops once it reaches the last slide.
                if(nextIndex === count - 1) clearInterval(timer);
                return nextIndex;
            });
        }, config.autoplay_interval_ms);
        return () => clearInterval(timer);
    }, [config.autoplay, config.autoplay_interval_ms, count, loop, skip]);

    if(count === 0) return null;

    const perSlide = Math.max(1, Math.min(count, config.images_per_slide?? 1));
    const centerFocus = config.center_focus?? true;
    const spacing = config.spacing_px?? 8;
    // Center-focus shows neighbors on either side of the current index; otherwise it's
    // a plain page starting at the current index.
    const offsets = centerFocus
        ? Array.from({length: perSlide}, (_, i) => i - Math.floor(perSlide / 2))
        : Array.from({length: perSlide}, (_, i) => i);

    const onTouchStart = event => {touchStartX.current = event.touches[0].clientX;};
    const onTouchEnd = event => {
        if(touchStartX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchStartX.current;
        if(Math.abs(dx) > 40) dx < 0? next() : previous();
        touchStartX.current = null;
    };

    const canPrevious = loop || index > 0;
    const canNext = loop || index + skip < count;

    return (
        <figure className={classes.figure}>
            {config.caption_position === "above" && <Caption>{attrs.caption}</Caption>}
            <div className={classes.frame} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <div className={classes.track}>
                    {offsets.map((offset, slot) => {
                        const asset = assets[((index + offset) % count + count) % count];
                        const isCenter = offset === 0;
                        return (
                            <div
                                key={`${asset.id}-${offset}`}
                                className={classes.slide}
                                style={{
                                    flex: perSlide === 1? "1 1 100%" : `0 0 ${100 / perSlide}%`,
                                    marginLeft: slot === 0? 0 : spacing,
                                    zIndex: isCenter? 2 : 1,
                                    transform: centerFocus && !isCenter? "scale(0.88)" : undefined,
                                    opacity: centerFocus && !isCenter? 0.7 : 1,
                                    transition: config.transition === "fade"? "opacity 300ms ease, transform 300ms ease" : "transform 300ms ease"
                                }}
                            >
                                <Asset className={classes.media} asset={asset} ambient />
                            </div>
                        );
                    })}
                </div>

                {count > perSlide && (
                    <>
                        <IconButton className={cx(classes.arrow, classes.previous)} icon="chevron_left" role="tertiary" onClick={previous} disabled={!canPrevious} />
                        <IconButton className={cx(classes.arrow, classes.next)} icon="chevron_right" role="tertiary" onClick={next} disabled={!canNext} />
                    </>
                )}

                {count > 1 && (
                    <div className={classes.dots}>
                        {assets.map((asset, i) => (
                            <button key={asset.id} className={classes.dot} style={{opacity: i === index? 1 : 0.4}} onClick={() => goTo(i)} aria-label={`Show item ${i + 1}`} />
                        ))}
                    </div>
                )}
            </div>
            {config.caption_position !== "above" && <Caption>{attrs.caption}</Caption>}
        </figure>
    );
}
