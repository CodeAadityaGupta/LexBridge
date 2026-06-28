import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar } from 'lucide-react';
import { lawyerService } from '../../services/lawyerService';
import Modal from '../UI/Modal';
import Input from '../UI/input';
import Button from '../UI/Button';
import Spinner from '../UI/spinner';

export default function BookingModal({ isOpen, onClose, lawyerName, specialty, lawyerId }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [issueType, setIssueType] = useState(specialty || 'General Practice');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');

  // Validation States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateField = (field, value) => {
    let err = '';
    if (field === 'name') {
      if (!value.trim()) err = 'Full name is required';
    } else if (field === 'email') {
      if (!value) {
        err = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        err = 'Please enter a valid email address';
      }
    } else if (field === 'phone') {
      if (!value) {
        err = 'Phone number is required';
      } else if (!/^\+?[0-9\s\-()]{10,15}$/.test(value)) {
        err = 'Please enter a valid phone number (10-15 digits)';
      }
    } else if (field === 'description') {
      if (!value.trim()) {
        err = 'Situation description is required';
      } else if (value.trim().length < 20) {
        err = 'Please describe your situation in at least 20 characters';
      }
    } else if (field === 'dateTime') {
      if (!value) err = 'Preferred date and time are required';
    }
    return err;
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleInputChange = (field, value, setter) => {
    setter(value);
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  // Check overall form validity
  const isFormValid = () => {
    const fields = { name, email, phone, description, dateTime };
    const newErrors = {};
    let valid = true;

    Object.keys(fields).forEach((key) => {
      const err = validateField(key, fields[key]);
      if (err) {
        newErrors[key] = err;
        valid = false;
      }
    });

    return { valid, newErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, newErrors } = isFormValid();
    
    if (!valid) {
      setErrors(newErrors);
      setTouched(
        Object.keys(newErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return;
    }

    setLoading(true);
    setApiError('');

    const bookingData = {
      lawyerId,
      lawyerName,
      name,
      email,
      phone,
      issueType,
      description,
      dateTime,
    };

    try {
      await lawyerService.bookConsultation(bookingData);
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || 'Something went wrong sending your request. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    // Clear Form fields
    setName('');
    setEmail('');
    setPhone('');
    setDescription('');
    setDateTime('');
    setErrors({});
    setTouched({});
    onClose();
    navigate('/dashboard');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={success ? handleCloseSuccess : onClose}
      title={success ? '' : `Book consultation with ${lawyerName}`}
      className="max-h-[90vh]"
    >
      {success ? (
        /* Success State */
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 select-none font-sans">
          <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center text-white shadow-card animate-scaleUp shrink-0">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-ink">
              Consultation Scheduled
            </h3>
            <p className="text-muted text-xs leading-relaxed max-w-xs mx-auto">
              We've dispatched a summary receipt to <strong className="text-ink font-semibold">{email}</strong>.<br />
              The advocate will contact you within 24 hours.
            </p>
          </div>

          <Button 
            onClick={handleCloseSuccess}
            variant="primary"
            className="px-6 h-10 shadow-sm text-xs font-bold uppercase tracking-wider rounded-md"
          >
            Back to Directory
          </Button>
        </div>
      ) : (
        /* Form State */
        <form onSubmit={handleSubmit} className="space-y-5 font-sans relative">
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-x-0 -top-7 -bottom-7 bg-card/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-2">
              <Spinner size="md" />
              <span className="text-xs text-muted font-sans font-semibold">Booking Consultation Context...</span>
            </div>
          )}

          {apiError && (
            <div className="p-3.5 text-xs bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-error rounded font-bold animate-scaleUp">
              {apiError}
            </div>
          )}

          <Input
            label="Your Full Name"
            type="text"
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value, setName)}
            onBlur={() => handleBlur('name', name)}
            error={touched.name && errors.name}
            placeholder="e.g. Rohan Sharma"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value, setEmail)}
              onBlur={() => handleBlur('email', email)}
              error={touched.email && errors.email}
              placeholder="e.g. you@email.com"
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => handleInputChange('phone', e.target.value, setPhone)}
              onBlur={() => handleBlur('phone', phone)}
              error={touched.phone && errors.phone}
              placeholder="e.g. 9876543210"
              required
            />
          </div>

          {/* Overhauled Specialty selection to match floating label input styling */}
          <div className="flex flex-col space-y-1 w-full relative">
            <div className="relative mt-2">
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full h-11 px-3.5 pt-4 pb-1.5 bg-card border border-border/80 rounded-md font-sans text-xs text-ink outline-none appearance-none cursor-pointer focus:shadow-focus focus:border-accent"
              >
                <option value="Criminal Defence">Criminal Defence</option>
                <option value="Property Disputes">Property Disputes</option>
                <option value="Family Law">Family Law</option>
                <option value="Labour Law">Labour Law</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="General Practice">General Practice</option>
              </select>
              <label className="absolute left-3.5 top-0 -translate-y-1/2 bg-card px-1.5 text-[9px] font-bold text-accent select-none">
                Type of Issue
              </label>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Overhauled description to match floating label input styling */}
          <div className="flex flex-col space-y-1 w-full relative">
            <div className="relative mt-2">
              <textarea
                rows={3}
                value={description}
                onChange={(e) => handleInputChange('description', e.target.value, setDescription)}
                onBlur={() => handleBlur('description', description)}
                placeholder="Provide a brief summary of the conflict..."
                className={`w-full p-3.5 pt-4.5 bg-card border rounded-md font-sans text-xs text-ink outline-none transition-all placeholder:text-muted/50 resize-none
                  ${touched.description && errors.description 
                    ? 'border-error focus:shadow-[0_0_0_4px_rgba(220,38,38,0.15)] focus:border-error' 
                    : 'border-border/80 focus:shadow-focus focus:border-accent'
                  }
                `}
              />
              <label className="absolute left-3.5 top-0 -translate-y-1/2 bg-card px-1.5 text-[9px] font-bold text-accent select-none">
                Situation Description
              </label>
            </div>
            {touched.description && errors.description && (
              <span className="text-[10px] font-semibold text-error font-sans animate-scaleUp pl-1">
                {errors.description}
              </span>
            )}
          </div>

          <Input
            label="Preferred Date & Time"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => handleInputChange('dateTime', e.target.value, setDateTime)}
            onBlur={() => handleBlur('dateTime', dateTime)}
            error={touched.dateTime && errors.dateTime}
            required
          />

          <div className="flex justify-end space-x-3 pt-5 border-t border-border/50">
            <Button variant="ghost" onClick={onClose} disabled={loading} className="h-9 px-3.5 text-xs font-bold uppercase tracking-wider rounded-md">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              className="shadow-sm h-9 px-5 text-xs font-bold uppercase tracking-widest rounded-md"
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
