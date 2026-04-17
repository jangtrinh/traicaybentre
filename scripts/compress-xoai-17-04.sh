#!/bin/bash
# Compress xoai images from 17 04 folder with descriptive kebab-case names.
# Quality 82%, max 1920px wide — per image-optimization memory.
set -e

SRC="/Users/jang/Desktop/Products/traicaybentre/Hinh Anh/Xoai/17 04"
DST="/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/upbeat-ramanujan/public/images/xoai-17-04"

declare -a MAP=(
  "z7735464584714_d818b435a064b523eaf02f3958038f5c.jpg:xoai-tu-quy-tay-cam-deo-dong-ho-sot-xanh.jpg"
  "z7735464589469_7bd48d024391c0244c240823e76cc24e.jpg:xoai-vip-tay-cam-trai-to-nen-sot-nhieu-mau.jpg"
  "z7735464591847_e5b602018c200828098a91bb654c33aa.jpg:xoai-vip-tay-cam-phan-loai-sot-nhieu-mau.jpg"
  "z7735464597677_78d5e721b0c6736cb806c9f28f642bce.jpg:xoai-tu-quy-co-cuong-la-sot-do-can-canh.jpg"
  "z7735464599454_20cb1a939608b7f54acf6e45f297c898.jpg:xoai-tu-quy-vip-hai-trai-tay-cam-so-sanh.jpg"
  "z7735464603823_70941675318eeb65386abe5a50cee0f4.jpg:xoai-tu-quy-vip-trai-to-cuong-la-tay-cam.jpg"
  "z7735464607600_c19769032db51de51dbd58a769ea2cec.jpg:xoai-tu-quy-vip-trai-to-khoe-hang-nen-sot.jpg"
  "z7735464611141_6459cfffbdff190c49b4365520c42db3.jpg:xoai-tu-quy-vip-can-canh-tay-cam-sot-nhieu-mau.jpg"
  "z7735464612137_9d1908f51ea59c5b7e45f3ef128cc28a.jpg:xoai-tu-quy-vip-sot-do-vang-khoe-hang.jpg"
  "z7735464619061_b88101fc6591d9caa3dfa5b0f1f8d780.jpg:xoai-tu-quy-vip-tay-cam-sot-xanh-do.jpg"
  "z7735464620499_4f093e72091743b56cafeae86eb9d9a1.jpg:xoai-tu-quy-vip-can-canh-sot-vang-do.jpg"
  "z7735464622859_200dcb8937f7eefa5ed8951ff9e772bc.jpg:xoai-tu-quy-cuong-dai-sot-vang-vua.jpg"
  "z7735464629379_fe0acca3dca71b97b1812d8d5534bd5e.jpg:xoai-tu-quy-trai-to-cuong-la-tay-cam-can-canh.jpg"
  "z7735464671943_2dc7ad44a2260e7b44926fe2e019798f.jpg:xoai-tu-quy-sot-xanh-nhieu-cuong-la-tuoi.jpg"
  "z7735464679652_ea8ac46495acefc71163b985b53055fb.jpg:xoai-tu-quy-sot-vang-vua-thanh-phu-phan-loai.jpg"
  "z7735464683426_e4dea9bde0a55dff19cbde896f6da987.jpg:xoai-tu-quy-sot-xanh-la-cuong-can-canh.jpg"
  "z7735464688312_e73718f5c5a835480a9f34f3b44d5054.jpg:xoai-tu-quy-sot-xanh-cuong-la-tuoi-moi-hai.jpg"
)

for entry in "${MAP[@]}"; do
  orig="${entry%%:*}"
  new="${entry##*:}"
  echo "Processing: $new"
  magick "$SRC/$orig" -auto-orient -resize '1920x1920>' -quality 82 -strip "$DST/$new"
done

echo ""
echo "Done. Output:"
ls -lh "$DST"
