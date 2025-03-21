const {existsSync, mkdirSync, readdirSync, statSync} = require('fs');
const {extname, join} = require('path');
const {exec} = require('child_process');
const sharp = require("sharp");

// Supported file types
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
const videoEtensions = ['.mp4', '.mov', '.webm'];

const inputDirectory = "@/public/media";
const outputDirectory = "@/public/optimized-media";

// Ensure output directory exists
if(!existsSync(outputDirectory)) mkdirSync(outputDirectory, {recursive: true});

// Recursive function to process media files
function optimizeMedia(directory) {
    readdirSync(directory).forEach(file => {
        const fullPath = join(directory, file);
        const extension = extname(file).toLocaleLowerCase();
        const outputPath = fullPath.replace(inputDirectory, outputDirectory).replace(extension?? "", "");
        
        if(statSync(fullPath).isDirectory()) {
            if(!existsSync(outputPath)) mkdirSync(outputPath, {recursive: true});
            optimizeMedia(fullPath);
        } else if(imageExtensions.includes(extension))
            sharp(fullPath).resize(1000).webp({quality: 80}).toFile(outputPath + ".webp");
        else if(videoEtensions.includes(extension))
            exec(`ffmpeg -i "${fullPath}" -vcodex libx264 -crf 28 "${outputPath + ".mp4"}"`);
    });
}

optimizeMedia(inputDirectory);
