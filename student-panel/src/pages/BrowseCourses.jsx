import React, { useState } from 'react';
import { Search, Filter, Star, Clock, BookOpen, IndianRupee, CheckCircle2 } from 'lucide-react';

const COURSES = [
  {
    id: 1,
    title: 'Complete Mathematics - Class 10 (CBSE)',
    instructor: 'Rahul Sharma',
    rating: 4.8,
    reviews: 1240,
    duration: '45 Hours',
    modules: 12,
    price: 1499,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop',
    tags: ['Class 10', 'Math']
  },
  {
    id: 2,
    title: 'Physics Mastery for NEET/JEE Foundation',
    instructor: 'Dr. Anita Verma',
    rating: 4.9,
    reviews: 856,
    duration: '60 Hours',
    modules: 15,
    price: 2499,
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=600&auto=format&fit=crop',
    tags: ['NEET', 'JEE', 'Physics']
  },
  {
    id: 3,
    title: 'English Grammar & Writing Skills',
    instructor: 'Sonia Kapoor',
    rating: 4.7,
    reviews: 532,
    duration: '30 Hours',
    modules: 8,
    price: 999,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    tags: ['English', 'Grammar']
  },
  {
    id: 4,
    title: 'Science Complete Syllabus - Class 9',
    instructor: 'Vivek Singh',
    rating: 4.6,
    reviews: 921,
    duration: '50 Hours',
    modules: 14,
    price: 1299,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop',
    tags: ['Class 9', 'Science']
  }
];

export default function BrowseCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [purchasingCourse, setPurchasingCourse] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);

  const filteredCourses = COURSES.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePurchase = (course) => {
    setPurchasingCourse(course.id);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setPurchasingCourse(null);
      setPurchaseSuccess(course.id);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setPurchaseSuccess(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Browse & Purchase Courses</h1>
          <p className="text-gray-500 mt-1">Explore our catalog and enroll in new courses to boost your learning.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-auto flex-1 md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand focus:border-brand sm:text-sm transition-shadow shadow-sm"
            placeholder="Search for courses or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters (Mock UI) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white text-sm font-medium rounded-full shadow-sm whitespace-nowrap">
          All Courses
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap">
          Class 9 & 10
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap">
          Class 11 & 12
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap">
          Competitive Exams
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap ml-auto">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            
            {/* Image & Tags */}
            <div className="relative aspect-video bg-gray-100 overflow-hidden shrink-0">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              <div className="absolute top-3 left-3 flex gap-2">
                {course.tags.map(tag => (
                  <span key={tag} className="bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>
              
              {/* Stats */}
              <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="text-gray-900">{course.rating}</span>
                  <span>({course.reviews})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {course.modules} Modules
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-0.5 text-xl font-bold text-gray-900">
                  <IndianRupee className="h-5 w-5" />
                  {course.price}
                </div>
                
                {purchaseSuccess === course.id ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 text-green-700 rounded-xl text-sm font-bold border border-green-200">
                    <CheckCircle2 className="h-5 w-5" /> Enrolled
                  </div>
                ) : (
                  <button
                    onClick={() => handlePurchase(course)}
                    disabled={purchasingCourse === course.id}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-brand-deep transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                  >
                    {purchasingCourse === course.id ? 'Processing...' : 'Purchase Now'}
                  </button>
                )}
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your search term.</p>
        </div>
      )}
    </div>
  );
}
