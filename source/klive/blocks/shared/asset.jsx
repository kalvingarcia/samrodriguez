"use client"
import Image from '../../../components/common/image';
import Video from '../../../components/common/video';

// Keeps the site's existing deterrent against right-click saving / dragging media out.
const protect = {onContextMenu: event => event.preventDefault(), draggable: false};

/**
 * Renders a resolved klive asset with the site's own Image/Video components. `ambient`
 * is for gallery/carousel cells: videos loop silently without controls, the way the
 * klive previews show them.
 */
export default function Asset({asset, className, ambient = false, ...props}) {
    if(!asset) return null;
    if(asset.mime_type.startsWith("video/"))
        return ambient?
            <Video key={asset.url} className={className} source={asset.url} mimeType={asset.mime_type} muted loop autoPlay playsInline {...protect} {...props} /> :
            <Video key={asset.url} className={className} source={asset.url} mimeType={asset.mime_type} controls autoPlay muted playsInline {...protect} {...props} />;
    return <Image className={className} source={asset.url} alt={asset.alt_text?? ""} {...protect} {...props} />;
}
