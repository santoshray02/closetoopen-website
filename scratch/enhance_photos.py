import os
import glob
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ASSETS_DIR = "/home/santosh/projects/experiments/closetoopen/src/assets"
PUBLIC_DIR = "/home/santosh/projects/experiments/closetoopen/public/images"

def enhance_image(filepath):
    print(f"Processing: {filepath}")
    img = Image.open(filepath).convert("RGB")
    
    # 1. Auto Contrast
    img = ImageOps.autocontrast(img, cutoff=0.5)
    
    # 2. Contrast Enhancement (+12%)
    contrast = ImageEnhance.Contrast(img)
    img = contrast.enhance(1.12)
    
    # 3. Color Saturation Boost (+15%)
    color = ImageEnhance.Color(img)
    img = color.enhance(1.15)
    
    # 4. Sharpness Boost (+25%)
    sharpness = ImageEnhance.Sharpness(img)
    img = sharpness.enhance(1.25)
    
    # 5. Unsharp Mask Filter for crisp facial details and text
    img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=2))
    
    # Overwrite source file with high quality JPEG
    img.save(filepath, "JPEG", quality=95, optimize=True)
    
    # Also save to public/images/
    filename = os.path.basename(filepath)
    pub_path = os.path.join(PUBLIC_DIR, filename)
    img.save(pub_path, "JPEG", quality=95, optimize=True)
    print(f"Successfully enhanced: {filename}")

def main():
    jpg_files = glob.glob(os.path.join(ASSETS_DIR, "ram_kishor_jha_*.jpg"))
    print(f"Found {len(jpg_files)} photos to enhance...")
    for file_path in jpg_files:
        enhance_image(file_path)

if __name__ == "__main__":
    main()
