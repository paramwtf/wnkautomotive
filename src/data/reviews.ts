export interface CustomerReview {
  id: string;
  author: string;
  badge?: string;
  vehicle: string;
  wrapDesign: string;
  rating: number;
  timeAgo: string;
  quote: string;
}

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Dnyanesh Jadhav',
    badge: 'Verified Customer',
    vehicle: 'Aprilia RS 457',
    wrapDesign: 'Custom RS 457 Livery',
    rating: 5,
    timeAgo: '9 months ago',
    quote:
      'Got my RS457 wrapped at WNK Automotive and the work is top-notch. Clean finish, perfect alignment. I just had a convo with Sahil (the owner) about how I wanted it and he created the beauty same as I expected. Highly recommended for anyone serious about quality work.',
  },
  {
    id: 'rev-2',
    author: 'Shubham Mahadik',
    badge: 'Local Guide',
    vehicle: 'Aprilia RS 457',
    wrapDesign: 'Full Fairing Wrap',
    rating: 5,
    timeAgo: 'a year ago',
    quote:
      'Best service for vehicle detailing, cosmetic and wrapping. I have wrapped my Aprilia RS457 from WNK. Owner Sahil is very best at what he does, he has shown very detailed work to ensure you get what you want. Highly recommended.',
  },
  {
    id: 'rev-3',
    author: 'Shahil Mistry',
    badge: 'Local Guide',
    vehicle: 'KTM 390 Adventure',
    wrapDesign: '390 ADV Livery Wrap',
    rating: 5,
    timeAgo: '5 months ago',
    quote:
      'Just got my KTM 390 adventure wrapped, amazing work and finish, highly recommended!',
  },
  {
    id: 'rev-4',
    author: 'Saket Joshi',
    badge: 'Local Guide',
    vehicle: 'TVS Apache RR 310',
    wrapDesign: 'Full Body Graphics Wrap',
    rating: 5,
    timeAgo: '9 months ago',
    quote:
      'Job: Full body wrap TVS RR310. He will turn your bike into a serious head turner. Prompt support. Superb quality materials & work. Reliable. Recommended for PPF wraps, full body graphics wrap.',
  },
  {
    id: 'rev-5',
    author: 'Anuj Raut',
    badge: 'Local Guide',
    vehicle: 'Motorcycle & Car',
    wrapDesign: 'Bespoke Livery Concept',
    rating: 5,
    timeAgo: 'a year ago',
    quote:
      "The quality and attention to detail are exceptional. Sahil has a great sense of design and creates unique wraps that will definitely make your ride stand out. He takes the time to understand the customer's needs and treats your car or bike with immense care.",
  },
  {
    id: 'rev-6',
    author: 'Alshin Thomas',
    badge: 'Local Guide',
    vehicle: 'Race Gear & Machine',
    wrapDesign: 'Custom Motorsport Graphics',
    rating: 5,
    timeAgo: 'a year ago',
    quote:
      'Really gotta appreciate WNK’s dedicated work. Absolutely lovely job by Sahil. I needed my race suit and gear to be given a bit more flair and despite them being busy amidst all the fantastic vehicle related work they do, he created something fantastic.',
  },
  {
    id: 'rev-7',
    author: 'Sumit Shukla',
    badge: 'Local Guide',
    vehicle: 'Bike & Car Styling',
    wrapDesign: 'Custom Studio Wrap',
    rating: 5,
    timeAgo: 'a year ago',
    quote:
      'WNK is a fantastic place to give your bike or car a fresh new look! The prices are reasonable, and Sahil is incredibly humble and helpful. He guides you in the right direction, ensuring you make the best choices. Highly recommended for quality work and great service!',
  },
  {
    id: 'rev-8',
    author: 'Prathamesh Dhole',
    badge: 'Verified Customer',
    vehicle: 'Motorcycle',
    wrapDesign: 'Precision Cut Wrap',
    rating: 5,
    timeAgo: '3 months ago',
    quote:
      'Great work done by Sahil. Wrap quality is awesome. LOVED THE WRAP!',
  },
  {
    id: 'rev-9',
    author: 'Aniruddha Vispute',
    badge: 'Local Guide',
    vehicle: 'Vehicle Care',
    wrapDesign: 'Full Wrap & PPF',
    rating: 5,
    timeAgo: '2 years ago',
    quote:
      "Really good place with quality work at competitive prices. Sahil is an awesome guy who takes care of your vehicle as if it's his. You can keep the vehicles in his care without worrying.",
  },
  {
    id: 'rev-10',
    author: 'Karan Sajeeth',
    badge: 'Verified Customer',
    vehicle: 'Custom Decals',
    wrapDesign: 'Paint & Decal Studio',
    rating: 5,
    timeAgo: '9 months ago',
    quote:
      'Amazing work by Sahil. Paint and decal work is top notch and budget friendly as well. Definitely recommend to get creative here.',
  },
  {
    id: 'rev-11',
    author: 'Malhar Limaye',
    badge: 'Verified Customer',
    vehicle: 'Motorcycle',
    wrapDesign: 'Custom Imagination Wrap',
    rating: 5,
    timeAgo: '9 months ago',
    quote:
      'Very nice work done by WNK Automotive. Thank you for this great support and best service. Helped me make imagination into reality!',
  },
  {
    id: 'rev-12',
    author: 'Kartik Shastrakar',
    badge: 'Local Guide',
    vehicle: 'Automotive Sector',
    wrapDesign: 'Custom Livery Solutions',
    rating: 5,
    timeAgo: '5 months ago',
    quote:
      'Best boy in the art of automotive sector in the making. You visit him, give him your choice or let him decide, he will deliver you the best possible solutions with the best price.',
  },
  {
    id: 'rev-13',
    author: 'Abhishrut Mhasatkar',
    badge: 'Local Guide',
    vehicle: 'Bike Customisation',
    wrapDesign: 'Precision Wrap Styling',
    rating: 5,
    timeAgo: 'a year ago',
    quote:
      'Got my bike customised at WNK Automotive and the experience was just amazing. Sahil is one of those people who genuinely loves what he does—he’s super detail-oriented and makes sure everything comes out just right.',
  },
  {
    id: 'rev-14',
    author: 'Mahesh Shinde',
    badge: 'Local Guide',
    vehicle: 'Bike / Car',
    wrapDesign: 'Stunning Look Wrap',
    rating: 5,
    timeAgo: 'a year ago',
    quote:
      'WNK is a great place to give your bike/car a stunning look. The prices are also affordable and Sahil is a humble and helpful guy. Highly recommended for quality work and great service!',
  },
  {
    id: 'rev-15',
    author: 'Mayur Malpande',
    badge: 'Verified Customer',
    vehicle: 'Car Detailing',
    wrapDesign: 'Ceramic & Cosmetic Wrap',
    rating: 5,
    timeAgo: 'a year ago',
    quote:
      "The ceramic coating looks fantastic! It gives my car a deep, glossy finish...The coating feels very smooth and slick to the touch, making it easy to clean. Special thanks to Sahil Wanikar for putting all the valuable efforts!",
  },
  {
    id: 'rev-16',
    author: 'Pranay Patil',
    badge: 'Verified Customer',
    vehicle: 'Vehicle Wrap',
    wrapDesign: 'Clean Finishing Wrap',
    rating: 5,
    timeAgo: 'a year ago',
    quote:
      'Done with wrap. Must say, excellent quality with clean finishing!! Highly recommend.',
  },
  {
    id: 'rev-17',
    author: 'Abhay Gurjar',
    badge: 'Verified Customer',
    vehicle: 'Car Wrapping',
    wrapDesign: 'Top-Quality Cast Wrap',
    rating: 5,
    timeAgo: 'a year ago',
    quote:
      'Great experience at WNK Automotive! Professional work, top-quality materials, and an amazing finish. Highly recommend their car wrapping services!',
  },
  {
    id: 'rev-18',
    author: 'Chiranjivi Konde',
    badge: 'Verified Customer',
    vehicle: 'Custom Bike',
    wrapDesign: 'Racing Wrap & Decals',
    rating: 5,
    timeAgo: '9 months ago',
    quote:
      'Sec c wrap 5/5 spark plug + Golden sprocket loved the work very professional!',
  },
];
