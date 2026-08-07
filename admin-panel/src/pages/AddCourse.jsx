import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Upload, Plus, Trash2, GripVertical, Image as ImageIcon, 
  Video, FileText, Settings, DollarSign, BookOpen, LayoutDashboard 
} from 'lucide-react';

export default function AddCourse() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  
  const [courseData, setCourseData] = useState({
    title: '',
    shortDescription: '',
    category: 'Programming',
    level: 'Beginner',
    pricingType: 'paid',
    regularPrice: '',
    discountedPrice: '',
    whatYouWillLearn: '',
    dripContent: false,
    issueCertificate: true,
    thumbnailUrl: '',
    promoVideoUrl: '',
    chapters: [
      { id: 1, title: 'Introduction', lessons: [{ id: 1, title: 'Welcome to the Course', contents: [{ id: 1, type: 'video', title: 'Intro Video', url: '', isUploading: false }] }] }
    ]
  });

  const [isUploadingMedia, setIsUploadingMedia] = useState({
    thumbnailUrl: false,
    promoVideoUrl: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData({
      ...courseData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addChapter = () => {
    const newId = courseData.chapters.length ? Math.max(...courseData.chapters.map(c => c.id)) + 1 : 1;
    setCourseData({
      ...courseData,
      chapters: [...courseData.chapters, { id: newId, title: 'New Chapter', lessons: [] }]
    });
  };

  const addLesson = (chapterId) => {
    setCourseData({
      ...courseData,
      chapters: courseData.chapters.map(chapter => {
        if (chapter.id === chapterId) {
          const newLessonId = chapter.lessons.length ? Math.max(...chapter.lessons.map(l => l.id)) + 1 : 1;
          return {
            ...chapter,
            lessons: [...chapter.lessons, { id: newLessonId, title: 'New Lesson', contents: [] }]
          };
        }
        return chapter;
      })
    });
  };

  const deleteChapter = (chapterId) => {
    setCourseData({
      ...courseData,
      chapters: courseData.chapters.filter(chapter => chapter.id !== chapterId)
    });
  };

  const deleteLesson = (chapterId, lessonId) => {
    setCourseData({
      ...courseData,
      chapters: courseData.chapters.map(chapter => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.filter(lesson => lesson.id !== lessonId)
          };
        }
        return chapter;
      })
    });
  };

  const addContent = (chapterId, lessonId) => {
    setCourseData({
      ...courseData,
      chapters: courseData.chapters.map(chapter => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                const newContentId = lesson.contents.length ? Math.max(...lesson.contents.map(c => c.id)) + 1 : 1;
                return { ...lesson, contents: [...lesson.contents, { id: newContentId, type: 'video', title: 'New Content', url: '', isUploading: false }] };
              }
              return lesson;
            })
          };
        }
        return chapter;
      })
    });
  };

  const deleteContent = (chapterId, lessonId, contentId) => {
    setCourseData({
      ...courseData,
      chapters: courseData.chapters.map(chapter => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                return { ...lesson, contents: lesson.contents.filter(c => c.id !== contentId) };
              }
              return lesson;
            })
          };
        }
        return chapter;
      })
    });
  };

  const handleFileUpload = async (e, chapterId, lessonId, contentId) => {
    const file = e.target.files[0];
    if (!file) return;

    setCourseData(prev => ({
      ...prev,
      chapters: prev.chapters.map(c => c.id === chapterId ? {
        ...c, lessons: c.lessons.map(l => l.id === lessonId ? {
          ...l, contents: l.contents.map(cnt => cnt.id === contentId ? { ...cnt, isUploading: true } : cnt)
        } : l)
      } : c)
    }));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'default_preset');
    
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'default_cloud';

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setCourseData(prev => ({
          ...prev,
          chapters: prev.chapters.map(c => c.id === chapterId ? {
            ...c, lessons: c.lessons.map(l => l.id === lessonId ? {
              ...l, contents: l.contents.map(cnt => cnt.id === contentId ? { ...cnt, url: data.secure_url, isUploading: false } : cnt)
            } : l)
          } : c)
        }));
      } else {
        console.error("Upload failed", data);
        setCourseData(prev => ({
          ...prev,
          chapters: prev.chapters.map(c => c.id === chapterId ? {
            ...c, lessons: c.lessons.map(l => l.id === lessonId ? {
              ...l, contents: l.contents.map(cnt => cnt.id === contentId ? { ...cnt, isUploading: false } : cnt)
            } : l)
          } : c)
        }));
      }
    } catch (err) {
      console.error("Upload error", err);
      setCourseData(prev => ({
        ...prev,
        chapters: prev.chapters.map(c => c.id === chapterId ? {
          ...c, lessons: c.lessons.map(l => l.id === lessonId ? {
            ...l, contents: l.contents.map(cnt => cnt.id === contentId ? { ...cnt, isUploading: false } : cnt)
          } : l)
        } : c)
      }));
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: LayoutDashboard },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border pb-4">
        <button 
          onClick={() => navigate('/courses')}
          className="p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Add New Course</h1>
          <p className="text-sm text-muted-foreground">Create a new premium course for your students.</p>
        </div>
        <div className="ml-auto flex gap-3">
          <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
            Save as Draft
          </button>
          <button className="bg-brand text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-deep transition-colors shadow-sm cursor-pointer">
            Publish Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Tabs */}
        <div className="md:col-span-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-brand/10 text-brand' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand' : 'text-muted-foreground'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 bg-card border border-border rounded-2xl shadow-sm p-6 lg:p-8">
          
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Basic Information</h2>
                <p className="text-sm text-muted-foreground mb-6">Enter the core details of your course.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Course Title</label>
                  <input type="text" name="title" value={courseData.title} onChange={handleChange} placeholder="e.g. Complete Web Development Bootcamp" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">Short Description</label>
                  <textarea name="shortDescription" value={courseData.shortDescription} onChange={handleChange} rows="2" placeholder="A brief summary of what students will learn..." className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow resize-none"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Category</label>
                    <select name="category" value={courseData.category} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow">
                      <option value="Programming">Programming</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Level</label>
                    <select name="level" value={courseData.level} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Course Media</h2>
                <p className="text-sm text-muted-foreground mb-6">Upload attractive imagery and a promo video.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Course Thumbnail (1280x720)</label>
                  <div className="relative border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center bg-muted/30 hover:bg-muted/50 transition-colors group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(e, 'thumbnailUrl')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {isUploadingMedia.thumbnailUrl ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-medium text-sm text-brand animate-pulse">Uploading Image...</p>
                      </div>
                    ) : courseData.thumbnailUrl ? (
                      <div className="flex flex-col items-center justify-center">
                        <img src={courseData.thumbnailUrl} alt="Thumbnail preview" className="max-h-32 rounded object-cover mb-2" />
                        <p className="text-xs text-brand font-medium">Click to replace</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                          <ImageIcon className="w-6 h-6 text-brand" />
                        </div>
                        <p className="font-medium text-sm">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Promo Video (Optional)</label>
                  <div className="relative border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center bg-muted/30 hover:bg-muted/50 transition-colors group">
                    <input 
                      type="file" 
                      accept="video/*"
                      onChange={(e) => handleMediaUpload(e, 'promoVideoUrl')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {isUploadingMedia.promoVideoUrl ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-medium text-sm text-brand animate-pulse">Uploading Video...</p>
                      </div>
                    ) : courseData.promoVideoUrl ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-2 shadow-sm">
                          <Video className="w-6 h-6 text-brand" />
                        </div>
                        <p className="font-medium text-sm text-brand">Video uploaded successfully!</p>
                        <p className="text-xs text-muted-foreground mt-1">Click to replace</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                          <Video className="w-6 h-6 text-brand" />
                        </div>
                        <p className="font-medium text-sm">Upload promo video</p>
                        <p className="text-xs text-muted-foreground mt-1">MP4, WebM (max. 50MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Pricing Strategy</h2>
                <p className="text-sm text-muted-foreground mb-6">Set up how much students will pay for this course.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Pricing Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pricingType" value="paid" checked={courseData.pricingType === 'paid'} onChange={handleChange} className="text-brand focus:ring-brand" />
                      <span className="text-sm font-medium">Paid (One-time)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pricingType" value="free" checked={courseData.pricingType === 'free'} onChange={handleChange} className="text-brand focus:ring-brand" />
                      <span className="text-sm font-medium">Free</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pricingType" value="subscription" checked={courseData.pricingType === 'subscription'} onChange={handleChange} className="text-brand focus:ring-brand" />
                      <span className="text-sm font-medium">Subscription</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Regular Price ($)</label>
                    <input type="number" name="regularPrice" value={courseData.regularPrice} onChange={handleChange} placeholder="99" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Discounted Price ($) (Optional)</label>
                    <input type="number" name="discountedPrice" value={courseData.discountedPrice} onChange={handleChange} placeholder="79" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Curriculum builder</h2>
                  <p className="text-sm text-muted-foreground">Add chapters and lessons to your course.</p>
                </div>
                <button 
                  onClick={addChapter}
                  className="flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-deep bg-brand/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Chapter
                </button>
              </div>

              <div className="space-y-4">
                {courseData.chapters.map((chapter, cIndex) => (
                  <div key={chapter.id} className="border border-border rounded-xl bg-background overflow-hidden shadow-sm">
                    {/* Chapter Header */}
                    <div className="bg-muted/40 px-4 py-3 flex items-center justify-between border-b border-border">
                      <div className="flex items-center gap-3 w-full">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                        <span className="font-semibold text-sm">Chapter {cIndex + 1}:</span>
                        <input 
                          type="text" 
                          value={chapter.title} 
                          onChange={(e) => {
                            const newChapters = [...courseData.chapters];
                            newChapters[cIndex].title = e.target.value;
                            setCourseData({ ...courseData, chapters: newChapters });
                          }}
                          className="bg-transparent border-none focus:outline-none text-sm font-medium flex-1 px-2 py-1 hover:bg-muted/50 rounded transition-colors"
                        />
                      </div>
                      <div className="flex items-center gap-2 ml-4 shrink-0">
                        <button onClick={() => deleteChapter(chapter.id)} className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Lessons */}
                    <div className="p-4 space-y-4">
                      {chapter.lessons.map((lesson, lIndex) => (
                        <div key={lesson.id} className="bg-card border border-border p-4 rounded-lg space-y-3 shadow-sm">
                          <div className="flex items-center gap-3 group">
                            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span className="text-sm font-semibold text-muted-foreground">Lesson {lIndex + 1}:</span>
                            <input 
                              type="text" 
                              value={lesson.title}
                              onChange={(e) => {
                                const newChapters = [...courseData.chapters];
                                newChapters[cIndex].lessons[lIndex].title = e.target.value;
                                setCourseData({ ...courseData, chapters: newChapters });
                              }}
                              className="bg-transparent border-none focus:outline-none text-sm font-medium flex-1"
                              placeholder="Lesson Title"
                            />
                            <button onClick={() => deleteLesson(chapter.id, lesson.id)} className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors opacity-50 group-hover:opacity-100 cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Lesson Contents */}
                          <div className="pl-7 space-y-2">
                            {lesson.contents.map((content, contentIndex) => (
                              <div key={content.id} className="flex flex-col gap-2 bg-muted/20 p-2 rounded border border-border group/content">
                                <div className="flex items-center gap-3">
                                  <GripVertical className="w-3.5 h-3.5 text-muted-foreground cursor-move opacity-30 group-hover/content:opacity-100 transition-opacity" />
                                  
                                  {content.type === 'video' ? <Video className="w-4 h-4 text-brand" /> : 
                                   content.type === 'pdf' ? <FileText className="w-4 h-4 text-destructive" /> : 
                                   content.type === 'image' ? <ImageIcon className="w-4 h-4 text-brand" /> :
                                   <FileText className="w-4 h-4 text-brand" />}
                                  
                                  <input 
                                    type="text" 
                                    value={content.title}
                                    onChange={(e) => {
                                      const newChapters = [...courseData.chapters];
                                      newChapters[cIndex].lessons[lIndex].contents[contentIndex].title = e.target.value;
                                      setCourseData({ ...courseData, chapters: newChapters });
                                    }}
                                    className="bg-transparent border-none focus:outline-none text-xs flex-1"
                                    placeholder="Content Title"
                                  />
                                  
                                  <select 
                                    value={content.type}
                                    onChange={(e) => {
                                      const newChapters = [...courseData.chapters];
                                      newChapters[cIndex].lessons[lIndex].contents[contentIndex].type = e.target.value;
                                      setCourseData({ ...courseData, chapters: newChapters });
                                    }}
                                    className="text-[11px] bg-background border border-border rounded px-1.5 py-1 outline-none cursor-pointer"
                                  >
                                    <option value="video">Video</option>
                                    <option value="pdf">PDF</option>
                                    <option value="ppt">PPT</option>
                                    <option value="image">Image</option>
                                  </select>

                                  <button onClick={() => deleteContent(chapter.id, lesson.id, content.id)} className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors opacity-30 group-hover/content:opacity-100 cursor-pointer">
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                                <div className="pl-7 pr-2 flex items-center">
                                  {content.type === 'video' ? (
                                    <input 
                                      type="text"
                                      value={content.url || ''}
                                      onChange={(e) => {
                                        const newChapters = [...courseData.chapters];
                                        newChapters[cIndex].lessons[lIndex].contents[contentIndex].url = e.target.value;
                                        setCourseData({ ...courseData, chapters: newChapters });
                                      }}
                                      className="text-xs w-full bg-background border border-border rounded px-2 py-1.5 outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-shadow"
                                      placeholder="Paste Video URL (YouTube, Vimeo, etc.)"
                                    />
                                  ) : (
                                    <div className="flex items-center gap-3 w-full bg-background border border-border rounded px-2 py-1">
                                      {content.isUploading ? (
                                        <span className="text-xs font-medium text-brand animate-pulse py-0.5">Uploading to Cloudinary...</span>
                                      ) : (
                                        <>
                                          <input 
                                            type="file" 
                                            onChange={(e) => handleFileUpload(e, chapter.id, lesson.id, content.id)}
                                            className="text-xs flex-1 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-brand/10 file:text-brand hover:file:bg-brand/20 cursor-pointer"
                                          />
                                          {content.url && (
                                            <a href={content.url} target="_blank" rel="noreferrer" className="text-xs font-medium text-brand hover:underline truncate max-w-[150px] shrink-0">
                                              View File
                                            </a>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            <button 
                              onClick={() => addContent(chapter.id, lesson.id)}
                              className="text-[11px] font-medium text-brand hover:text-brand-deep flex items-center gap-1 py-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" /> Add Media/Content
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button 
                        onClick={() => addLesson(chapter.id)}
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pt-2 px-2 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Lesson
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Course Settings</h2>
                <p className="text-sm text-muted-foreground mb-6">Manage extra details and configurations.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">What will students learn?</label>
                  <textarea name="whatYouWillLearn" value={courseData.whatYouWillLearn} onChange={handleChange} rows="3" placeholder="Enter key takeaways separated by commas..." className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow resize-none"></textarea>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div>
                    <h3 className="font-medium text-sm">Drip Content</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Release lessons over time instead of all at once.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="dripContent" checked={courseData.dripContent} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div>
                    <h3 className="font-medium text-sm">Issue Certificate</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Automatically issue a certificate upon completion.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="issueCertificate" checked={courseData.issueCertificate} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
