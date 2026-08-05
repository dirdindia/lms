import { useState } from "react";
import { Upload, Camera, ChevronRight, ChevronLeft, Check } from "lucide-react";
import api from "../utils/api";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

// Helper components for UI
const StepIndicator = ({ currentStep, totalSteps, title }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <span className="text-sm font-medium text-brand">Step {currentStep} of {totalSteps}</span>
    </div>
    <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="bg-brand transition-all duration-500 ease-in-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  </div>
);

const ProfileUpload = ({ onUploadSuccess, value }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dgeyhf2ij");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dgeyhf2ij/auto/upload", {
        method: "POST",
        body: data
      });
      const uploadedData = await res.json();
      onUploadSuccess(uploadedData.secure_url);
      Toast.fire({ icon: 'success', title: 'Profile picture uploaded!' });
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: 'error', title: 'Image upload failed' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center sm:col-span-2 mb-4">
      <div className="relative group">
        <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-dashed border-border bg-secondary flex items-center justify-center transition-colors group-hover:border-brand">
          {uploading ? (
            <span className="text-xs font-semibold text-brand animate-pulse">Uploading</span>
          ) : value ? (
            <img src={value} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <Camera className="h-8 w-8 text-muted-foreground group-hover:text-brand transition-colors" />
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="absolute inset-0 cursor-pointer opacity-0" />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Upload Profile Picture (Optional)</p>
    </div>
  );
};

const FileUpload = ({ label, accept, multiple = false, onUploadSuccess, value }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    
    try {
      const uploadPromises = files.map(file => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dgeyhf2ij");
        return fetch("https://api.cloudinary.com/v1_1/dgeyhf2ij/auto/upload", {
          method: "POST",
          body: data
        }).then(res => res.json());
      });

      const results = await Promise.all(uploadPromises);
      const urls = results.map(res => res.secure_url);
      
      if (multiple) {
        onUploadSuccess(urls);
      } else {
        onUploadSuccess(urls[0]);
      }
      Toast.fire({ icon: 'success', title: 'File(s) uploaded successfully' });
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: 'error', title: 'File upload failed' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2 sm:col-span-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex items-center justify-center w-full">
        <label className={`flex flex-col items-center justify-center w-full min-h-[8rem] rounded-xl border-2 border-dashed border-border bg-secondary/50 transition-colors ${uploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:bg-secondary'}`}>
          <div className="flex flex-col items-center justify-center p-4 w-full">
            {uploading ? (
              <>
                <Upload className="w-8 h-8 mb-3 text-brand animate-bounce" />
                <p className="mb-2 text-sm font-semibold text-brand">Uploading...</p>
              </>
            ) : value && (!multiple || value.length > 0) ? (
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-wrap gap-2 justify-center mb-2 w-full">
                  {(Array.isArray(value) ? value : [value]).map((url, idx) => {
                    const isImage = url.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;
                    return (
                      <div key={idx} className="h-14 w-14 overflow-hidden rounded-md border border-border flex-shrink-0 bg-background">
                        {isImage ? (
                          <img src={url} alt="Preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-brand break-all text-center">FILE</div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-2 font-medium">Click or drag to replace</p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-brand">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 5MB)</p>
              </>
            )}
          </div>
          <input type="file" accept={accept} multiple={multiple} onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text", placeholder, required = true, className = "", name, value, onChange }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="text-sm font-medium text-foreground">{label} {required && <span className="text-destructive">*</span>}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
    />
  </div>
);

const SelectField = ({ label, options, required = true, className = "", name, value, onChange }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="text-sm font-medium text-foreground">{label} {required && <span className="text-destructive">*</span>}</label>
    <select
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default function Register() {
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", dob: "", gender: "", profilePicture: "",
    classGrade: "", educationBoard: "", schoolName: "", subjectsOfInterest: "", parentName: "", parentPhone: "", address: "", city: "", pincode: "",
    highestQualification: "", subjectSpecialization: "", yearsOfExperience: "", isEmployed: false, employedSchool: "", currentDesignation: "", employedLocation: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleProfilePictureUpload = (url) => {
    setFormData({ ...formData, profilePicture: url });
  };

  const handleResumeUpload = (url) => {
    setFormData({ ...formData, resume: url });
  };

  const handleCertificatesUpload = (urls) => {
    setFormData({ ...formData, educationCertificates: urls });
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post("/users/register", { ...formData, role });
      Toast.fire({
        icon: 'success',
        title: 'Registration Successful!'
      });
      setSubmitted(true);
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.response?.data?.message || "Something went wrong. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRole("");
    setStep(1);
    setSubmitted(false);
    setErrorMsg("");
    setFormData({
      name: "", email: "", phone: "", password: "", dob: "", gender: "", profilePicture: "",
      classGrade: "", educationBoard: "", schoolName: "", subjectsOfInterest: "", parentName: "", parentPhone: "", address: "", city: "", pincode: "",
      highestQualification: "", subjectSpecialization: "", yearsOfExperience: "", isEmployed: false, employedSchool: "", currentDesignation: "", employedLocation: ""
    });
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-32 text-center sm:px-6">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft">
          <Check className="h-10 w-10 text-brand" strokeWidth={3} />
        </div>
        <h2 className="text-3xl font-semibold text-brand-deep">Registration Successful!</h2>
        <p className="mt-4 text-muted-foreground">Thank you for registering. We have received your details.</p>
        <button
          onClick={resetForm}
          className="mt-8 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-lift hover:-translate-y-0.5 cursor-pointer transition-transform"
        >
          Register Another Account
        </button>
      </div>
    );
  }



  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-brand-deep sm:text-4xl">Join the Platform</h1>
        <p className="mt-4 text-sm text-muted-foreground">Create an account to start your journey.</p>
      </div>

      <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">
        <div className="p-6 sm:p-10">
          {!role ? (
            <div className="space-y-6 py-10 text-center">
              <h2 className="text-xl font-semibold text-foreground">Select your role to begin</h2>
              <div className="mx-auto max-w-sm">
                <SelectField
                  label="Register as"
                  options={[
                    { value: "student", label: "I am a Student" },
                    { value: "teacher", label: "I am a Teacher" },
                  ]}
                  onChange={(e) => {
                    if (e.target.value) {
                      setRole(e.target.value);
                      setStep(1);
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* --- STUDENT FLOW --- */}
              {role === "student" && (
                <>
                  {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <StepIndicator currentStep={1} totalSteps={3} title="Personal Details" />
                      <div className="grid gap-6 sm:grid-cols-2">
                        <ProfileUpload onUploadSuccess={handleProfilePictureUpload} value={formData.profilePicture} />
                        <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                        <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" />
                        <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 98765 43210" />
                        <InputField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" />
                        <InputField label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
                        <SelectField
                          label="Gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                          ]}
                        />
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <StepIndicator currentStep={2} totalSteps={3} title="Academic Details" />
                      <div className="grid gap-6 sm:grid-cols-2">
                        <SelectField
                          label="Class / Grade"
                          name="classGrade" value={formData.classGrade} onChange={handleChange}
                          options={[
                            { value: "9", label: "Class 9" },
                            { value: "10", label: "Class 10" },
                            { value: "11", label: "Class 11" },
                            { value: "12", label: "Class 12" },
                            { value: "other", label: "Competitive Exams / Other" },
                          ]}
                        />
                        <SelectField
                          label="Education Board"
                          name="educationBoard" value={formData.educationBoard} onChange={handleChange}
                          options={[
                            { value: "cbse", label: "CBSE" },
                            { value: "icse", label: "ICSE" },
                            { value: "state", label: "State Board" },
                            { value: "other", label: "Other" },
                          ]}
                        />
                        <InputField label="School Name" name="schoolName" value={formData.schoolName} onChange={handleChange} placeholder="Delhi Public School" className="sm:col-span-2" />
                        <InputField label="Subjects of Interest" name="subjectsOfInterest" value={formData.subjectsOfInterest} onChange={handleChange} placeholder="e.g. Mathematics, Science" className="sm:col-span-2" />
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <StepIndicator currentStep={3} totalSteps={3} title="Parent & Address Details" />
                      <div className="grid gap-6 sm:grid-cols-2">
                        <InputField label="Parent / Guardian Name" name="parentName" value={formData.parentName} onChange={handleChange} placeholder="Parent Name" />
                        <InputField label="Parent Phone Number" name="parentPhone" value={formData.parentPhone} onChange={handleChange} type="tel" placeholder="+91 98765 43210" />
                        <InputField label="Full Residential Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Street Name, Area" className="sm:col-span-2" />
                        <InputField label="City / District" name="city" value={formData.city} onChange={handleChange} placeholder="Sahibganj" />
                        <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="816101" />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* --- TEACHER FLOW --- */}
              {role === "teacher" && (
                <>
                  {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <StepIndicator currentStep={1} totalSteps={3} title="Personal Details" />
                      <div className="grid gap-6 sm:grid-cols-2">
                        <ProfileUpload onUploadSuccess={handleProfilePictureUpload} value={formData.profilePicture} />
                        <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" />
                        <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="jane@example.com" />
                        <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 98765 43210" />
                        <InputField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" />
                        <InputField label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
                        <SelectField
                          label="Gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                          ]}
                        />
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <StepIndicator currentStep={2} totalSteps={3} title="Qualifications & Experience" />
                      <div className="grid gap-6 sm:grid-cols-2">
                        <InputField label="Highest Qualification" name="highestQualification" value={formData.highestQualification} onChange={handleChange} placeholder="e.g. M.Sc. Mathematics, B.Ed." className="sm:col-span-2" />
                        <InputField label="Subject Specialization" name="subjectSpecialization" value={formData.subjectSpecialization} onChange={handleChange} placeholder="e.g. Math, Physics" />
                        <InputField label="Total Years of Experience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} type="number" placeholder="e.g. 5" />
                        <FileUpload label="Upload Resume / CV" accept=".pdf,.doc,.docx" onUploadSuccess={handleResumeUpload} value={formData.resume} />
                        <FileUpload label="Upload Education Certificate(s)" accept=".pdf,.jpg,.png" multiple onUploadSuccess={handleCertificatesUpload} value={formData.educationCertificates} />
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <StepIndicator currentStep={3} totalSteps={3} title="Employment Details" />
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <label className="text-sm font-medium text-foreground">Are you currently employed? <span className="text-destructive">*</span></label>
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input required type="radio" name="isEmployed" value="true" checked={formData.isEmployed === true || formData.isEmployed === "true"} onChange={() => setFormData(prev => ({ ...prev, isEmployed: true }))} className="text-brand focus:ring-brand" />
                              <span className="text-sm">Yes, I am working</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input required type="radio" name="isEmployed" value="false" checked={formData.isEmployed === false || formData.isEmployed === "false"} onChange={() => setFormData(prev => ({ ...prev, isEmployed: false }))} className="text-brand focus:ring-brand" />
                              <span className="text-sm">No, I am not currently working</span>
                            </label>
                          </div>
                        </div>

                        {(formData.isEmployed === true || formData.isEmployed === "true") && (
                          <>
                            <InputField label="School / Organization Name" name="employedSchool" value={formData.employedSchool} onChange={handleChange} placeholder="Delhi Public School" className="sm:col-span-2 animate-in fade-in zoom-in-95" />
                            <InputField label="Current Designation" name="currentDesignation" value={formData.currentDesignation} onChange={handleChange} placeholder="Senior Mathematics Teacher" className="animate-in fade-in zoom-in-95" />
                            <InputField label="Location / City" name="employedLocation" value={formData.employedLocation} onChange={handleChange} placeholder="Sahibganj" className="animate-in fade-in zoom-in-95" />
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Form Navigation Controls */}
              <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                <button
                  type="button"
                  onClick={step === 1 ? resetForm : handlePrev}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary cursor-pointer"
                >
                  {step === 1 ? "Change Role" : <><ChevronLeft className="h-4 w-4" /> Previous Step</>}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Processing..." : step === 3 ? "Submit Application" : <>Next Step <ChevronRight className="h-4 w-4" /></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
