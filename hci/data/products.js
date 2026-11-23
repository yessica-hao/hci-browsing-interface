/*
 * PRODUCT DATA — the only file you need to edit to change products.
 *
 * - Each set must keep the same number of products (currently 30).
 * - Items are shown in exactly this order (no shuffling).
 * - To use real photos: put the files in images/set1/ or images/set2/
 *   and change the `image` path below. Any format works (.jpg, .png, .webp).
 *   Portrait photos (3:4 ratio, e.g. 900×1200) fit best.
 * - `price` is a plain number; it is formatted automatically (e.g. ₱1,390).
 *   Prices are only shown when `showPrices` (below) is true.
 * - `id` must be unique across BOTH sets.
 *
 * Product Set 1 is always used in Part 1 and Product Set 2 in Part 2,
 * whichever interface order the researcher selects.
 */
window.STUDY_DATA = {
  // Prices are hidden so they don't influence which product participants choose.
  // Set to true to show them again.
  showPrices: false,
  currency: "₱",

  sets: {
    set1: [
      { id: "s1-01", name: "Crochet Fringe Poncho",       price: 1290, image: "images/set1/01-crochet-fringe-poncho.jpg" },
      { id: "s1-02", name: "Round Metal Sunglasses",      price: 890, image: "images/set1/02-round-metal-sunglasses.jpg" },
      { id: "s1-03", name: "Colorblock Sneakers",         price: 2490, image: "images/set1/03-colorblock-sneakers.jpg" },
      { id: "s1-04", name: "Patch Baseball Cap",          price: 590, image: "images/set1/04-patch-baseball-cap.jpg" },
      { id: "s1-05", name: "Yellow Pullover Hoodie",      price: 1390, image: "images/set1/05-yellow-pullover-hoodie.jpg" },
      { id: "s1-06", name: "Graphic Print Tee",           price: 690, image: "images/set1/06-graphic-print-tee.jpg" },
      { id: "s1-07", name: "Striped Boat-Neck Top",       price: 990, image: "images/set1/07-striped-boat-neck-top.jpg" },
      { id: "s1-08", name: "Satin Bomber Jacket",         price: 1990, image: "images/set1/08-satin-bomber-jacket.jpg" },
      { id: "s1-09", name: "Distressed Denim Shorts",     price: 890, image: "images/set1/09-distressed-denim-shorts.jpg" },
      { id: "s1-10", name: "Leather Court Sneakers",      price: 2290, image: "images/set1/10-leather-court-sneakers.jpg" },
      { id: "s1-11", name: "Wide-Brim Sun Hat",           price: 790, image: "images/set1/11-wide-brim-sun-hat.jpg" },
      { id: "s1-12", name: "Cable-Knit Wool Socks",       price: 390, image: "images/set1/12-cable-knit-wool-socks.jpg" },
      { id: "s1-13", name: "Leather Horsebit Loafers",    price: 2990, image: "images/set1/13-leather-horsebit-loafers.jpg" },
      { id: "s1-14", name: "Black Logo Tee",              price: 590, image: "images/set1/14-black-logo-tee.jpg" },
      { id: "s1-15", name: "Logo Slide Sandals",          price: 990, image: "images/set1/15-logo-slide-sandals.jpg" },
      { id: "s1-16", name: "Dark Wash Straight Jeans",    price: 1690, image: "images/set1/16-dark-wash-straight-jeans.jpg" },
      { id: "s1-17", name: "Ribbed Knee-High Socks",      price: 350, image: "images/set1/17-ribbed-knee-high-socks.jpg" },
      { id: "s1-18", name: "Crochet Patchwork Cardigan",  price: 1890, image: "images/set1/18-crochet-patchwork-cardigan.jpg" },
      { id: "s1-19", name: "Leather Mini Backpack",       price: 1790, image: "images/set1/19-leather-mini-backpack.jpg" },
      { id: "s1-20", name: "Plaid Flannel Overshirt",     price: 1490, image: "images/set1/20-plaid-flannel-overshirt.jpg" },
      { id: "s1-21", name: "Floral Embroidered Scarf",    price: 790, image: "images/set1/21-floral-embroidered-scarf.jpg" },
      { id: "s1-22", name: "Leather Top-Handle Bag",      price: 2490, image: "images/set1/22-leather-top-handle-bag.jpg" },
      { id: "s1-23", name: "Woven Leather Belt",          price: 690, image: "images/set1/23-woven-leather-belt.jpg" },
      { id: "s1-24", name: "White Henley Tee",            price: 690, image: "images/set1/24-white-henley-tee.jpg" },
      { id: "s1-25", name: "Printed Short-Sleeve Shirt",  price: 990, image: "images/set1/25-printed-short-sleeve-shirt.jpg" },
      { id: "s1-26", name: "Two-Piece Pajama Set",        price: 1290, image: "images/set1/26-two-piece-pajama-set.jpg" },
      { id: "s1-27", name: "Black Acetate Eyeglasses",    price: 1190, image: "images/set1/27-black-acetate-eyeglasses.jpg" },
      { id: "s1-28", name: "Single-Breasted Blazer",      price: 2490, image: "images/set1/28-single-breasted-blazer.jpg" },
      { id: "s1-29", name: "Chunky Knit Sweater",         price: 1390, image: "images/set1/29-chunky-knit-sweater.jpg" },
      { id: "s1-30", name: "Cargo Jogger Pants",          price: 1290, image: "images/set1/30-cargo-jogger-pants.jpg" }
    ],

    set2: [
      { id: "s2-01", name: "Washed Denim Cap",             price: 590, image: "images/set2/01-washed-denim-cap.jpg" },
      { id: "s2-02", name: "Navy Daypack Backpack",        price: 1290, image: "images/set2/02-navy-daypack-backpack.jpg" },
      { id: "s2-03", name: "Classic Black Sunglasses",     price: 890, image: "images/set2/03-classic-black-sunglasses.jpg" },
      { id: "s2-04", name: "Plain White Tee",              price: 490, image: "images/set2/04-plain-white-tee.jpg" },
      { id: "s2-05", name: "Black Slogan Tee",             price: 590, image: "images/set2/05-black-slogan-tee.jpg" },
      { id: "s2-06", name: "Black Wool Blazer",            price: 2490, image: "images/set2/06-black-wool-blazer.jpg" },
      { id: "s2-07", name: "Polka Dot Chambray Shirt",     price: 990, image: "images/set2/07-polka-dot-chambray-shirt.jpg" },
      { id: "s2-08", name: "Woven Leather Tote",           price: 2290, image: "images/set2/08-woven-leather-tote.jpg" },
      { id: "s2-09", name: "Retro Running Sneakers",       price: 2490, image: "images/set2/09-retro-running-sneakers.jpg" },
      { id: "s2-10", name: "Abstract Print Tee",           price: 690, image: "images/set2/10-abstract-print-tee.jpg" },
      { id: "s2-11", name: "Two-Strap Cork Sandals",       price: 1990, image: "images/set2/11-two-strap-cork-sandals.jpg" },
      { id: "s2-12", name: "Round Tortoiseshell Glasses",  price: 1190, image: "images/set2/12-round-tortoiseshell-glasses.jpg" },
      { id: "s2-13", name: "Chunky Pastel Sneakers",       price: 2690, image: "images/set2/13-chunky-pastel-sneakers.jpg" },
      { id: "s2-14", name: "Corduroy-Collar Denim Jacket", price: 1990, image: "images/set2/14-corduroy-collar-denim-jacket.jpg" },
      { id: "s2-15", name: "Cuffed Knit Beanie",           price: 490, image: "images/set2/15-cuffed-knit-beanie.jpg" },
      { id: "s2-16", name: "White Pullover Hoodie",        price: 1390, image: "images/set2/16-white-pullover-hoodie.jpg" },
      { id: "s2-17", name: "Navy Padded Jacket",           price: 1890, image: "images/set2/17-navy-padded-jacket.jpg" },
      { id: "s2-18", name: "Brown Leather Belt",           price: 690, image: "images/set2/18-brown-leather-belt.jpg" },
      { id: "s2-19", name: "White Polo Shirt",             price: 790, image: "images/set2/19-white-polo-shirt.jpg" },
      { id: "s2-20", name: "Suede Horsebit Loafers",       price: 2490, image: "images/set2/20-suede-horsebit-loafers.jpg" },
      { id: "s2-21", name: "Vintage Graphic Tee",          price: 690, image: "images/set2/21-vintage-graphic-tee.jpg" },
      { id: "s2-22", name: "Leather Biker Jacket",         price: 2990, image: "images/set2/22-leather-biker-jacket.jpg" },
      { id: "s2-23", name: "Knit Wool Gloves",             price: 490, image: "images/set2/23-knit-wool-gloves.jpg" },
      { id: "s2-24", name: "Straight-Leg Jeans",           price: 1690, image: "images/set2/24-straight-leg-jeans.jpg" },
      { id: "s2-25", name: "Piped Pajama Set",             price: 1290, image: "images/set2/25-piped-pajama-set.jpg" },
      { id: "s2-26", name: "Mohair Knit Sweater",          price: 1590, image: "images/set2/26-mohair-knit-sweater.jpg" },
      { id: "s2-27", name: "Denim Shorts",                 price: 890, image: "images/set2/27-denim-shorts.jpg" },
      { id: "s2-28", name: "Mint Drawstring Trousers",     price: 1190, image: "images/set2/28-mint-drawstring-trousers.jpg" },
      { id: "s2-29", name: "White Crew Socks",             price: 350, image: "images/set2/29-white-crew-socks.jpg" },
      { id: "s2-30", name: "Knit Neck Warmer",             price: 590, image: "images/set2/30-knit-neck-warmer.jpg" }
    ]
  }
};
