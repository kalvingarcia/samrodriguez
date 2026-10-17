import {MEDIA_DEFAULTS} from './media/config';
import {BANNER_DEFAULTS, HERO_DEFAULTS} from './banner/config';
import {TWO_COLUMN_DEFAULTS} from './two-column/config';
import {GALLERY_DEFAULTS} from './gallery/config';
import {CAROUSEL_DEFAULTS} from './carousel/config';
import {QUOTE_DEFAULTS} from './quote/config';
import {CODE_DEFAULTS} from './code/config';
import {DIVIDER_DEFAULTS} from './divider/config';
import MediaPreview from './media/preview';
import BannerLikePreview from './banner/preview';
import {TwoColumnPreview, ColumnPreview} from './two-column/preview';
import GalleryPreview from './gallery/preview';
import CarouselPreview from './carousel/preview';
import QuotePreview from './quote/preview';
import CodePreview from './code/preview';
import DividerPreview from './divider/preview';

/**
 * All klive block types, keyed by Tiptap node name (== RenderConfig JSON key). Mirrors
 * klive-dashboard/dashboard/lib/blocks/registry.ts, keeping only what rendering needs.
 */
export const BLOCKS = {
    mediaBlock: {key: "mediaBlock", configDefaults: MEDIA_DEFAULTS, Preview: MediaPreview},
    galleryBlock: {key: "galleryBlock", configDefaults: GALLERY_DEFAULTS, Preview: GalleryPreview},
    carouselBlock: {key: "carouselBlock", configDefaults: CAROUSEL_DEFAULTS, Preview: CarouselPreview},
    bannerBlock: {key: "bannerBlock", configDefaults: BANNER_DEFAULTS, Preview: BannerLikePreview},
    heroBlock: {key: "heroBlock", configDefaults: HERO_DEFAULTS, Preview: BannerLikePreview},
    twoColumnBlock: {key: "twoColumnBlock", configDefaults: TWO_COLUMN_DEFAULTS, Preview: TwoColumnPreview},
    columnBlock: {key: "columnBlock", configDefaults: {}, Preview: ColumnPreview},
    quoteBlock: {key: "quoteBlock", configDefaults: QUOTE_DEFAULTS, Preview: QuotePreview},
    codeBlock: {key: "codeBlock", configDefaults: CODE_DEFAULTS, Preview: CodePreview},
    dividerBlock: {key: "dividerBlock", configDefaults: DIVIDER_DEFAULTS, Preview: DividerPreview}
};
