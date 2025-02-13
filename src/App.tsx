import React, { useState, useEffect } from 'react';
import HeroSlider from './components/HeroSlider';
import { Eye, ShoppingCart, Star, X, ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Flag, Gift, Award, PartyPopper, Cake, Building2, GraduationCap, Heart, Baby, Music, Trophy, Users, Tent, Palette, Store, Camera, CheckCircle } from 'lucide-react';

interface EventCard {
  image: string;
  title: string;
  price: string;
  category: string;
  rating?: number;
  description?: string;
}

const eventCards: EventCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069',
    title: 'Elegant Wedding Collection',
    price: '$299',
    category: 'Wedding',
    rating: 4.9,
    description: 'Premium wedding designs with elegant themes and customizable options.',
  },
  {
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=2069',
    title: 'Graduation Special',
    price: '$199',
    category: 'Graduation',
    rating: 4.8,
    description: 'Celebrate academic success with our modern graduation designs.',
  },
  {
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=2069',
    title: 'Birthday Bash Package',
    price: '$149',
    category: 'Birthday',
    rating: 4.7,
    description: 'Make your birthday memorable with our creative design collection.',
  },
  {
    image: 'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&q=80&w=2069',
    title: 'Corporate Event Suite',
    price: '$399',
    category: 'Corporate',
    rating: 4.9,
    description: 'Professional designs perfect for corporate events and meetings.',
  },
  {
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=2069',
    title: 'Anniversary Collection',
    price: '$249',
    category: 'Anniversary',
    rating: 4.8,
    description: 'Romantic and elegant designs to celebrate your special moments.',
  },
  {
    image: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?auto=format&fit=crop&q=80&w=2069',
    title: 'Baby Shower Package',
    price: '$179',
    category: 'Baby Shower',
    rating: 4.7,
    description: 'Adorable designs to welcome your little bundle of joy.',
  },
];

interface OrderFormData {
  name: string;
  mobile: string;
  categoryType: string;
  quality: string;
  quantity: string;
}

// Add Review interface
interface Review {
  name: string;
  image: string;
  rating: number;
  text: string;
  role: string;
}

// Add review data
const reviews: Review[] = [
  {
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "Absolutely amazing quality! The banners exceeded my expectations. The colors were vibrant and the material was perfect for our outdoor event.",
    role: "Event Organizer"
  },
  {
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "Professional service from start to finish. The team was incredibly helpful and delivered our corporate banners ahead of schedule.",
    role: "Business Owner"
  },
  {
    name: "Emily Davis",
    image: "https://images.unsplash.com/photo-1438761681033-64674bd600d8?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "The custom design service was exceptional! They brought our vision to life perfectly. Will definitely use them again.",
    role: "Marketing Director"
  },
  {
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "Outstanding quality and customer service. The team went above and beyond to ensure our satisfaction.",
    role: "Retail Manager"
  }
];

// Add Category interface
interface CategoryCard {
  title: string;
  icon: React.ReactNode;
  image: string;
  description: string;
}

// Add category data
const categories: CategoryCard[] = [
  {
    title: "Event Banners",
    icon: <Flag className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069",
    description: "Perfect for any special occasion"
  },
  {
    title: "Holiday Specials",
    icon: <Gift className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&q=80&w=2070",
    description: "Festive designs for holidays"
  },
  {
    title: "Award Ceremonies",
    icon: <Award className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=2074",
    description: "Elegant award ceremony designs"
  },
  {
    title: "Party Banners",
    icon: <PartyPopper className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=2069",
    description: "Vibrant party decorations"
  },
  {
    title: "Birthday Celebrations",
    icon: <Cake className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=2071",
    description: "Make birthdays special"
  },
  {
    title: "Corporate Events",
    icon: <Building2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069",
    description: "Professional business banners"
  },
  {
    title: "Graduation",
    icon: <GraduationCap className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2070",
    description: "Celebrate academic success"
  },
  {
    title: "Wedding",
    icon: <Heart className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2070",
    description: "Elegant wedding designs"
  },
  {
    title: "Baby Shower",
    icon: <Baby className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=2070",
    description: "Adorable baby celebrations"
  },
  {
    title: "Concert & Music",
    icon: <Music className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=2070",
    description: "Dynamic music event banners"
  },
  {
    title: "Sports Events",
    icon: <Trophy className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=2070",
    description: "Energetic sports designs"
  },
  {
    title: "Social Gatherings",
    icon: <Users className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069",
    description: "Perfect for social events"
  },
  {
    title: "Festival Banners",
    icon: <Tent className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2070",
    description: "Festive celebration designs"
  },
  {
    title: "Art Exhibitions",
    icon: <Palette className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=2080",
    description: "Artistic exhibition banners"
  },
  {
    title: "Retail & Sales",
    icon: <Store className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=2070",
    description: "Effective retail promotions"
  },
  {
    title: "Photography",
    icon: <Camera className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=2069",
    description: "Photography event banners"
  },
];

// Add this interface after other interfaces
interface CategoryImage {
  url: string;
  title: string;
}

// Add this type for category image mapping
type CategoryImagesMap = {
  [key: string]: CategoryImage[];
};

// Add this constant after other constants
const categoryImages: CategoryImagesMap = {
  "Birthday Celebrations": [
    { url: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84", title: "Birthday Decoration 1" },
    { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d", title: "Birthday Party Setup" },
    { url: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d", title: "Birthday Cake" },
    { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819", title: "Party Balloons" },
    { url: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e", title: "Birthday Decorations" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Party Setup" },
    { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176", title: "Celebration Theme" },
    { url: "https://images.unsplash.com/photo-1507608158173-1dcec673a2e5", title: "Birthday Treats" },
    { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", title: "Party Time" },
    { url: "https://images.unsplash.com/photo-1464347744102-11db6282f854", title: "Birthday Party" },
    // Add more birthday images to complete the grid
  ],
  "Wedding": [
    { url: "https://images.unsplash.com/photo-1519741497674-611481863552", title: "Wedding Setup" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Wedding Decor" },
    { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6", title: "Wedding Ceremony" },
    { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", title: "Wedding Reception" },
    { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf", title: "Wedding Flowers" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Wedding Arch" },
    { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", title: "Wedding Table" },
    { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6", title: "Wedding Details" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Wedding Venue" },
    { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf", title: "Wedding Theme" },
    // Add more wedding images to complete the grid
  ],
  "Corporate Events": [
    { url: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1", title: "Conference Setup" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Corporate Meeting" },
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87", title: "Business Event" },
    { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b", title: "Seminar Hall" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Corporate Banner" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Business Conference" },
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87", title: "Meeting Room" },
    { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b", title: "Event Space" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Corporate Setup" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Business Meeting" },
    // Add more corporate images to complete the grid
  ],
  "Graduation": [
    { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", title: "Graduation Ceremony" },
    { url: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78", title: "Graduation Cap" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Graduate Success" },
    { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f", title: "Class of 2024" },
    { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", title: "Graduation Day" },
    { url: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78", title: "Academic Achievement" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Graduation Banner" },
    { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f", title: "Graduation Setup" },
    { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", title: "Graduation Theme" },
    { url: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78", title: "Academic Celebration" },
    // Add more graduation images to complete the grid
  ],
  "Baby Shower": [
    { url: "https://images.unsplash.com/photo-1519689680058-324335c77eba", title: "Baby Shower Setup" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Baby Celebration" },
    { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176", title: "Baby Party" },
    { url: "https://images.unsplash.com/photo-1519689680058-324335c77eba", title: "Baby Theme" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Baby Shower Decor" },
    { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176", title: "Baby Celebration" },
    { url: "https://images.unsplash.com/photo-1519689680058-324335c77eba", title: "Baby Banner" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Baby Party Setup" },
    { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176", title: "Baby Shower Theme" },
    { url: "https://images.unsplash.com/photo-1519689680058-324335c77eba", title: "Baby Celebration" },
    // Add more baby shower images to complete the grid
  ],
  "Concert & Music": [
    { url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3", title: "Concert Stage" },
    { url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea", title: "Music Festival" },
    { url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b", title: "Live Performance" },
    { url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3", title: "Concert Setup" },
    { url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea", title: "Music Event" },
    { url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b", title: "Concert Banner" },
    { url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3", title: "Music Theme" },
    { url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea", title: "Live Music" },
    { url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b", title: "Concert Event" },
    { url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3", title: "Music Festival" },
    // Add more concert & music images to complete the grid
  ],
  "Event Banners": [
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Event Setup" },
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87", title: "Event Space" },
    { url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329", title: "Event Decoration" },
    { url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a", title: "Event Stage" },
    { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", title: "Event Lighting" },
    { url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3", title: "Event Design" },
    { url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4", title: "Event Banner" },
    { url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329", title: "Event Setup" },
    { url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a", title: "Event Theme" },
    { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", title: "Event Display" },
  ],
  "Holiday Specials": [
    { url: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be", title: "Christmas Decor" },
    { url: "https://images.unsplash.com/photo-1543589077-47d81606c1bf", title: "Holiday Lights" },
    { url: "https://images.unsplash.com/photo-1512389142860-9c449e58a543", title: "Holiday Theme" },
    { url: "https://images.unsplash.com/photo-1545622783-b3e021430fee", title: "Holiday Spirit" },
    { url: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa", title: "Holiday Banner" },
    { url: "https://images.unsplash.com/photo-1481450112092-f00a4c77e381", title: "Holiday Setup" },
    { url: "https://images.unsplash.com/photo-1543258103-a62bdc069871", title: "Holiday Display" },
    { url: "https://images.unsplash.com/photo-1512389142860-9c449e58a543", title: "Holiday Decoration" },
    { url: "https://images.unsplash.com/photo-1545622783-b3e021430fee", title: "Holiday Design" },
    { url: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa", title: "Holiday Event" },
  ],
  "Award Ceremonies": [
    { url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31", title: "Award Stage" },
    { url: "https://images.unsplash.com/photo-1551410224-699683e15636", title: "Trophy Display" },
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87", title: "Ceremony Setup" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Award Banner" },
    { url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31", title: "Award Event" },
    { url: "https://images.unsplash.com/photo-1551410224-699683e15636", title: "Award Display" },
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87", title: "Award Theme" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Award Setup" },
    { url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31", title: "Award Ceremony" },
    { url: "https://images.unsplash.com/photo-1551410224-699683e15636", title: "Award Celebration" },
  ],
  "Sports Events": [
    { url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211", title: "Sports Stadium" },
    { url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2", title: "Sports Competition" },
    { url: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d", title: "Sports Banner" },
     { url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211", title: "Sports Setup" },
    { url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2", title: "Sports Theme" },
    { url: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d", title: "Sports Display" },
    { url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211", title: "Sports Arena" },
    { url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2", title: "Sports Tournament" },
    { url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211", title: "Sports Stadium" },
    { url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2", title: "Sports Competition" },
   
  ],
  "Social Gatherings": [
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Social Event" },
    { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d", title: "Social Setup" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Social Banner" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Social Theme" },
    { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d", title: "Social Display" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Social Gathering" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Social Celebration" },
    { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d", title: "Social Party" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Social Design" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", title: "Social Decoration" },
  ],
  "Festival Banners": [
    { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3", title: "Festival Setup" },
    { url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3", title: "Festival Stage" },
    { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", title: "Festival Banner" },
    { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3", title: "Festival Theme" },
    { url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3", title: "Festival Display" },
    { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", title: "Festival Event" },
    { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3", title: "Festival Decoration" },
    { url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3", title: "Festival Design" },
    { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", title: "Festival Celebration" },
    { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3", title: "Festival Setup" },
  ],
  "Art Exhibitions": [
    { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b", title: "Art Gallery" },
    { url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5", title: "Exhibition Space" },
    { url: "https://images.unsplash.com/photo-1531685250784-7569952593d2", title: "Art Display" },
    { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b", title: "Art Banner" },
    { url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5", title: "Exhibition Setup" },
    { url: "https://images.unsplash.com/photo-1531685250784-7569952593d2", title: "Art Theme" },
    { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b", title: "Exhibition Design" },
    { url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5", title: "Art Show" },
    { url: "https://images.unsplash.com/photo-1531685250784-7569952593d2", title: "Gallery Setup" },
    { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b", title: "Art Exhibition" },
  ],
  "Retail & Sales": [
    { url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc", title: "Retail Banner" },
    { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8", title: "Sale Display" },
    { url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a", title: "Store Setup" },
    { url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc", title: "Retail Theme" },
    { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8", title: "Sales Event" },
    { url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a", title: "Store Banner" },
    { url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc", title: "Retail Design" },
    { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8", title: "Sale Banner" },
    { url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a", title: "Store Display" },
    { url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc", title: "Retail Setup" },
  ],
  "Photography": [
    { url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d", title: "Photo Studio" },
    { url: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5", title: "Camera Setup" },
    { url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", title: "Photography Event" },
    { url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d", title: "Photo Banner" },
    { url: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5", title: "Studio Setup" },
    { url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", title: "Photography Theme" },
    { url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d", title: "Photo Display" },
    { url: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5", title: "Camera Event" },
    { url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", title: "Studio Banner" },
    { url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d", title: "Photography Setup" },
  ],
  "Party Banners": [
    { url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205", title: "Celebration Setup" },
    { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819", title: "Party Time" },
    { url: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44", title: "Party Atmosphere" },
    { url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf", title: "Party Design" },
    { url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92", title: "Party Vibes" },
    { url: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1", title: "Party Space" },
    { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176", title: "Party Fun" },
    { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", title: "Party Elements" },
    { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", title: "Party Mood" },
    { url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205", title: "Celebration Setup" },
    
    ],
};

// Add this before the App function
const qualityOptions = [
  { value: 'standard', label: 'Standard Quality' },
  { value: 'premium', label: 'Premium Quality' },
  { value: 'ultra', label: 'Ultra Premium Quality' }
];

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState<EventCard | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showImageOrderForm, setShowImageOrderForm] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState<{url: string, title: string} | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    mobile: '',
    categoryType: '',
    quality: '',
    quantity: '1'
  });
  const [currentReview, setCurrentReview] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handlePreview = (image: string) => {
    setSelectedImage(image);
  };

  const handleOrder = (card: EventCard) => {
    setSelectedCard(card);
    setShowOrderForm(true);
  };

  const handleImageClick = (image: CategoryImage) => {
    setSelectedImageData(image);
    setShowImageOrderForm(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowImageOrderForm(false);
    setSelectedCategory(null);
    setShowConfirmation(true);
    setFormData({
      name: '',
      mobile: '',
      categoryType: '',
      quality: '',
      quantity: '1'
    });
  };

  // Auto-sliding effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, []);

  // Add this function to handle category click
  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
  };

  // Add new function to handle confirmation close
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <HeroSlider />

      {/* Category Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of banner designs for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => handleCategoryClick(category.title)}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* <button className="bg-white/90 hover:bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                    Explore More
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver excellence in every banner through premium materials, outstanding print quality, and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Premium Materials */}
            <div className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069" 
                  alt="Premium Materials" 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Premium Materials</h3>
              <p className="text-gray-600 leading-relaxed">
                Our banners are crafted using top-grade materials that ensure durability and weather resistance, maintaining vibrant colors in any condition.
              </p>
            </div>

            {/* Superior Print Quality */}
            <div className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=2070" 
                  alt="Print Quality" 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Superior Print Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Using state-of-the-art printing technology, we deliver sharp, vivid images with exceptional color accuracy and detail.
              </p>
            </div>

            {/* Custom Design Service */}
            <div className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&q=80&w=2069" 
                  alt="Custom Design" 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Custom Design Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Our expert designers work closely with you to create unique, eye-catching banners that perfectly match your vision and brand.
              </p>
            </div>

            {/* Fast Delivery */}
            <div className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=2069" 
                  alt="Fast Delivery" 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick turnaround times and reliable delivery ensure your banners arrive when you need them, without compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{marginTop: '-100px'}}>
              Customer Reviews
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our clients have to say about their experience with our banner services.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="max-w-lg mx-auto">
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-indigo-50">
                              <img
                                src={review.image}
                                alt={review.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-1.5">
                              <Star className="w-3 h-3 text-white fill-current" />
                            </div>
                          </div>
                          
                          <div className="text-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-0.5">
                              {review.name}
                            </h3>
                            <p className="text-sm text-indigo-600 font-medium">
                              {review.role}
                            </p>
                          </div>

                          <div className="flex items-center mb-4">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>

                          <blockquote className="text-center">
                            <p className="text-sm text-gray-600 leading-relaxed italic">
                              "{review.text}"
                            </p>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`transition-all duration-300 ${
                    index === currentReview 
                      ? 'w-6 h-1.5 bg-indigo-600' 
                      : 'w-1.5 h-1.5 bg-gray-300'
                  } rounded-full`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Preview" 
            className="max-w-[90%] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && selectedCard && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Place Order</h3>
                <button 
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banner Type</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.categoryType}
                    onChange={(e) => setFormData({...formData, categoryType: e.target.value})}
                  >
                    <option value="">Select type</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300"
                >
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your order has been successfully placed. We'll contact you shortly to confirm the details.
            </p>
            <button
              onClick={handleConfirmationClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Category Images Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="relative max-w-7xl mx-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {selectedCategory} Designs
                </h3>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categoryImages[selectedCategory]?.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <h4 className="text-white text-sm font-medium truncate">
                          {image.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Image Order Form Modal */}
      {showImageOrderForm && selectedImageData && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/10 backdrop-blur-sm">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-white tracking-tight">Place Order</h3>
                <button 
                  onClick={() => setShowImageOrderForm(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Selected Image Preview */}
              <div className="mb-8 rounded-xl overflow-hidden shadow-xl ring-4 ring-white/20">
                <img
                  src={selectedImageData.url}
                  alt={selectedImageData.title}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 shadow-inner transition-all duration-300 hover:bg-white/15"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 shadow-inner transition-all duration-300 hover:bg-white/15"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="Enter mobile number"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Category Type</label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white shadow-inner transition-all duration-300 hover:bg-white/15"
                    value={formData.categoryType}
                    onChange={(e) => setFormData({...formData, categoryType: e.target.value})}
                  >
                    <option value="" className="text-gray-800">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.title} value={cat.title} className="text-gray-800">
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Quality</label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white shadow-inner transition-all duration-300 hover:bg-white/15"
                    value={formData.quality}
                    onChange={(e) => setFormData({...formData, quality: e.target.value})}
                  >
                    <option value="" className="text-gray-800">Select quality</option>
                    {qualityOptions.map((option) => (
                      <option key={option.value} value={option.value} className="text-gray-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 shadow-inner transition-all duration-300 hover:bg-white/15"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 font-semibold py-3.5 px-4 rounded-xl hover:bg-white/90 transition-all duration-300 mt-8 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-white/30"
                >
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-5 py-5">
            {/* Company Info */}
            <div className="space-y-4">
              <h4 className="text-2xl font-bold mb-6">Flex Design</h4>
              <p className="text-gray-300 leading-relaxed">
                Creating high-quality, customizable banners with premium materials and exceptional craftsmanship for all your needs.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Portfolio', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {[
                  'Custom Banners',
                  'Event Displays',
                  'Business Signs',
                  'Wedding Banners',
                  'Trade Show Materials'
                ].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <span>123 Design Street, Creative City, 12345</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-indigo-400" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-indigo-400" />
                  <span>info@flexdesign.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm text-center md:text-left">
                  © {new Date().getFullYear()} Flex Design. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm text-gray-400">
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;