/*
 * PRODUCT DATA — the only file you need to edit to change products.
 *
 * - Each set must keep the same number of products (currently 12).
 * - Items are shown in exactly this order (no shuffling).
 * - To use real photos: put the files in images/set1/ or images/set2/
 *   and change the `image` path below. Any format works (.jpg, .png, .webp).
 *   Portrait photos (3:4 ratio, e.g. 900×1200) fit best.
 * - `price` is a plain number; it is formatted automatically (e.g. ₱1,390).
 * - `id` must be unique across BOTH sets.
 *
 * Product Set 1 is always used in Part 1 and Product Set 2 in Part 2,
 * whichever interface order the researcher selects.
 */
window.STUDY_DATA = {
  currency: "₱",

  sets: {
    set1: [
      { id: "s1-01", name: "Striped Knit Sweater",   price: 1390, image: "images/set1/01-striped-knit-sweater.svg" },
      { id: "s1-02", name: "Cropped Jacket",         price: 1990, image: "images/set1/02-cropped-jacket.svg" },
      { id: "s1-03", name: "Knit Cardigan",          price: 1290, image: "images/set1/03-knit-cardigan.svg" },
      { id: "s1-04", name: "Oversized Shirt",        price: 1490, image: "images/set1/04-oversized-shirt.svg" },
      { id: "s1-05", name: "Pleated Trousers",       price: 1590, image: "images/set1/05-pleated-trousers.svg" },
      { id: "s1-06", name: "Satin Midi Skirt",       price: 1190, image: "images/set1/06-satin-midi-skirt.svg" },
      { id: "s1-07", name: "Linen Wrap Dress",       price: 1890, image: "images/set1/07-linen-wrap-dress.svg" },
      { id: "s1-08", name: "Boxy Cotton Tee",        price: 590,  image: "images/set1/08-boxy-cotton-tee.svg" },
      { id: "s1-09", name: "Tailored Blazer",        price: 2290, image: "images/set1/09-tailored-blazer.svg" },
      { id: "s1-10", name: "Straight-Leg Jeans",     price: 1690, image: "images/set1/10-straight-leg-jeans.svg" },
      { id: "s1-11", name: "Wool Blend Coat",        price: 2990, image: "images/set1/11-wool-blend-coat.svg" },
      { id: "s1-12", name: "Crewneck Sweatshirt",    price: 990,  image: "images/set1/12-crewneck-sweatshirt.svg" }
    ],

    set2: [
      { id: "s2-01", name: "Ribbed Turtleneck",      price: 1390, image: "images/set2/01-ribbed-turtleneck.svg" },
      { id: "s2-02", name: "Denim Trucker Jacket",   price: 1990, image: "images/set2/02-denim-trucker-jacket.svg" },
      { id: "s2-03", name: "V-Neck Cardigan",        price: 1290, image: "images/set2/03-v-neck-cardigan.svg" },
      { id: "s2-04", name: "Striped Poplin Shirt",   price: 1490, image: "images/set2/04-striped-poplin-shirt.svg" },
      { id: "s2-05", name: "Wide-Leg Trousers",      price: 1590, image: "images/set2/05-wide-leg-trousers.svg" },
      { id: "s2-06", name: "A-Line Mini Skirt",      price: 1190, image: "images/set2/06-a-line-mini-skirt.svg" },
      { id: "s2-07", name: "Knit Slip Dress",        price: 1890, image: "images/set2/07-knit-slip-dress.svg" },
      { id: "s2-08", name: "Ringer Tee",             price: 590,  image: "images/set2/08-ringer-tee.svg" },
      { id: "s2-09", name: "Double-Breasted Blazer", price: 2290, image: "images/set2/09-double-breasted-blazer.svg" },
      { id: "s2-10", name: "Wide-Leg Jeans",         price: 1690, image: "images/set2/10-wide-leg-jeans.svg" },
      { id: "s2-11", name: "Belted Trench Coat",     price: 2990, image: "images/set2/11-belted-trench-coat.svg" },
      { id: "s2-12", name: "Half-Zip Sweatshirt",    price: 990,  image: "images/set2/12-half-zip-sweatshirt.svg" }
    ]
  }
};
