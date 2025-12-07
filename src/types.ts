export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  publishedAt: string;
  body: any;
}

export interface Department {
  _id: string;
  title: string;
  slug: { current: string };
  icon: string; // Changed from Image object to string
  description: any;
}

export interface Staff {
  _id: string;
  name: string;
  role: string;
  // Add this line:
  category: 'executive' | 'legislative' | 'management' | 'traditional';
  photo: {
    asset: {
      _ref: string;
    };
  };
  bio: string;
}

export interface Project {
  _id: string;
  title: string;
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  startDate: string;
  location: string;
  status: string;
}

export interface CityDocument {
  _id: string;
  title: string;
  publishedAt: string;
  file: {
    asset: {
      url: string; // The direct link to download the PDF
    };
  };
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  photo: {
    asset: {
      _ref: string;
    };
  };
  rating: number;
  text: string;
}

export interface GalleryImage {
  _id: string;
  title: string;
  details: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

export interface AboutPageData {
  // Section 1
  introHeading: string;
  introText: string;
  keyPoints: string[];
  introImage: any;
  chairmanSign: any;

  // New History Fields
  historySubtitle: string;
  historyTitle: string;
  historyText: any;
  
  // Section 2
  peopleTitle: string;
  peopleText: any;
  peopleImage: any;
  // Section 3
  festivalsText: any;
  cuisineText: any;
  languageText: any;
  occupationText: any;
  // Section 4
  rulers: {
    _key: string;
    name: string;
    title: string;
    photo: any;
  }[];
}